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
  <h2 class="my-4 text-3xl font-bold dark:text-stone-50">
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

  <div class="mt-2 mb-4 h-1 w-12 bg-violet-500 lg:w-24" />

  <div class="flex flex-col rounded-md border bg-violet-600 p-4 text-stone-50">
    <button
      class="mb-2 flex w-full flex-row justify-center font-semibold"
      on:click={handleCopyUserHash}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
        />
      </svg>
      &nbsp;Token
    </button>
    <span class=" w-32 break-all text-stone-400">
      {$sessionStore.username.hashed}
    </span>
  </div>
</div>
