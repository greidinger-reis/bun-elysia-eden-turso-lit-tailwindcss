import { html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { LitElementWithEden } from './shared/element'
import { Todo } from '@/db/schema'

@customElement('x-todos')
export class TodosComponent extends LitElementWithEden {
	@property({ type: Array })
	todos: Todo[]
	@state()
	private error: string

	render() {
		return html`<div>Todos</div>`
	}
}
