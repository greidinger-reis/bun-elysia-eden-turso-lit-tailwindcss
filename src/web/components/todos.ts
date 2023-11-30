import { html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { LitElement } from 'lit'
import { SelectTodo } from '@/db/schema'

@customElement('x-todos')
export class TodosComponent extends LitElement {
    @property({ type: Array })
    todos: SelectTodo[]
    @state()
    private error: string

    render() {
        return html`<div>Todos</div>`
    }
}
