<script lang="ts">
  import { accountSettingsStore, sessionStore } from '$src/stores';
  import { getFlagsFromWNFS, setHookInWNFS } from '$lib/account-settings';
  getFlagsFromWNFS();
  let hookurl = $accountSettingsStore.hook;
  let hookstatus;
  let hookmessage = '';
  const httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  async function validateHook(url) {
    if (!httpRegex.test(url)) {
      hookmessage = 'invalid URL';
      hookstatus = false;
      return;
    }
    //console.log($sessionStore.username.hashed);
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
</script>

<h2 class="mt-4 text-3xl font-bold text-gray-50">Publishing Webhook</h2>
<input
  type="text"
  bind:value={hookurl}
  class="container mx-auto border-none bg-gray-50 p-2 text-gray-900 focus:ring-gray-900 dark:bg-gray-700/50 dark:text-gray-50 focus:dark:bg-gray-900"
  placeholder="Webhook URL"
/>
<div class="flex space-x-2">
  <button
    on:click={() => validateHook(hookurl)}
    disabled={hookstatus}
    class="border-b-4 border-gray-100 px-4 py-2 font-bold text-violet-600 transition-all delay-150 duration-1000 hover:border-violet-600 disabled:opacity-10 dark:border-gray-800 dark:bg-violet-600 dark:text-gray-50 hover:dark:border-gray-800 dark:hover:bg-violet-800"
  >
    Validate
  </button>
  <button
    on:click={() => setHookInWNFS(hookurl)}
    disabled={!hookstatus}
    class="border-b-4 border-gray-100 px-4 py-2 font-bold text-violet-600 transition-all delay-150 duration-1000 hover:border-violet-600 disabled:opacity-10 dark:border-gray-800 dark:bg-violet-600 dark:text-gray-50 hover:dark:border-gray-800 dark:hover:bg-violet-800"
  >
    Set
  </button>
</div>
<div class="text-sm">
  {hookmessage}
</div>
