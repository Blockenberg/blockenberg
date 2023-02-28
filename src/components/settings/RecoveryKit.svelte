<script lang="ts">
  import RecoveryKitModal from '$components/settings/RecoveryKitModal.svelte';

  let modalOpen = false;

  const handleToggleModal = async () => (modalOpen = !modalOpen);
</script>

<div class="flex flex-col space-y-4">
  <h3 class="text-3xl font-bold">Recovery Kit</h3>
  <p>
    Your recovery kit will restore access to your data in the event that you
    lose access to all of your connected devices. We recommend you store your
    kit in a safe place, separate from those devices.
  </p>
  {#if !modalOpen}
    <div>
      <button
        on:click={handleToggleModal}
        class="border-b-4 border-stone-100 px-4 py-2 font-bold text-violet-600 transition-all delay-150 duration-1000 hover:border-violet-600 dark:border-stone-800 dark:bg-violet-600 dark:text-stone-50 hover:dark:border-stone-800 dark:hover:bg-violet-800"
      >
        Create your recovery kit
      </button>
    </div>
  {:else}
    <RecoveryKitModal />
  {/if}
</div>
