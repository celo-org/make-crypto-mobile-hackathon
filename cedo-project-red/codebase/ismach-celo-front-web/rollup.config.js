import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import json from '@rollup/plugin-json';


import { config } from 'dotenv';
import replace from '@rollup/plugin-replace';


config().parsed;




const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}


import postcss from 'rollup-plugin-postcss';
// import sveltePreprocess from 'svelte-preprocess';



import alias from '@rollup/plugin-alias';



const aliases = alias({
	resolve: ['.svelte', '.js'], //optional, by default this will just look for .js files or folders
	entries: [
		{ find: 'components', replacement: 'src/components' },
		{ find: 'layouts', replacement: 'src/layouts' },
		{ find: 'views', replacement: 'src/views' },
		{ find: 'store', replacement: 'src/store' },
		{ find: 'utils', replacement: 'src/utils' },
	]
});


export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),


		replace({
			'process.env.NODE_ENV': JSON.stringify( 'production' ),
			// 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			// stringify the object       
			app_: JSON.stringify({
				env: {
					IS_PROD: production,
					API_URL: process.env.API_URL,
					MAINTENANCE: process.env.MAINTENANCE,
					// HCAPTCHA_SITE_KEY: process.env.HCAPTCHA_SITE_KEY,
				}
			}),
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),


		postcss(),


		aliases,

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),

		// ---
		json()
	],
	watch: {
		clearScreen: false
	},
};


