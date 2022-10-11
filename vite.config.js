import { defineConfig, loadEnv  } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import { replaceCodePlugin } from "vite-plugin-replace";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
  base: process.env.VITE_BASEPATH ? process.env.VITE_BASEPATH  : '/',
  plugins: [
    replaceCodePlugin({
      replacements: [
        {from: '__BASEPATH__' , to: (process.env.PROD ? process.env.VITE_BASEPATH : '')},
      ]
    }),
    viteCommonjs(),
    svelte({
      preprocess: [
        sveltePreprocess()
      ]
    }),
    ],
    ssr: {
      noExternal: [ 'dayjs' ]
    },
    optimizeDeps: {
      include: ['dayjs']
    }
});

}
