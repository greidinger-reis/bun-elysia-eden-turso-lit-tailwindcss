import { t } from 'elysia'

export const signin = t.Object({
	email: t.String(),
	password: t.String(),
})

export const signup = t.Object({
	name: t.String(),
	email: t.String(),
	password: t.String(),
})
