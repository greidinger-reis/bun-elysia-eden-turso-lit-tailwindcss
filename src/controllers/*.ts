import { Context } from '@/context'
import Elysia from 'elysia'

export const Api = new Elysia({ prefix: '/api' }).use(Context)
