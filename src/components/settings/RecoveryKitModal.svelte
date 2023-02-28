<script lang="ts">
  import { sessionStore } from '$src/stores';
  import { generateRecoveryKit } from '$lib/account-settings';
  import LoadingSpinner from '$components/common/LoadingSpinner.svelte';

  $: recoveryKit = null;
  $: downloadLinkRef = null;
  $: fileURL = null;

  const prepareRecoveryKitDownload = async () => {
    recoveryKit = await generateRecoveryKit();

    const data = new Blob([recoveryKit], { type: 'application/json' });

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
      `Blockenberg-${$sessionStore.username.trimmed}.recovery`
    );

    downloadLinkRef.href = fileURL;
  }
</script>

{#await recoveryKitPromise}
  <div class="flex">
    <LoadingSpinner />&nbsp;Generating your restore kit...
  </div>
{:then}
  <div>
    <!-- svelte-ignore a11y-missing-attribute -->
    <a
      bind:this={downloadLinkRef}
      class="border-b-4 border-stone-100 px-4 py-2 font-bold text-violet-600 transition-all delay-150 duration-1000 hover:border-violet-600 disabled:opacity-10 dark:border-stone-800 dark:bg-violet-600 dark:text-stone-50 hover:dark:border-stone-800 dark:hover:bg-violet-800"
    >
      Download recovery kit
    </a>
  </div>

  <div class="mb-6 text-left">
    <p class="mb-2">Please store it somewhere safe for two reasons:</p>
    <ol class="mb-2 list-decimal pl-6">
      <li>
        <strong>It is powerful:</strong>
        Anyone with this recovery kit will have access to all of your private data.
      </li>
      <li>
        <strong>It's your backup plan:</strong>
        If you lose access to your connected devices, this kit will help you recover
        your private data.
      </li>
    </ol>
    <p>
      So, keep it somewhere you keep things you don't want to lose or have
      stolen.
    </p>
  </div>
{/await}
