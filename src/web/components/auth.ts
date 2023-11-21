import { customElement, query } from 'lit/decorators.js'
import { LitElementWithEden } from './shared/element'
import { css, html } from 'lit'
import { serialize } from '@shoelace-style/shoelace/dist/utilities/form.js'
import { TWStyles } from '@/styles/output'

@customElement('x-signin-form')
export class SigninForm extends LitElementWithEden {
	@query('#signin-form')
	form: HTMLFormElement
	@query('#signin-form sl-input[name="email"]')
	email: any
	@query('#signin-form sl-input[name="name"]')
	name: any
	@query('#signin-form sl-input[name="password"]')
	password: any

	checkValidity(): boolean {
		const emailInput = this.email.input
		const nameInput = this.name.input
		const passwordInput = this.password.input

		return emailInput.checkValidity() &&
			nameInput.checkValidity() &&
			passwordInput.checkValidity()
	}

	handleSubmit(e: Event<HTMLFormElement>) {
		e.preventDefault()

		if(!this.checkValidity()) return

		console.log(serialize(this.form))
	}

	static styles = [
		TWStyles,
		css`
			#signin-form sl-input,
			#signin-form sl-select,
			#signin-form sl-checkbox {
				display: block;
				margin-bottom: var(--sl-spacing-medium);
			}

			/* user invalid styles */
			#signin-form sl-input[data-user-invalid]::part(base),
			#signin-form sl-select[data-user-invalid]::part(combobox),
			#signin-form sl-checkbox[data-user-invalid]::part(control) {
				border-color: var(--sl-color-danger-600);
			}

			#signin-form [data-user-invalid]::part(form-control-label),
			#signin-form [data-user-invalid]::part(form-control-help-text),
			#signin-form sl-checkbox[data-user-invalid]::part(label) {
				color: var(--sl-color-danger-700);
			}

			#signin-form sl-checkbox[data-user-invalid]::part(control) {
				outline: none;
			}

			#signin-form sl-input:focus-within[data-user-invalid]::part(base),
			#signin-form sl-select:focus-within[data-user-invalid]::part(combobox),
			#signin-form sl-checkbox:focus-within[data-user-invalid]::part(control) {
				border-color: var(--sl-color-danger-600);
				box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-color-danger-300);
			}

			/* User valid styles */
			#signin-form sl-input[data-user-valid]::part(base),
			#signin-form sl-select[data-user-valid]::part(combobox),
			#signin-form sl-checkbox[data-user-valid]::part(control) {
				border-color: var(--sl-color-success-600);
			}

			#signin-form [data-user-valid]::part(form-control-label),
			#signin-form [data-user-valid]::part(form-control-help-text),
			#signin-form sl-checkbox[data-user-valid]::part(label) {
				color: var(--sl-color-success-700);
			}

			#signin-form sl-checkbox[data-user-valid]::part(control) {
				background-color: var(--sl-color-success-600);
				outline: none;
			}

			#signin-form sl-input:focus-within[data-user-valid]::part(base),
			#signin-form sl-select:focus-within[data-user-valid]::part(combobox),
			#signin-form sl-checkbox:focus-within[data-user-valid]::part(control) {
				border-color: var(--sl-color-success-600);
				box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-color-success-300);
			}
		`,
	]

	render() {
		return html`<div>
			Signin
			<form id="signin-form" @submit=${this.handleSubmit}>
				<sl-input name="email" label="Email" type="email" required></sl-input>
				<sl-input name="name" label="Username" type="text" required></sl-input>
				<sl-input name="password" label="Password" type="password" required></sl-input>
				<sl-button type="submit">Submit</sl-button>
			</form>
		</div>`
	}
}
