import { Context } from '@/context'
import Elysia from 'elysia'
import { html } from 'lit'
import { BaseHtml } from '../elements/base'

export const LoginPage = new Elysia().use(Context).get('/login', async (ctx) => {
	const authRequest = ctx.auth.handleRequest(ctx)
	const session = await authRequest.validate()
	if (session) {
		ctx.redirect('/')
		return
	}

	return ctx.render(
		BaseHtml(
			html` <div
				class="flex h-screen w-full flex-col items-center justify-center bg-gray-200"
				hx-ext="response-targets"
			>
				<div class="p-4">
					<a href="/" class="text-indigo-600 hover:text-indigo-800 hover:underline"> Go Home </a>
				</div>
				TODO
			</div>`,
		),
	)
})
