import { logger } from '@bogeychan/elysia-logger'
import { cron } from '@elysiajs/cron'
import { HoltLogger } from '@tlscipher/holt'
import { Elysia } from 'elysia'
import pretty from 'pino-pretty'
import { auth } from '@/auth'
import { config } from '@/config'
import { client, db } from '@/db'
import { HTMLTemplateResult } from 'lit'
import { render } from '@lit-labs/ssr'
import { collectResult } from '@lit-labs/ssr/lib/render-result'
import { TodoService } from '@/services/todo'

const stream = pretty({
	colorize: true,
})

const loggerConfig =
	config.env.NODE_ENV === 'development'
		? {
				level: config.env.LOG_LEVEL,
				stream,
		  }
		: { level: config.env.LOG_LEVEL }

export const context = new Elysia({
	name: '@app/ctx',
})
	.decorate('db', db)
	.decorate('config', config)
	.decorate('auth', auth)
	.derive(async (ctx) => ({
		redirect: (to: string) => {
			ctx.set.redirect = to
			return
		},
	}))
	.derive((ctx) => {
		return {
			todoService: new TodoService(ctx.db),
		}
	})
	.derive(async (ctx) => {
		const authRequest = ctx.auth.handleRequest(ctx)
		const session = await authRequest.validate()

		return { session }
	})
	.decorate('render', async (template: HTMLTemplateResult) => {
		return new Response(await collectResult(render(template)), {
			headers: {
				'Content-Type': 'text/html',
			},
		})
	})
	.use(logger(loggerConfig))
	.use(
		// @ts-expect-error
		config.env.NODE_ENV === 'development' ? new HoltLogger().getLogger() : (a) => a,
	)
	.use(
		// @ts-expect-error
		config.env.DATABASE_CONNECTION_TYPE === 'local-replica'
			? cron({
					name: 'heartbeat',
					pattern: '*/2 * * * * *',
					run() {
						const now = performance.now()
						console.log('Syncing database...')
						void client.sync().then(() => {
							console.log(`Database synced in ${performance.now() - now}ms`)
						})
					},
			  })
			: (a) => a,
	)
