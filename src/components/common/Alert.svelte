<script>
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  let visible = true;
  onMount(() => {
    const interval = setInterval(() => {
      visible = false;
    }, 120000);

    return () => clearInterval(interval);
  });
</script>

{#if visible}
  <div
    transition:fade={{ duration: 2000 }}
    class=" hidden rounded-full bg-violet-600 px-4 py-2 text-white lg:flex"
  >
    <p class="text-center text-sm font-bold">
      New recovery format was introduced. Please generate your recovery file
      again in the
      <a href="/settings" class="inline-block underline">settings.</a>
    </p>
  </div>
{/if}
