import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],

      resolve: {
				alias: {
				$lib: path.resolve('./src/lib'),
				'$lib/*': path.resolve('./src/lib/*'),
				$styles: path.resolve('./src/lib/styles'),
				'$styles/*': path.resolve('./src/lib/styles/*'),
				$components: path.resolve('./src/lib/components'),
				'$components/*': path.resolve('./src/lib/components/*')
				}
			}

};

export default config;
