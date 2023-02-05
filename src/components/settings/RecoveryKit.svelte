<script lang="ts">
	import RecoveryKitModal from "$components/settings/RecoveryKitModal.svelte";

	let modalOpen = false;

	const handleToggleModal = async () => (modalOpen = !modalOpen);
</script>

<div class="flex flex-col space-y-4">
	<h3 class="text-2xl font-bold">Recovery Kit</h3>
	<p>
		Your recovery kit will restore access to your data in the event that you
		lose access to all of your connected devices. We recommend you store your
		kit in a safe place, separate from those devices.
	</p>
	<div>
		<button on:click={handleToggleModal}>
			<span class="bg-gray-50 text-base dark:bg-violet-600 dark:text-gray-900 p-2">
				Create your recovery kit</span
			>
		</button>
	</div>
</div>

{#if modalOpen}
	<RecoveryKitModal {handleToggleModal} />
{/if}
