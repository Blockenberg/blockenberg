<script lang="ts">
  import LoadingSpinner from '$components/common/LoadingSpinner.svelte';
  import { fade } from 'svelte/transition';
</script>

<div class="flex h-screen w-full items-center justify-center opacity-90" transition:fade>
  <LoadingSpinner />
</div>
