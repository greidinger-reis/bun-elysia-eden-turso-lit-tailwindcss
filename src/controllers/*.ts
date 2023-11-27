import { context } from '@/context'
import Elysia from 'elysia'
import { authController } from './auth.controller'
import { todosController } from './todos.controller'

export const api = new Elysia({ prefix: '/api' }).use(context).use(authController).use(todosController)
