import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

const env = createEnv({
	server: {
		LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']),
		NODE_ENV: z.enum(['development', 'production']),
	},
	runtimeEnv: process.env,
})

export const config = {
	env,
}
