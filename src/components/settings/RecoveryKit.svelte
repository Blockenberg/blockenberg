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
      <button on:click={handleToggleModal}>
        <span
          class="w-full justify-center rounded border-2 border-violet-600  bg-violet-600 px-4 py-2 text-xl font-semibold text-white transition-all delay-150 duration-1000 hover:bg-violet-700 focus:outline-none dark:bg-violet-600  dark:text-violet-50 dark:hover:bg-violet-800  md:w-40"
        >
          Create your recovery kit
        </span>
      </button>
    </div>
  {:else}
    <RecoveryKitModal />
  {/if}
</div>
