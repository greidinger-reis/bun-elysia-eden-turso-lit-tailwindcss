import { Elysia } from 'elysia'
import { context } from '../context'
import { SignUpSchema } from '@/models/validation/auth'

export const authController = new Elysia({
	prefix: '/auth',
})
	.use(context)
	.post('/signup', async (ctx) => {
		ctx.log.info('Hello')
		const error = (e: Error) => {
			ctx.set.status = 'Bad Request'
			return {
				error: e.message,
			}
		}

		const input = SignUpSchema.safeParse(ctx.body)
		if (!input.success) {
			return error(input.error)
		}

		const user = await Try(() =>
			ctx.auth.createUser({
				key: {
					providerId: 'email',
					providerUserId: input.data.email,
					password: input.data.password,
				},
				attributes: {
					name: input.data.name,
					picture: null,
					email: input.data.email,
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

		return {
			error: null,
		}
	})
	.get('/signout', async (ctx) => {
		const authRequest = ctx.auth.handleRequest(ctx)
		const session = await authRequest.validate()

		if (!session) return ctx.redirect('/')

		await ctx.auth.invalidateSession(session.sessionId)

		const sessionCookie = ctx.auth.createSessionCookie(null)

		ctx.set.headers['Set-Cookie'] = sessionCookie.serialize()
		ctx.redirect('/')
	})
