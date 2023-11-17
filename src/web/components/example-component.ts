import { LitElement } from 'lit'
import { html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

@customElement('example-component')
export class ExampleComponent extends LitElement {
	@state()
	private counter = 0

	handleUpdateCounter = () => {
		console.log('update counter')
		this.counter++
	}

	render() {
		return html`<div>
			Example Component
			<sl-button @click=${this.handleUpdateCounter}>Counter ${this.counter}</sl-button>
		</div>`
	}
}
