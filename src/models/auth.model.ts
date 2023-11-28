import { t } from 'elysia'

export const signin = t.Object({
	signinSubject: t.String(),
	password: t.String(),
})

export const signup = t.Object({
	username: t.String(),
	email: t.String(),
	password: t.String(),
})
