import { Elysia } from 'elysia'
import staticPlugin from '@elysiajs/static'
import { config } from './config'
import { Pages } from './pages/*'
import { Api } from './controllers/*'

const app = new Elysia()
	.use(
		staticPlugin({
			assets: 'public',
			prefix: '/',
			headers:
				config.env.NODE_ENV === 'production'
					? {
							'Content-Encoding': 'gzip',
					  }
					: {},
		}),
	)
	.use(Api)
	.use(Pages)
	.listen(3000, ({ port, hostname }) => console.log(`🦊 Server running ${hostname}:${port}`))

export type App = typeof app
