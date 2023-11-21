import { context } from '@/context'
import Elysia from 'elysia'
import { authController } from './auth'
import { todosController } from './todos'

export const api = new Elysia({ prefix: '/api' }).use(context).use(authController).use(todosController)
