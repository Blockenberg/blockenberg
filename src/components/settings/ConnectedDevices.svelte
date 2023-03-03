<script lang="ts">
  import { sessionStore } from '$src/stores';
</script>
{#if $sessionStore.organization}
<div class="flex flex-col space-y-4">
  <h3 class="text-3xl font-bold">Connected teammates</h3>
  {#if $sessionStore.backupCreated}
    <p>Account is connected to at least one other device.</p>
  {:else}
    <p>Working solo? Consider adding your own device.</p>
  {/if}
  <div>
    <a
      class="w-full justify-center rounded border-2 border-violet-600  bg-violet-600 px-4 py-2 text-xl font-semibold text-white transition-all delay-150 duration-1000 hover:bg-violet-700 focus:outline-none dark:bg-violet-600  dark:text-violet-50 dark:hover:bg-violet-800  md:w-40"
      href="/delegate-account"
    >
      Connect an additional device
    </a>
  </div>
</div>
{:else}
<div class="flex flex-col space-y-4">
  <h3 class="text-3xl font-bold">Connected devices</h3>
  {#if $sessionStore.backupCreated}
    <p>You have connected at least one other device.</p>
  {:else}
    <p>You have no other connected devices.</p>
  {/if}
  <div>
    <a
      class="w-full justify-center rounded border-2 border-violet-600  bg-violet-600 px-4 py-2 text-xl font-semibold text-white transition-all delay-150 duration-1000 hover:bg-violet-700 focus:outline-none dark:bg-violet-600  dark:text-violet-50 dark:hover:bg-violet-800  md:w-40"
      href="/delegate-account"
    >
      Connect an additional device
    </a>
  </div>
</div>
{/if}