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
      class=" my-8 w-2/3 text-center text-3xl text-gray-900 focus:ring focus:ring-violet-600 {pinError
        ? '!text-red-500 ring-red-500'
        : ''}"
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
      <button on:click={cancelConnection} class="m-2 px-8 py-3 text-base">
        Cancel request
      </button>
    </div>
  </div>
</section>
