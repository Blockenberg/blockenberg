<script lang="ts">
  import { sessionStore } from '$src/stores';
</script>

<div class="flex flex-col space-y-4">
  <h3 class="text-3xl font-bold">Connected devices</h3>
  {#if $sessionStore.backupCreated}
    <p>You have connected at least one other device.</p>
  {:else}
    <p>You have no other connected devices.</p>
  {/if}
  <div>
    <a
      class="border-b-4 border-stone-100 px-4 py-2 font-bold text-violet-600 transition-all delay-150 duration-1000 hover:border-violet-600 dark:border-stone-800 dark:bg-violet-600 dark:text-stone-50 hover:dark:border-stone-800 dark:hover:bg-violet-800"
      href="/delegate-account"
    >
      Connect an additional device
    </a>
  </div>
</div>
