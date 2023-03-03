<script lang="ts">
  import { getDocFromWNFS } from '$routes/cms/lib/cms';

  import type { PageData } from './$types';
  import Create from '$components/editor/Editor.svelte';
  export let data: PageData;
  let doc;
  const result = new Promise(async resolve => {
    doc = await getDocFromWNFS(data.article.name);
    console.log(doc);
    resolve(doc);
  });

  //console.log(result);
</script>

{#await result then}
  {#if doc}
    <Create
      imageContent={doc.img}
      contentHeader={doc.header}
      contentText={doc.content}
      currenttags={doc.tags}
      CID={doc.name}
    />
  {/if}
{/await}
