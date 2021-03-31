import autoprefixer from 'autoprefixer';
import commonjs from '@rollup/plugin-commonjs';
import { config } from 'dotenv';
import css from 'rollup-plugin-css-only';
import livereload from 'rollup-plugin-livereload';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require('child_process').spawn(
        'npm',
        ['run', 'start', '--', '--dev'],
        {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true
        }
      );

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    }
  };
}

export default {
  input: 'src/main.ts',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js'
  },
  plugins: [
    css({ output: 'bundle.css' }),
    svelte({
      preprocess: sveltePreprocess({
        sourceMap: !production,
        postcss: {
          extract: true,
          minimize: production,
          sourceMap: false,
          plugins: [autoprefixer()]
        }
      }),
      compilerOptions: {
        dev: !production
      }
    }),
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    typescript({
      sourceMap: !production,
      inlineSources: !production
    }),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),

    // Add .env config to __app variable
    replace({
      preventAssignment: true,
      __app: JSON.stringify({
        env: { ...config().parsed }
      })
    })
  ],
  watch: {
    clearScreen: false
  }
};
