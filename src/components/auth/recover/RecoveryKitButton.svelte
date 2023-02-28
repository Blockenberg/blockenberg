<script lang="ts">
  import { goto } from '$app/navigation';

  import { RECOVERY_STATES } from '$lib/auth/account';
  import RightArrow from '$components/icons/RightArrow.svelte';

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
    accept=".recovery"
    class="hidden"
  />
{:else}
  <div
    class="flex animate-pulse cursor-pointer items-center justify-center rounded px-8 py-3 text-lg font-semibold dark:bg-gray-800 dark:text-gray-50"
  >
    {RECOVERY_STATES.Processing ? 'Attempting recovery' : 'Done'}
  </div>
{/if}
