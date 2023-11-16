import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { SignUpSchema } from '@/models/validation/auth'
type UserSignUp = typeof SignUpSchema.static

@customElement('signup-form')
export class SignUpForm extends LitElement {

	render() {
		return html`
			<form class="flex flex-col gap-4 w-full max-w-2xl">
				<sl-input
					type="email"
					label="Email"
					name="email"
				></sl-input>
				<sl-input
					label="Name"
					name="name"
				></sl-input>
				<sl-input
					type="password"
					label="Password"
					name="password"
				></sl-input>
				<sl-button type="submit" class="w-full block">Submit</sl-button>
			</form>
		`
	}
}
