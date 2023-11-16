import { Context } from '@/context'
import Elysia from 'elysia'
import { AuthController } from './auth'

export const Api = new Elysia({ prefix: '/api' }).use(Context).use(AuthController)
