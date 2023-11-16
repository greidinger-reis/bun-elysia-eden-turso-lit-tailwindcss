import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

@customElement('login-form')
export class LoginForm extends LitElement {
	render() {
		return html`<form hx-post="/auth/login">
			<sl-input
				name="email"
				label="Email"
				required
			></sl-input>

			<sl-button type="submit" variant="primary">Submit</sl-button>
			<sl-button type="reset" variant="default">Reset</sl-button>
		</form>`
	}
}
