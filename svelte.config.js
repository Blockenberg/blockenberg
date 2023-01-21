//import preprocess from 'svelte-preprocess'
import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // preprocess: preprocess({
  //   postcss: true,
  // }),
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      fallback: 'index.html'
    }),
  },
}

export default config
