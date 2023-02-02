export const prerender = false;
import type { PageLoad } from "./$types";

export const load = (({ params }) => {
  return {
    article: {
      name: params.article,
    },
  };
}) satisfies PageLoad;
