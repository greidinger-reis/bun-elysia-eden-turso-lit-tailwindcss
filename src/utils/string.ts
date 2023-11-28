import { Value } from '../../node_modules/elysia/node_modules/@sinclair/typebox/value'
import { t } from 'elysia/type-system'

const Email = t.String({ format: "email" })

export function isEmail(str: string): boolean {
	return Value.Check(Email, str)
}
