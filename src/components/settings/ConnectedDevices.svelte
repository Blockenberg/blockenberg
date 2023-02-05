<script lang="ts">
	import { sessionStore } from "$src/stores";
</script>

<div class="flex flex-col space-y-4">
	<h3 class="text-2xl font-bold">Connected devices</h3>
	{#if $sessionStore.backupCreated}
		<p>You have connected at least one other device.</p>
	{:else}
		<p>You have no other connected devices.</p>
	{/if}
	<div>
		<a
			class="bg-gray-50 text-base dark:bg-violet-600 dark:text-gray-900 p-2"
			href="/delegate-account"
		>
			Connect an additional device
		</a>
	</div>
</div>
