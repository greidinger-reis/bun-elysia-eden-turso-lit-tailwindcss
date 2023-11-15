import Elysia from 'elysia'
import { Context } from '../context'

export const Auth = new Elysia({
	name: '@app/middlewares/auth',
})
	.use(Context)
	.derive(async (ctx) => {
		const authRequest = ctx.auth.handleRequest(ctx)
		const session = await authRequest.validate()

		return { session }
	})
