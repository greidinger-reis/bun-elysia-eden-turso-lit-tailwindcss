import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('x-link')
export class Link extends LitElement {
	@property({ type: String })
	href = ""

	connectedCallback() {
		super.connectedCallback()
		//@ts-ignore
		if (this['htmx-internal-data'] === undefined) {
			//@ts-ignore
			this['htmx-internal-data'] = { boosted: true }
		}
	}

	private handleClick = (e: Event) => {
		e.preventDefault()
		const context = {
			//@ts-ignore
			target: this['hx-target'],
			verb: 'get',
			path: this.href,
			source: this,
		}
		//@ts-ignore
		if (window.htmx) {
			//@ts-ignore
			window.htmx.ajax('get', this.href, context)
		} else {
			console.warn("htmx not loaded")
		}
	}

	render() {
		return html`<a href="${this.href}" @click=${this.handleClick}><slot></slot></a>`
	}
}
