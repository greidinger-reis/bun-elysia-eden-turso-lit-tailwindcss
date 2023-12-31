import { type HTMLTemplateResult, html } from 'lit'
import { config } from '../config'

export const layout = (slot: HTMLTemplateResult) =>
    html`<!doctype html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Bun+Elysia+HTMX+Lit SSR+Tailwind</title>
                <!-- HTMX -->
                <script
                    src="https://unpkg.com/htmx.org@1.9.9"
                    integrity="sha384-QFjmbokDn2DjBjq+fM+8LUIVrAgqcNW2s0PjAxHETgRn9l4fvX31ZxDxvwQnyMOX"
                    crossorigin="anonymous"
                ></script>
                <script src="https://unpkg.com/htmx.org/dist/ext/response-targets.js"></script>
                <script src="https://unpkg.com/htmx.org/dist/ext/loading-states.js"></script>
                <script>
                    htmx.config.globalViewTransitions = true
                </script>
                <!-- Client bundle -->
                <script defer src="/index.js" type="module"></script>
                <!-- Shoelace styles -->
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.11.2/cdn/themes/light.css"
                />
                <script
                    type="module"
                    src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.11.2/cdn/shoelace.js"
                ></script>
                <!-- Style for server rendered templates -->
                <link rel="stylesheet" href="/styles.css" />
                ${config.env.NODE_ENV === 'development' ? html`<script src="/live-reload.js"></script>` : null}
            </head>
            <body hx-boost="true" hx-ext="loading-states">
                ${slot}
            </body>
        </html>`
