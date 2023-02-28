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
  // console.log($sessionStore);
</script>

<div class="flex flex-col items-center justify-center text-center">
  <h2 class="my-4 text-3xl font-bold text-stone-50">
    <TruncatedUsername />
    {$sessionStore.organization ? 'Organization' : 'Account'}
  </h2>
  {#if $sessionStore.organization}
    <span class="my-4 flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="mr-2 h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
        />
      </svg>
      Master Account
    </span>
  {/if}

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
