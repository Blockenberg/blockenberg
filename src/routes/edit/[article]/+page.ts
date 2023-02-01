import type { PageLoad } from "./$types";
import { deleteImageFromWNFS } from "$routes/gallery/lib/gallery";

export const load = (({ params }) => {
  return {
    article: {
      name: params.article,
    },
  };
}) satisfies PageLoad;
