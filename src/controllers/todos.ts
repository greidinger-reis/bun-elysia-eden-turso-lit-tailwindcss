import { context } from '@/context'
import { InsertTodo } from '@/db/schema'
import Elysia, { t } from 'elysia'

export const todosController = new Elysia({ prefix: '/todos' })
	.use(context)
	.get('/', async (ctx) => {
		if (!ctx.session) return (ctx.set.status = 403), ctx.redirect('/auth/signin')
		return ctx.todoService.findAll(ctx.session!.user.id)
	})
	.post(
		'/',
		async (ctx) => {
			if (!ctx.session) return (ctx.set.status = 403), ctx.redirect('/auth/signin')
			return ctx.todoService.create({
				title: ctx.body.title,
				content: ctx.body.content,
				authorId: ctx.session!.user.id,
			})
		},
		{
			body: t.Object({
				title: t.String(),
				content: t.String(),
			}),
		},
	)
	.put(
		'/',
		async (ctx) => {
			if (!ctx.session) return (ctx.set.status = 403), ctx.redirect('/auth/signin')

			const values: Partial<InsertTodo> = {
				completed: ctx.body.completed,
			}

			ctx.body.title && (values.title = ctx.body.title)
			ctx.body.content && (values.content = ctx.body.content)

			return ctx.todoService.update(ctx.body.id, values)
		},
		{
			body: t.Object({
				id: t.String(),
				title: t.Optional(t.String()),
				content: t.Optional(t.String()),
				completed: t.Boolean(),
			}),
		},
	)
