/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
  theme: {
    extend: {
			colors: {
				'primary': {
					light: '#6A9FC8',
					DEFAULT: '#4c8cbd',
					dark: '#376c95'
				},
				'vblue': {
					DEFAULT: '#055D94',
					'50': '#E1F3FE',
					'100': '#44B3F9',
					'200': '#1CA3F7',
					'300': '#088FE3',
					'400': '#0676BB',
					'500': '#055D94',
					'600': '#045180',
					'700': '#04446D',
					'800': '#033859',
					'900': '#022B45'
				},
			}
		}
  },
  plugins: []
};