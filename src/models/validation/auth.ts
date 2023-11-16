import { t } from 'elysia'

export const SignInSchema = t.Object({
	email: t.String({
		format: 'email',
	}),
	password: t.String(),
})

export const SignUpSchema = t.Object({
	email: t.String({
		format: 'email',
		default: '',
		error() {
			return 'Invalid email'
		},
	}),
	name: t.String({
		minLength: 4,
		maxLength: 32,
		error() {
			return 'Name min length: 4 and max length: 32'
		},
	}),
	password: t.String({
		minLength: 6,
		error() {
			return 'Weak password'
		},
	}),
})
