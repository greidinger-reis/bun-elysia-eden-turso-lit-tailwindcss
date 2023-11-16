import { Elysia, t } from 'elysia'
import { Context } from '../context'
import { Try } from '@/lib'
import { SignUpSchema } from '@/models/validation/auth'

export const AuthController = new Elysia({
	prefix: '/auth',
})
	.use(Context)
	.model({
		
	})
	.post(
		'/signup',
		async (ctx) => {
			ctx.log.info("Hello")
			const error = (e: Error) => {
				ctx.set.status = 'Bad Request'
				return {
					error: e.message,
				}
			}

			const input = {
				email: ctx.body.email,
				name: ctx.body.name,
				password: ctx.body.password,
			}

			const user = await Try(() =>
				ctx.auth.createUser({
					key: {
						providerId: 'email',
						providerUserId: input.email,
						password: input.password,
					},
					attributes: {
						name: input.name,
						picture: null,
						email: input.email,
					},
				}),
			)()

			if (user.err) {
				return error(user.val)
			}

			const session = await Try(() =>
				ctx.auth.createSession({
					userId: user.val.userId,
					attributes: {},
				}),
			)()
			if (session.err) {
				return error(session.val)
			}

			const sessionCookie = ctx.auth.createSessionCookie(session.val)

			ctx.set.headers['Set-Cookie'] = sessionCookie.serialize()
			ctx.set.headers['Location'] = '/new-user'
			ctx.set.status = 'Created'

			return null
		},
		{
			body: SignUpSchema
		},
	)
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
