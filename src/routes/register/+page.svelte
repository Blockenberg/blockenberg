<script lang="ts">
  import { sessionStore } from '$src/stores';

  import Register from '$components/auth/register/Register.svelte';
  import Welcome from '$components/auth/register/Welcome.svelte';
</script>

<noscript>
  To use this application, you need to enable javascript. The whole application
  runs on your computer as we don't want do rely on the specific server
  provider.
</noscript>

{#if $sessionStore.session}
  <Welcome />
{:else}
  <Register />
{/if}
