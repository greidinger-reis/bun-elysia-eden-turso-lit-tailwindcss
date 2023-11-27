import { layout } from '@/components/base'
import { context } from '@/context'
import Elysia from 'elysia'
import { html } from 'lit'

export const todosPage = new Elysia({
	prefix: '/todos',
})
	.use(context)
	.get('/', async (ctx) => {
		if (!ctx.session) return (ctx.set.status = 403), ctx.redirect('/auth/signin')
		const todos = await ctx.todoService.findAll(ctx.session!.user.id)
		return ctx.render(layout(html` <x-todos .todos=${todos}></x-todos> `))
	})
