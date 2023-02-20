<script lang="ts">
  import { accountSettingsStore } from '$src/stores';
  import { getFlagsFromWNFS, setHookInWNFS } from '$lib/account-settings';
  getFlagsFromWNFS();
  let hookurl = $accountSettingsStore.hook;
  const httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
</script>

<input
  type="text"
  bind:value={hookurl}
  class="container mx-auto border-none bg-gray-50 p-4 text-gray-900 focus:ring-gray-900 dark:bg-gray-700/50 dark:text-gray-50 focus:dark:bg-gray-900"
  placeholder="Webhook URL"
/>
<div>
  <button
    on:click={() => setHookInWNFS(hookurl)}
    class="border-b-4 border-gray-100 px-4 py-2 font-bold text-violet-600 transition-all delay-150 duration-1000 hover:border-violet-600 dark:border-gray-800 dark:bg-violet-600 dark:text-gray-50 hover:dark:border-gray-800 dark:hover:bg-violet-800"
  >
    Set
  </button>
</div>
