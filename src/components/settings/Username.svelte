<script lang="ts">
	import clipboardCopy from "clipboard-copy";

	import { sessionStore } from "$src/stores";
	import { addNotification } from "$lib/notifications";
	import { prepareUsername } from "$lib/auth/account";
	import ClipboardIcon from "$components/icons/ClipboardIcon.svelte";
	import TruncatedUsername from "$components/settings/TruncatedUsername.svelte";

	const handleCopyUserHash = async (): Promise<void> => {
		await clipboardCopy($sessionStore.username.hashed);
		addNotification("Copied to clipboard", "success");
	};
</script>

<div class="flex flex-col items-center justify-center text-center">
	<h2 class="title-font mt-4 text-lg font-medium text-white">
		<TruncatedUsername />
	</h2>
	<div class="mt-2 mb-4 h-1 w-12 rounded bg-indigo-500" />
	<div class="flex">
		<p class="text-base text-gray-400">
			{$sessionStore.username.hashed}
		</p>
		<button class="pl-2" on:click={handleCopyUserHash}>
			<ClipboardIcon />
		</button>
	</div>
</div>
