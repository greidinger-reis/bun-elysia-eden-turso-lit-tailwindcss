import { Elysia } from 'elysia'
import { parseCookie, serializeCookie } from 'lucia/utils'
import { config } from '../config'
import { Context } from '../context'
import { syncIfLocal } from '@/db/primary'
import { Try } from '@/lib'

export const AuthController = new Elysia({
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