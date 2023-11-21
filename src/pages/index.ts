import { context } from '@/context'
import Elysia from 'elysia'
import { baseHtml } from '../components/base'
import { html } from 'lit'

export const indexPage = new Elysia().use(context).get('/', ({ render, session }) => {
	return render(
		baseHtml(
			html`<div class="flex flex-col items-center py-3">
				${session
					? html`<h1 class="text-2xl font-bold text-gray-800" safe>Hi! ${session.user.name}</h1>
							<sl-button href="/dashboard"> Visit Dashboard </sl-button>
							<sl-button href="/api/auth/signout"> Sign Out </sl-button> `
					: html`
							<div class="flex gap-2 items-center">
								<sl-button href="/auth/signin"> Sign in </sl-button>
								<sl-button href="/auth/signup"> Sign up </sl-button>
							</div>
					  `}
			</div>`,
		),
	)
})
