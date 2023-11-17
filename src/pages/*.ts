import Elysia from 'elysia'
import { IndexPage } from '.'
import { NewUserPage } from './new-user'
import { AuthPages } from './auth'
import { ExamplePage } from './example'

export const Pages = new Elysia().use(IndexPage).use(NewUserPage).use(AuthPages).use(ExamplePage)
