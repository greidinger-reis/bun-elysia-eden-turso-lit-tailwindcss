import { Context } from '@/context'
import Elysia from 'elysia'
import { BaseHtml } from '../elements/base'
import { html } from 'lit'

export const IndexPage = new Elysia().use(Context).get('/', ({ render, session }) => {
	return render(
		BaseHtml(
			html`<div class="flex flex-col items-center py-3">
				${session
					? html`<h1 class="text-2xl font-bold text-gray-800" safe>Hi! {session.user.name}</h1>
							<a
								href="/dashboard"
								class="mt-4 rounded-lg bg-green-500 px-4 py-2 text-white transition duration-200 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
							>
								Visit Dashboard
							</a>
							<a
								href="/api/auth/signout"
								class="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
							>
								Sign Out
							</a> `
					: html`
							<a
								href="/login"
								hx-boost="false"
								class="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
							>
								Sign In
							</a>
					  `}
			</div>`,
		),
	)
})
