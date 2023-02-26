<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import clipboardCopy from 'clipboard-copy';

  import { appName } from '$lib/app-info';
  import { addNotification } from '$lib/notifications';

  export let pin: string;

  const dispatch = createEventDispatcher();

  const cancelConnection = () => {
    dispatch('cancel');
  };

  const copyCode = async () => {
    await clipboardCopy(pin);
    addNotification('Copied to clipboard', 'success');
  };
</script>

<section>
  <div
    class="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl"
  >
    <h1 class="text-4xl font-bold leading-none sm:text-5xl">
      Connect to
      <span class="dark:text-violet-600">{appName}</span>
       application
    </h1>

    <p class="my-4 px-8 text-lg">Enter following code on the other device:</p>
    {#if pin}
      <button
        on:click={copyCode}
        class="my-8 cursor-pointer font-mono text-5xl font-light"
      >
        {pin}
      </button>
    {/if}
    <div class="mt-4 flex flex-wrap justify-center">
      <button
        on:click={cancelConnection}
        class="m-2 px-8 py-3 text-lg font-bold dark:bg-violet-600 dark:text-stone-900"
      >
        Cancel request
      </button>
    </div>
    <div
      class="mt-6 grid auto-cols-max grid-flow-col items-center justify-center gap-4 text-slate-500"
    >
      <span
        class="block h-4 w-4 animate-spin rounded-lg border-t-2 border-l-2 border-slate-600 dark:border-slate-50"
      />
      Waiting for a response...
    </div>
  </div>
</section>
