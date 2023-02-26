<script lang="ts">
  import clipboardCopy from 'clipboard-copy';

  import { sessionStore } from '$src/stores';
  import { addNotification } from '$lib/notifications';
  //import { prepareUsername } from "$lib/auth/account";
  import ClipboardIcon from '$components/icons/ClipboardIcon.svelte';
  import TruncatedUsername from '$components/settings/TruncatedUsername.svelte';

  const handleCopyUserHash = async (): Promise<void> => {
    await clipboardCopy($sessionStore.username.hashed);
    addNotification('Copied to clipboard', 'success');
  };

  // const userHash = async (): Promise<string> => {
  // 	return await prepareUsername($sessionStore.username.full);
  // };
  // console.log(userHash());
</script>

<div class="flex flex-col items-center justify-center text-center">
  <h2 class="mt-4 text-3xl font-bold text-stone-50">
    <TruncatedUsername />
  </h2>
  <div class="mt-2 mb-4 h-1 w-12 bg-indigo-500" />

  <div class="flex flex-col">
    <button
      class="mb-2 flex w-full flex-row justify-center"
      on:click={handleCopyUserHash}
    >
      <ClipboardIcon />&nbsp;Token
    </button>
    <span class=" w-32 break-all text-stone-400">
      {$sessionStore.username.hashed}
    </span>
  </div>
</div>
