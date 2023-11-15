import { Elysia } from 'elysia'
import staticPlugin from '@elysiajs/static'
import { config } from './config'
import { pages } from './pages/*'

new Elysia()
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
    .use(pages)
	.listen(3000, ({ port, hostname }) => console.log(`🦊 Server running ${hostname}:${port}`))
