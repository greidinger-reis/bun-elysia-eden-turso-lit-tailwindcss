import { context } from '@/context'
import Elysia from 'elysia'

export const NewUserPage = new Elysia().use(context).get('/new-user', async (ctx) => {
	if (!ctx.session) return ctx.redirect('/login')
	
	throw new Error("Not implemented")
})
