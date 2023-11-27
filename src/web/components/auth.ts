import { TWStyles } from '@/styles/output'
import { APIRoutes } from '@/types/api-routes'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('x-signin-form')
export class SigninForm extends LitElement {
	static styles = TWStyles
	private endpoint: APIRoutes['post'] = '/api/auth/signin'

	render() {
		return html`
				<form
					id="signin-form"
					class="border bg-base-200 rounded-lg w-80 items-center p-4 flex flex-col gap-4"
					hx-post=${this.endpoint}
				>
					<input name="email" type="email" class="hidden"></input>
					<input name="password" type="password" class="hidden"></input>
					<div class="w-full form-control">
						<label class="label">
							<span class="label-text">Username or email address</span>
						</label>
						<input tabindex="1" class="input focus:input-primary input-bordered input-sm focus:border-none focus:outline-offset-0" name="__3m4il" type="email" required></input>
					</div>
					<div class="w-full form-control">
						<label class="label">
							<span class="label-text">Password</span>
							<a class="label-text-alt link link-primary" tabindex="2" href="/auth/password-reset">Forgot password?</a>
						</label>
						<input tabindex="1" class="input focus:input-primary input-bordered input-sm focus:border-none focus:outline-offset-0" name="__p4ssw0rd" type="password" required></input>
					</div>
					<button type="submit" class="w-full mt-2 btn btn-success btn-sm text-white">Sign in</button>
				</form>
			`
	}
}

@customElement('x-signup-form')
export class SignupForm extends LitElement {
	static styles = TWStyles
	private endpoint: APIRoutes['post'] = '/api/auth/signup'

	render() {
		return html`
				<form
					id="signin-form"
					class="border bg-base-200 rounded-lg w-80 items-center p-4 flex flex-col gap-4"
					hx-post=${this.endpoint}
				>
					<input name="username" type="email" class="hidden"></input>
					<input name="email" type="email" class="hidden"></input>
					<input name="password" type="password" class="hidden"></input>
					<div class="w-full form-control">
						<label class="label">
							<span class="label-text">Username</span>
						</label>
						<input tabindex="1" class="input focus:input-primary input-bordered input-sm focus:border-none focus:outline-offset-0" name="__us3rn4m3" type="text" required></input>
					</div>
					<div class="w-full form-control">
						<label class="label">
							<span class="label-text">Email address</span>
						</label>
						<input tabindex="1" class="input focus:input-primary input-bordered input-sm focus:border-none focus:outline-offset-0" name="__3m4il" type="email" required></input>
					</div>
					<div class="w-full form-control">
						<label class="label">
							<span class="label-text">Password</span>
						</label>
						<input tabindex="1" class="input focus:input-primary input-bordered input-sm focus:border-none focus:outline-offset-0" name="__p4ssw0rd" type="password" required></input>
					</div>
					<label class="flex items-center w-full gap-2">
						<input type="checkbox" class="bg-white checkbox checked:checkbox-primary checkbox-sm"></input>
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
