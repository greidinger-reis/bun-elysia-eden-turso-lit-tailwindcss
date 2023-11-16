const {addDynamicIconSelectors} = require("@iconify/tailwind")

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,ts}'],
	theme: {
		extend: {},
	},
	plugins: [
		addDynamicIconSelectors()
	],
}
