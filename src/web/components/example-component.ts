import { html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { LitElementWithEden } from './shared/element'

@customElement('example-component')
export class ExampleComponent extends LitElementWithEden {
	@state()
	private counters: number[]
	@state()
	private error: string

	async handleGetCounters() {
		const { data: counters, status } = await ExampleComponent.client.api.exampleComponent.counters.get()
		if (status === 200) {
			this.counters = counters!.map(c => c.count)
			return
		}
		this.counters = []

		this.error = 'Failed to get counters, status: ' + status
	}

	connectedCallback() {
		super.connectedCallback()
		this.handleGetCounters()
	}

	render() {
		return html`<div>
			Example Component
			${this.error ? html`<div>${this.error}</div>` : null} 
			${this.counters?.map((c, i) => html`<div>counter ${i + 1}: ${c} <sl-button>Increment</sl-button></div>`)}
		</div>`
	}
}
