import { context } from '@/context'
import Elysia from 'elysia'
import { html } from 'lit'
import { BaseHtml } from '../components/base'

export const AuthPages = new Elysia({ prefix: '/auth' })
	.use(context)
	.get('/signin', async (ctx) => {
		if (ctx.session) return ctx.redirect('/')

		return ctx.render(
			BaseHtml(
				html` <h1>Sign in</h1> `,
			),
		)
	})
	.get('/signup', async (ctx) => {
		if (ctx.session) return ctx.redirect('/')
 
		return ctx.render(
			BaseHtml(html`
				<h1 class="text-2xl text-bold">Sign up</h1>
			`),
		)
	})
