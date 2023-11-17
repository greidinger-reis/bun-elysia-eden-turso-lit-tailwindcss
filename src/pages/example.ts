import { BaseHtml } from '@/components/base'
import { Context } from '@/context'
import Elysia from 'elysia'
import { html } from 'lit'

export const ExamplePage = new Elysia({ prefix: '/example' }).use(Context).get('/', (ctx) => {
	return ctx.render(BaseHtml(html`<div>Example Page
			<example-component></example-component>
	</div>`))
})
