import { TWStyles } from '@/styles/output'
import { APIRoutes } from '@/types/api-routes'
import { LitElement, html } from 'lit'
import { customElement, query } from 'lit/decorators.js'

@customElement('x-signin-form')
export class SigninForm extends LitElement {
	static styles = TWStyles
	private endpoint: APIRoutes['post'] = '/api/auth/signin'
	@query('#signin-form') signinForm!: HTMLFormElement

	connectedCallback() {
		super.connectedCallback()
		//@ts-ignore
		if (window.htmx) {
			//@ts-ignore
			window.htmx.process(this.signinForm)
		}
		else {
			console.warn('htmx is not loaded, please load it before using this component')
		}
	}

	render() {
		return html`
				<form
					id="signin-form"
					class="border input-bordered bg-base-200 rounded-lg w-80 items-center p-4 flex flex-col gap-4"
					hx-target="body"
					hx-push-url="true"
					hx-post=${this.endpoint}
				>
					<div class="w-full form-control">
						<label class="label">
							<span class="label-text">Username or email address</span>
						</label>
						<input tabindex="1" class="input focus:input-primary input-bordered input-sm focus:border-none focus:outline-offset-0" name="signinSubject" type="text" required></input>
					</div>
					<div class="w-full form-control">
						<label class="label">
							<span class="label-text">Password</span>
							<a class="label-text-alt link link-primary rounded" tabindex="2" href="/auth/password-reset">Forgot password?</a>
						</label>
						<input tabindex="1" class="input focus:input-primary input-bordered input-sm focus:border-none focus:outline-offset-0" name="password" type="password" required></input>
					</div>
					<button type="submit" class="w-full my-2 btn btn-success btn-sm text-white">Sign in</button>
				</form>
				<div class="bg-base-200 border input-bordered p-4 mt-4 rounded-lg">
					<p class="text-center text-base-content text-sm">
						Don't have an account yet?
						<x-link class="link link-primary rounded" href="/auth/signup">Sign up</x-link>
					</p>
				</div>
			`
	}
}

@customElement('x-signup-form')
export class SignupForm extends LitElement {
	static styles = TWStyles
	private endpoint: APIRoutes['post'] = '/api/auth/signup'

	@query('#signup-form') signupForm!: HTMLFormElement

	connectedCallback() {
		super.connectedCallback()
		//@ts-ignore
		if (window.htmx) {
			//@ts-ignore
			window.htmx.process(this.signupForm)
		}
		else {
			console.warn('htmx is not loaded, please load it before using this component')
		}
	}

	render() {
		return html`
				<form
					id="signup-form"
					class="border input-bordered bg-base-200 rounded-lg w-80 items-center p-4 flex flex-col gap-4"
					hx-post=${this.endpoint}
				>
					<div class="w-full form-control">
						<label class="label">
							<span class="label-text">Username</span>
						</label>
						<input tabindex="1" class="input focus:input-primary input-bordered input-sm focus:border-none focus:outline-offset-0" name="username" type="text" required></input>
					</div>
					<div class="w-full form-control">
						<label class="label">
							<span class="label-text">Email address</span>
						</label>
						<input tabindex="1" class="input focus:input-primary input-bordered input-sm focus:border-none focus:outline-offset-0" name="email" type="email" required></input>
					</div>
					<div class="w-full form-control">
						<label class="label">
							<span class="label-text">Password</span>
						</label>
						<input tabindex="1" class="input focus:input-primary input-bordered input-sm focus:border-none focus:outline-offset-0" name="password" type="password" required></input>
					</div>
					<label class="flex items-center w-full gap-2">
						<input type="checkbox" class="bg-base-100 checkbox checked:checkbox-primary checkbox-sm"></input>
						<span class="label-text">
							I agree to the <a class="link link-info" href="/auth/terms">
								terms and conditions
							</a>
						</span>
					</label>
					<button type="submit" class="w-full mt-2 btn btn-success btn-sm text-white">Sign up</button>
				</form>
			`
	}
}
