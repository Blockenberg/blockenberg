export const prerender = false;
import type { PageLoad } from './$types';

export const load = (({ params }) => {
  if (!params.article) return;
  return {
    article: {
      name: params.article,
    },
  };
}) satisfies PageLoad;
