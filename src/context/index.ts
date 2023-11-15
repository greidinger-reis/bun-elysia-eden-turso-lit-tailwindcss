import { logger } from '@bogeychan/elysia-logger'
import { cron } from '@elysiajs/cron'
import { HoltLogger } from '@tlscipher/holt'
import { Elysia } from 'elysia'
import pretty from 'pino-pretty'
import { auth } from '@/auth'
import { config } from '@/config'
import { client, db } from '@/db'
import { TemplateResult } from 'lit'
import { render } from '@lit-labs/ssr'
import { collectResultSync } from '@lit-labs/ssr/lib/render-result'

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

export const Context = new Elysia({
	name: '@app/ctx',
})
	.decorate('db', db)
	.decorate('config', config)
	.decorate('auth', auth)
	.derive(async (ctx) => {
		const now = performance.now()
		const authRequest = ctx.auth.handleRequest(ctx)
		const session = await authRequest.validate()
		console.log('auth time', performance.now() - now, 'ms')

		return { session }
	})
	.derive(({ set }) => ({
		render: (template: TemplateResult) => {
			set.headers['Content-Type'] = 'text/html'
			const res = render(template)
			return collectResultSync(res)
		},
	}))
	.derive(({ set, headers }) => ({
		redirect: (href: string) => {
			if (headers['hx-request'] === 'true') {
				set.headers['HX-Location'] = href
			} else {
				set.redirect = href
			}
		},
	}))
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
						// console.log("Syncing database...");
						void client.sync().then(() => {
							// console.log(`Database synced in ${performance.now() - now}ms`);
						})
					},
			  })
			: (a) => a,
	)
	.onStart(({ log }) => {
		if (log && config.env.NODE_ENV === 'production') {
			log.info('Server started')
		}
	})
	.onStop(({ log }) => {
		if (log && config.env.NODE_ENV === 'production') {
			log.info('Server stopped')
		}
	})
	.onRequest(({ log, request }) => {
		if (log && config.env.NODE_ENV === 'production') {
			log.debug(`Request received: ${request.method}: ${request.url}`)
		}
	})
	.onResponse(({ log, request, set }) => {
		if (log && config.env.NODE_ENV === 'production') {
			log.debug(`Response sent: ${request.method}: ${request.url}`)
		}
	})
	.onError(({ log, error }) => {
		if (log && config.env.NODE_ENV === 'production') {
			log.error(error)
		}
	})
