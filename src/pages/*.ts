import Elysia from 'elysia'
import { indexPage } from '.'
import { todosPage } from './todos'
import { authPage } from './auth'

export const pages = new Elysia().use(indexPage).use(todosPage).use(authPage)
