<script lang="ts">
  import { accountSettingsStore, sessionStore } from '$src/stores';
  import { getFlagsFromWNFS, setFlagsInWNFS } from '$lib/account-settings';
  getFlagsFromWNFS();
  let hookstatus;
  let hookmessage = '';
  const httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  async function validateHook(url) {
    if (!httpRegex.test(url)) {
      hookmessage = 'invalid URL';
      hookstatus = false;
      return;
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          'x-blocken-signature': $sessionStore.username.hashed
        },
        body: JSON.stringify({})
      });
      hookstatus = await response.ok;
    } catch {
      hookmessage = 'failed to reach webhook';
      hookstatus = false;
    }
  }

  function setHookUrl(hookurl) {
    const setres = setFlagsInWNFS(hookurl);
    if (setres) {
      hookmessage = 'url set successfully';
    } else {
      hookmessage = 'storing webhook url failed';
    }

    hookstatus = false;
  }
</script>

<h2 class="mt-4 text-3xl font-bold text-stone-50">Publishing Webhook</h2>
{#if $accountSettingsStore.loading}
  <div
    class="container mx-auto border-none bg-stone-50 p-2 text-stone-900 focus:ring-stone-900 dark:bg-stone-700/50 dark:text-stone-50 focus:dark:bg-stone-900"
  >
    loading
  </div>
{:else}
  <div>
    <input
      type="text"
      bind:value={$accountSettingsStore.hook}
      class="container mx-auto rounded border-none bg-stone-50 p-2 text-stone-900 focus:ring-stone-900 dark:bg-stone-700/50 dark:text-stone-50 focus:dark:bg-stone-900"
      placeholder="Webhook URL"
    />

    <div class="flex space-x-2 mt-3">
      <button
        on:click={() => validateHook($accountSettingsStore.hook)}
        disabled={hookstatus}
        class="w-full justify-center rounded border-2 border-violet-600  bg-violet-600 px-4 py-2 text-xl font-semibold text-white transition-all delay-150 duration-1000 hover:bg-violet-700 focus:outline-none dark:bg-violet-600  dark:text-violet-50 dark:hover:bg-violet-800  md:w-40"
      >
        Validate
      </button>
      <button
        on:click={() => {
          setHookUrl($accountSettingsStore.hook);
        }}
        disabled={!hookstatus}
        class="w-full cursor-pointer justify-center rounded border-2 border-violet-600 px-4 py-2 text-xl font-semibold text-violet-600 transition-all delay-150 duration-1000 hover:border-violet-600 hover:bg-violet-100  focus:outline-none dark:bg-stone-800  dark:text-violet-50 dark:hover:bg-violet-900  md:w-40"
      >
        Set
      </button>
    </div>
  </div>
{/if}
<div class="text-sm">
  {hookmessage}
</div>
