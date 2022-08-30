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
				}
			}
		}
  },
  plugins: []
};