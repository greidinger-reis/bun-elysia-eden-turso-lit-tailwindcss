import { context } from '@/context'
import Elysia from 'elysia'
import { authController } from './auth'
import { exampleComponentController } from '@/web/components/example-component.server'

export const Api = new Elysia({ prefix: '/api' }).use(context).use(authController).use(exampleComponentController)
