import { Elysia, t } from 'elysia'
import { context } from '../context'

export const authController = new Elysia({
	prefix: '/auth',
})
	.use(context)
	.model({
		signin: t.Object({
			email: t.String({
				format: 'email',
			}),
			password: t.String(),
		}),
		signup: t.Object({
			name: t.String(),
			email: t.String({
				format: 'email',
			}),
			password: t.String(),
		}),
	})
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
						name: ctx.body.name,
						picture: null,
						email: ctx.body.email,
					},
				}),
			)()

			if (user.err) {
				return ctx.error(user.val)
			}

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
		{ body: 'signup' },
	)
	.post(
		'/signin',
		async (ctx) => {
			const key = await Try(() => ctx.auth.useKey('email', ctx.body.email, ctx.body.password))()
			if (key.err) return ctx.error(key.val)

			const session = await Try(() =>
				ctx.auth.createSession({
					userId: key.val.userId,
					attributes: {},
				}),
			)()
			if (session.err) return ctx.error(session.val)
			const sessionCookie = ctx.auth.createSessionCookie(session.val)

			ctx.set.headers['Set-Cookie'] = sessionCookie.serialize()
			return ctx.redirect('/new-user')
		},
		{ body: 'signin' },
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
