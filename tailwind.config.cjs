const { addDynamicIconSelectors } = require('@iconify/tailwind')
const daisyui = require('daisyui')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,ts}'],
	theme: {
		extend: {},
	},
	plugins: [daisyui, addDynamicIconSelectors()],
}
