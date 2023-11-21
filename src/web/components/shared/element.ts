import { App } from '@/app'
import { edenTreaty } from '@elysiajs/eden'
import { LitElement } from 'lit'

export class LitElementWithEden extends LitElement {
	static client = edenTreaty<App>('http://localhost:3000/')
	constructor() {
		super()
	}
}
