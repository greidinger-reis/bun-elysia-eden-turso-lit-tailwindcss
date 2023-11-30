import { layout } from '@/components/base'
import { context } from '@/context'
import Elysia from 'elysia'
import { html } from 'lit'

export const authPage = new Elysia({
    prefix: 'auth',
})
    .use(context)
    .get('/signin', (ctx) =>
        ctx.render(
            layout(html`
                <main class="min-h-screen flex items-center justify-center">
                    <x-signin-form></x-signin-form>
                </main>
            `),
        ),
    )
    .get('/signup', (ctx) =>
        ctx.render(
            layout(html`
                <main class="min-h-screen flex items-center justify-center">
                    <x-signup-form></x-signup-form>
                </main>
            `),
        ),
    )
