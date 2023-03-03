<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let pinInput: string;
  export let pinError: boolean;

  const dispatch = createEventDispatcher();

  const cancelConnection = () => {
    dispatch('cancel');
  };

  /**
   * Auto submit the form when the pinInput is equal to the TARGET_PIN_LENGTH
   */
  const TARGET_PIN_LENGTH = 6;
  const checkPin = () => {
    if (pinInput.length === TARGET_PIN_LENGTH) {
      dispatch('checkpin');
    } else {
      pinError = false;
    }
  };
</script>

<section>
  <div
    class="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl"
  >
    <h1 class="text-4xl font-bold leading-none sm:text-5xl">
      New device
      <span class="dark:text-violet-600">connection</span>
      requested.
    </h1>

    <input
      id="pin"
      type="text"
      class="container my-8 mx-auto rounded border-none bg-stone-50 p-4 text-3xl text-stone-900 focus:ring-stone-900 dark:bg-stone-700/50 dark:text-stone-50 focus:dark:bg-stone-900 {pinError &&
        '!text-red-500 ring-red-500'}"
      maxlength="6"
      bind:value={pinInput}
      on:keyup={checkPin}
    />

    {#if !pinError}
      <p class="my-6 px-8 text-lg">
        Enter the connection code from that device to approve this connection.
      </p>
    {:else}
      <p class="my-6 px-8 text-lg text-red-400">
        Entered pin does not match a pin from a known device.
      </p>
    {/if}

    <div class="flex flex-wrap justify-center">
      <button
        on:click={cancelConnection}
        class="flex w-full items-center justify-center rounded border-2 border-violet-600 px-4 py-2 text-lg font-semibold text-violet-600 transition-all delay-150 duration-1000 hover:border-violet-600 hover:bg-violet-100 focus:outline-none  dark:bg-stone-800  dark:text-violet-50 dark:hover:bg-violet-900"
      >
        Cancel request
      </button>
    </div>
  </div>
</section>
