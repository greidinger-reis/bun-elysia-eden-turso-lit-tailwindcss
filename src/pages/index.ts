import { Context } from '@/context'
import Elysia from 'elysia'
import { BaseHtml } from '../elements/base'
import { html } from 'lit'

export const IndexPage = new Elysia().use(Context).get('/', ({ render, session }) => {
	return render(
		BaseHtml(
			html`<div class="flex flex-col items-center py-3">
				${session
					? html`<h1 class="text-2xl font-bold text-gray-800" safe>Hi! ${session.user.name}</h1>
							<sl-button href="/dashboard"> Visit Dashboard </sl-button>
							<sl-button href="/api/auth/signout"> Sign Out </sl-button> `
					: html`
							<div class="flex gap-2 items-center">
								<sl-button href="/auth/signin" hx-boost="false"> Sign In </sl-button>
								<sl-button href="/auth/signup" hx-boost="false"> Sign Up </sl-button>
							</div>
					  `}
			</div>`,
		),
	)
})
