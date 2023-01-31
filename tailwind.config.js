/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				poppins: ['var(--font-poppins)'],
			},
			aspectRatio: {
				auto: 'auto',
			},
			minHeight: {
				loading: 'calc(100vh - 100px)',
			},
		},
	},
	corePlugins: {
		aspectRatio: false,
	},
};
