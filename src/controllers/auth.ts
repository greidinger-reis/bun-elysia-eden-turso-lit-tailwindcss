import { OAuthRequestError } from '@lucia-auth/oauth'
import { Elysia, t } from 'elysia'
import { parseCookie, serializeCookie } from 'lucia/utils'
import { config } from '../config'
import { Context } from '../context'
import { syncIfLocal } from '@/db'
import { googleAuth } from '@/auth'
import { Try } from '@/lib/try'

export const authController = new Elysia({
	prefix: '/auth',
})
	.use(Context)
	.get('/signout', async (ctx) => {
		const authRequest = ctx.auth.handleRequest(ctx)
		const session = await authRequest.validate()

		if (!session) {
			ctx.redirect('/')
			return
		}

		await ctx.auth.invalidateSession(session.sessionId)

		const sessionCookie = ctx.auth.createSessionCookie(null)

		ctx.set.headers['Set-Cookie'] = sessionCookie.serialize()
		ctx.redirect('/')
	})
	.get('/login/google', async ({ set }) => {
		const [url, state] = await googleAuth.getAuthorizationUrl()

		const state_cookie = serializeCookie('google_auth_state', state, {
			maxAge: 60 * 60,
			httpOnly: true,
			secure: config.env.NODE_ENV === 'production',
			path: '/',
		})

		set.headers['Set-Cookie'] = state_cookie

		set.redirect = url.toString()
	})
	.get('/google/callback', async (ctx) => {
		const { state, code } = ctx.query

		const cookies = parseCookie(ctx.headers['cookie'] || '')
		const state_cookie = cookies['google_auth_state']

		if (!state_cookie || !state || state_cookie !== state || !code) {
			ctx.set.status = 'Unauthorized'
			return
		}

		const res = await Try(() => googleAuth.validateCallback(code))()
		const { getExistingUser, createUser, googleUser } = res
			.mapErr((e) => {
				ctx.log.error(e, 'Error signing in with Google')
				if (e instanceof OAuthRequestError) {
					ctx.set.status = 'Unauthorized'
					return
				} else {
					ctx.set.status = 'Internal Server Error'
					return
				}
			})
			.unwrap()

		const getUser = Try(async () => {
			const existingUser = await getExistingUser()

			if (existingUser) {
				return existingUser
			}

			const user = await createUser({
				attributes: {
					name: googleUser.name,
					email: googleUser.email ?? null,
					picture: googleUser.picture,
				},
			})

			return user
		})

		const user = (await getUser())
			.mapErr((e) => {
				ctx.log.error(e, 'Error creating user')
				ctx.set.status = 'Internal Server Error'
				return
			})
			.unwrap()

		const session = (
			await Try(() =>
				ctx.auth.createSession({
					userId: user.userId,
					attributes: {},
				}),
			)()
		)
			.mapErr((e) => {
				ctx.log.error(e, 'Error creating session')
				ctx.set.status = 'Internal Server Error'
				return
			})
			.unwrap()

		const sessionCookie = ctx.auth.createSessionCookie(session)

		await syncIfLocal()

		ctx.set.headers['Set-Cookie'] = sessionCookie.serialize()
		ctx.redirect('/new-user')
	})
