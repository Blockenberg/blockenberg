<script lang="ts">
  import { sessionStore } from '$src/stores';
  import { generateRecoveryKit } from '$lib/account-settings';
  import Download from '$components/icons/Download.svelte';

  export let handleToggleModal: () => void;
  $: recoveryKit = null;
  $: downloadLinkRef = null;
  $: fileURL = null;

  const prepareRecoveryKitDownload = async () => {
    recoveryKit = await generateRecoveryKit();

    const data = new Blob([recoveryKit], { type: 'text/plain' });

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (fileURL !== null) {
      window.URL.revokeObjectURL(fileURL);
    }

    fileURL = window.URL.createObjectURL(data);
  };
  const recoveryKitPromise = prepareRecoveryKitDownload();

  $: if (downloadLinkRef && fileURL) {
    downloadLinkRef.setAttribute(
      'download',
      `Webnative-RecoveryKit-${$sessionStore.username.trimmed}.txt`
    );

    downloadLinkRef.href = fileURL;
  }
</script>

<input type="checkbox" id="recovery-kit-modal" checked class="modal-toggle" />
<div class="modal !z-max">
  <div
    class="modal-box w-narrowModal sm:w-wideModal relative text-center sm:!pr-11 sm:!pb-11 sm:!pl-11"
  >
    <button
      class="btn btn-xs btn-circle absolute right-2 top-2"
      on:click={handleToggleModal}
    >
      ✕
    </button>

    <div>
      {#await recoveryKitPromise}
        <h3 class="mb-7 text-base">Creating your recovery kit...</h3>

        <div class="text-base-content flex items-center justify-center">
          <span
            class="border-base-content mr-2 inline-block h-4 w-4 animate-spin rounded-lg border-t-2 border-l-2"
          />
        </div>
      {:then}
        <h3 class="mb-7 text-base">Your recovery kit has been created!</h3>

        <div class="mb-6 text-left">
          <p class="mb-2">Please store it somewhere safe for two reasons:</p>
          <ol class="mb-2 list-decimal pl-6">
            <li>
              <strong>It is powerful:</strong>
              Anyone with this recovery kit will have access to all of your private
              data.
            </li>
            <li>
              <strong>It's your backup plan:</strong>
              If you lose access to your connected devices, this kit will help you
              recover your private data.
            </li>
          </ol>
          <p>
            So, keep it somewhere you keep things you don't want to lose or have
            stolen.
          </p>
        </div>

        <!-- svelte-ignore a11y-missing-attribute -->
        <a class="btn btn-primary w-[227px] gap-2" bind:this={downloadLinkRef}>
          <Download /> Download recovery kit
        </a>
      {/await}
    </div>
  </div>
</div>
