import { z } from 'zod'

export const SignUpSchema = z.object({
	name: z.string().min(4, 'Name must be at least 4 characters long').max(32, 'Name must be at most 32 characters long'),
	email: z.string().email(),
	password: z.string().min(6, 'Password must be at least 6 characters long').max(32, 'Password must be at most 32 characters long'),
})

export const SignInSchema = z.object({
	email: z.string(),
	password: z.string()
})

