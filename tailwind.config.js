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
			maxHeight: {
				screen1: 'calc(100vh - 100px)',
			},
			textColor: {
				primary: '#fffaf9',
				secondary: '#ff7991',
				main: '#2e384e',
				sub: '#4a768c',
			},
			backgroundColor: {
				bgPrimary: '#2e384e',
				bgSecondary: '#263041',
				main: '#ff7991',
			},
			borderColor: {
				maincolor: '#ff7991',
				subcolor: '#4a768c',
			},
		},
	},
	corePlugins: {
		aspectRatio: false,
	},
};
