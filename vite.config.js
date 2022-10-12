import { defineConfig, loadEnv  } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    plugins: [
      viteCommonjs(),
      svelte({
        preprocess: [
          sveltePreprocess()
        ]
      }),
    ],
});

}
