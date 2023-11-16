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
					<login-form></login-form>
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
				<div class="flex flex-col gap-8 justify-center items-center py-32">
					<h1 class="text-2xl text-bold">Sign Up</h1>
					<form hx-post="/api/auth/signup" class="space-y-4 w-full max-w-xl">
						<input name="email" type="email" placeholder="Email"></input>
						<input name="name" type="text" placeholder="Name"></input>
						<input
							name="password"
							type="password"
							placeholder="Password"
							password-toggle
						></input>
						<!-- <sl-checkbox> I agree to the <a href="#">terms and conditions</a> </sl-checkbox> -->
						<button class="block" type="submit">Submit</button>
					</form>
				</div>
			`),
		)
	})
