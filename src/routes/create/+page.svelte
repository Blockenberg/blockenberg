<script lang="ts">
  import { sessionStore } from '$src/stores';
  import Create from '$components/editor/Editor.svelte';
  import Public from '$components/home/Public.svelte';
</script>

{#if $sessionStore?.session}
  <Create
    imageContent={{ name: '', src: null, cid: null }}
    contentHeader=""
    contentText=""
    CID={null}
    currenttags={null}
  />
{:else}
  <Public />
{/if}
