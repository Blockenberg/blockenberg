<script lang="ts">
  import { getDocFromWNFS } from '$routes/cms/lib/cms';

  import type { PageData } from './$types';
  import Create from '$components/editor/Editor.svelte';
  export let data: PageData;
  let doc;
  const result = new Promise(async (resolve) => {
    doc = await getDocFromWNFS(data.article.name);
    resolve(doc);
  });

  //console.log(result);
</script>

{#await result then}
  <Create
    imageContent={{ name: doc.imgname, src: doc.imgsrc, cid:doc.imgcid }}
    contentHeader={doc.header}
    contentText={doc.content}
    currenttags={doc.tags}
    CID={doc.name}
  />
{/await}
