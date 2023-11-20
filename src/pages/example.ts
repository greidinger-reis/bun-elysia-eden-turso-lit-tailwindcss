import { BaseHtml } from '@/components/base'
import { context } from '@/context'
import Elysia from 'elysia'
import { html } from 'lit'

export const ExamplePage = new Elysia({ prefix: '/example' }).use(context).get('/', async (ctx) => {
	if(!ctx.session) return ctx.redirect('/auth/signin')

	const userCounters = await ctx.db.query.counter.findMany({
		where: ({id}, {eq})=> eq(id,ctx.session!.user.id)
	}).then((counters) => counters.map(({count}) => count))

	return ctx.render(BaseHtml(html`<div>Example Page
			<example-component .counters=${userCounters}></example-component>
	</div>`))
})
