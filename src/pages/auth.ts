import { baseHtml } from '@/components/base'
import { context } from '@/context'
import Elysia from 'elysia'
import { html } from 'lit'

export const authPage = new Elysia({
	prefix: 'auth',
})
	.use(context)
	.get('/signin', async (ctx) => {
		return ctx.render(baseHtml(html`<x-signin-form></x-signin-form>`))
	})
