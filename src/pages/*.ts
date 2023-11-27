import Elysia from 'elysia'
import { indexPage } from './index.page'
import { todosPage } from './todos.page'
import { authPage } from './auth.page'

export const pages = new Elysia().use(indexPage).use(todosPage).use(authPage)
