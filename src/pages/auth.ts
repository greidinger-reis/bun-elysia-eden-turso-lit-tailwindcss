import { Context } from '@/context'
import Elysia from 'elysia'
import { html } from 'lit'
import { BaseHtml } from '../elements/base'

export const AuthPages = new Elysia({ prefix: '/auth' })
	.use(Context)
	.get('/signin', async (ctx) => {
		if (ctx.session) {
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
					<form hx-post="/api/auth/signin" class="flex flex-col gap-4 w-full max-w-2xl">
						<sl-input type="email" label="Email" name="email"></sl-input>
						<sl-input type="password" label="Password" name="password"></sl-input>
						<sl-button type="submit" class="w-full block">Submit</sl-button>
					</form>
				</div>`,
			),
		)
	})
	.get('/signup', async (ctx) => {
		if (ctx.session) {
			ctx.redirect('/')
			return
		}
		return ctx.render(
			BaseHtml(html`
				<h1 class="text-2xl text-bold">Sign Up</h1>
				<sign-up-form></sign-up-form>
			`),
		)
	})
