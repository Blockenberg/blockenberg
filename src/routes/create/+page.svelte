<script lang="ts">
    import { sessionStore } from '$src/stores'
    import Create from '$components/editor/Create.svelte'
    import Public from '$components/home/Public.svelte'
  </script>
  
  {#if $sessionStore?.session}
    <Create imageContent={{name:"",src:null}} contentHeader="" contentText=""/>
  {:else}
    <Public />
  {/if}
  