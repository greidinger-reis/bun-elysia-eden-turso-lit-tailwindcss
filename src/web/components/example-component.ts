import { html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { LitElementWithEden } from './shared/element'

@customElement('example-component')
export class ExampleComponent extends LitElementWithEden {
	@property({ type: Array })
	counters: number[]
	@state()
	private error: string

	render() {
		return html`<div>
			Example Component
			${this.error ? html`<div>${this.error}</div>` : null} 
			${this.counters?.map((c, i) => html`<div>counter ${i + 1}: ${c} <sl-button>Increment</sl-button></div>`)}
		</div>`
	}
}
