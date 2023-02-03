export const prerender = false;
import type { PageLoad } from "./$types";
import { getDocFromWNFS } from "$routes/cms/lib/cms";

export const load = (({ params }) => {
  if (!params.article) return;
  const doc = getDocFromWNFS(params.article);
  console.log(doc);
  return {
    article: {
      name: params.article,
    },
  };
}) satisfies PageLoad;
