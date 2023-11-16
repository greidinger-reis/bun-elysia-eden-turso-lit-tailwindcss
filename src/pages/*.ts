import Elysia from 'elysia'
import { IndexPage } from '.'
import { NewUserPage } from './new-user'
import { LoginPage } from './login'

export const Pages = new Elysia().use(IndexPage).use(NewUserPage).use(LoginPage)
