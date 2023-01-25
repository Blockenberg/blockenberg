<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import clipboardCopy from "clipboard-copy";

	import { appName } from "$lib/app-info";
	import { addNotification } from "$lib/notifications";

	export let pin: string;

	const dispatch = createEventDispatcher();

	const cancelConnection = () => {
		dispatch("cancel");
	};

	const copyCode = async () => {
		await clipboardCopy(pin);
		addNotification("Copied to clipboard", "success");
	};
</script>

<section>
	<div
		class="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl"
	>
		<h1 class="text-4xl font-bold leading-none sm:text-5xl">
			Connect to
			<span class="dark:text-violet-400">{appName}</span> application
		</h1>

		<p class="px-8 my-4 text-lg">Enter following code on the other device:</p>
		{#if pin}
			<button
				on:click={copyCode}
				class="my-8 text-5xl cursor-pointer font-mono font-light"
			>
				{pin}
			</button>
		{/if}
		<div class="flex flex-wrap justify-center mt-4">
			<button
				on:click={cancelConnection}
				class="px-8 py-3 m-2 text-lg font-bold dark:bg-violet-400 dark:text-gray-900"
				>Cancel request</button
			>
		</div>
		<div
			class="grid grid-flow-col auto-cols-max gap-4 justify-center items-center text-slate-500 mt-6"
		>
			<span
				class="rounded-lg border-t-2 border-l-2 border-slate-600 dark:border-slate-50 w-4 h-4 block animate-spin"
			/>
			Waiting for a response...
		</div>
	</div>
</section>
