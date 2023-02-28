<script lang="ts">
  import { goto } from '$app/navigation';

  import { RECOVERY_STATES } from '$lib/auth/account';
  import RightArrow from '$components/icons/RightArrow.svelte';
  import Upload from '$components/icons/Upload.svelte';

  export let handleFileInput: (files: FileList) => Promise<void>;
  export let state: RECOVERY_STATES;

  // Handle files uploaded directly through the file input
  let files: FileList;
  $: if (files) {
    handleFileInput(files);
  }

  $: buttonData = {
    [RECOVERY_STATES.Processing]: {
      text: 'Processing recovery kit...',
      props: {
        disabled: state === RECOVERY_STATES.Processing,
        $$on_click: () => {}
      }
    },
    [RECOVERY_STATES.Done]: {
      text: 'Continue to the app',
      props: {
        $$on_click: () => goto('/')
      }
    }
  };
</script>

{#if state === RECOVERY_STATES.Ready || state === RECOVERY_STATES.Error}
  <label
    for="upload-recovery-kit"
    class="flex cursor-pointer items-center justify-center rounded px-8 py-3 text-lg font-semibold dark:bg-gray-800 dark:text-gray-50"
  >
    Upload your recovery kit
  </label>
  <input
    bind:files
    id="upload-recovery-kit"
    type="file"
    accept=".txt"
    class="hidden"
  />
{:else}
  {@const { $$on_click, ...props } = buttonData[state].props}
  <button
    class="rounded px-8 py-3 text-lg font-semibold dark:bg-gray-800 dark:text-gray-50"
    {...props}
    on:click={$$on_click}
  >
    {#if state === RECOVERY_STATES.Processing}
      <span
        class="h-[16px] w-[16px] animate-spin rounded-full border-2 border-t-2 border-neutral-900 border-t-orange-500 text-sm ease-linear"
      />
    {/if}
    {buttonData[state].text}
    {#if state === RECOVERY_STATES.Done}
      <RightArrow />
    {/if}
  </button>
{/if}
