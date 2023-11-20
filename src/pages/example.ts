import { BaseHtml } from '@/components/base'
import { context } from '@/context'
import Elysia from 'elysia'
import { html } from 'lit'

export const ExamplePage = new Elysia({ prefix: '/example' }).use(context).get('/', (ctx) => {
	return ctx.render(BaseHtml(html`<div>Example Page
			<example-component></example-component>
	</div>`))
})
