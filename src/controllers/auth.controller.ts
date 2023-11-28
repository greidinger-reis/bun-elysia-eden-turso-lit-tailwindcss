import { Elysia, t } from 'elysia'
import { context } from '@/context'
import { type Key } from 'lucia'
import * as Model from '@/models'
import * as Utils from '@/utils'

export const authController = new Elysia({
	prefix: '/auth',
})
	.use(context)
	.post(
		'/signup',
		async (ctx) => {
			const user = await Try(() =>
				ctx.auth.createUser({
					key: {
						providerId: 'email',
						providerUserId: ctx.body.email,
						password: ctx.body.password,
					},
					attributes: {
						name: ctx.body.username,
						picture: null,
						email: ctx.body.email,
					},
				}),
			)()

			if (user.err) {
				return ctx.error(user.val)
			}

			await Try(() => ctx.auth.createKey({
				userId: user.val.userId,
				providerId: 'username',
				password: ctx.body.password,
				providerUserId: ctx.body.username,
			}))()

			const session = await Try(() =>
				ctx.auth.createSession({
					userId: user.val.userId,
					attributes: {},
				}),
			)()

			if (session.err) {
				return ctx.error(session.val)
			}

			const sessionCookie = ctx.auth.createSessionCookie(session.val)

			ctx.set.headers['Set-Cookie'] = sessionCookie.serialize()
			return ctx.redirect('/new-user')
		},
		{ body: Model.Auth.signup },
	)
	.post(
		'/signin',
		async (ctx) => {
			let key: Key

			if (Utils.String.isEmail(ctx.body.signinSubject)) {
				const _key = await Try(() => ctx.auth.useKey('email', ctx.body.signinSubject, ctx.body.password))()
				if (_key.err) return ctx.error(_key.val)
				key = _key.val
			} else {
				const _key = await Try(() => ctx.auth.useKey('username', ctx.body.signinSubject, ctx.body.password))()
				if (_key.err) return ctx.error(_key.val)
				key = _key.val
			}

			const session = await Try(() =>
				ctx.auth.createSession({
					userId: key.userId,
					attributes: {},
				}),
			)()

			if (session.err) return ctx.error(session.val)
			const sessionCookie = ctx.auth.createSessionCookie(session.val)

			ctx.set.headers['Set-Cookie'] = sessionCookie.serialize()
			return ctx.redirect('/')
		},
		{ body: Model.Auth.signin },
	)
	.get('/signout', async (ctx) => {
		const authRequest = ctx.auth.handleRequest(ctx)
		const session = await authRequest.validate()

		if (!session) return ctx.redirect('/')

		await ctx.auth.invalidateSession(session.sessionId)

		const sessionCookie = ctx.auth.createSessionCookie(null)

		ctx.set.headers['Set-Cookie'] = sessionCookie.serialize()
		ctx.redirect('/')
	})
	.post('/test', (ctx) => {
		console.log(ctx.body)
	}, {
		body: t.Object({
			email: t.String({ format: 'email' })
		})
	})
