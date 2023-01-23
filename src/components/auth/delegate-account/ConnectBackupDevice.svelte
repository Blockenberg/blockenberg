<script lang="ts">
	import { goto } from "$app/navigation";
	import clipboardCopy from "clipboard-copy";

	import { filesystemStore, sessionStore } from "../../../stores";
	import Share from "$components/icons/Share.svelte";
	import { addNotification } from "$lib/notifications";
	import { setBackupStatus } from "$lib/auth/backup";

	const skipBackup = () => {
		setBackupStatus($filesystemStore, { created: false });

		sessionStore.update((session) => ({
			...session,
			backupCreated: false,
		}));

		goto("/");
	};

	export let qrcode: HTMLOrSVGElement;
	export let connectionLink: string;
	export let backupCreated: boolean;
	console.log(qrcode);

	const copyLink = async () => {
		await clipboardCopy(connectionLink);
		addNotification("Copied to clipboard", "success");
	};
</script>

<section class="p-6 min-h-[calc(100vh-128px)] ">
	<div
		class="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-5"
	>
		<div
			class="w-full px-6 py-16  sm:px-12 md:px-16 xl:col-span-2 bg-gray-50 dark:bg-gray-900"
		>
			<span class="block mb-2 text-violet-600">Blockenberg</span>
			<h1 class="text-5xl font-bold text-gray-900 dark:text-gray-50">Backup</h1>

			<div class="h-80 w-full flex justify-center my-4">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					version="1.1"
					width="256"
					height="256"
				>
					{@html qrcode}
				</svg>
			</div>
			<p>
				<span class="font-bold text-gray-900 dark:text-gray-50">Stay safe.</span
				> You can backup your credentials to a different device in case you need
				to restore access. We strongly recommend to scan the QR code with a mobile
				device.
			</p>
			<p class="pt-2">
				You can also click the button below and send the link to the other
				device (another computer).
			</p>
			<div class="flex space-x-2 justify-center">
				<button
					class="px-8 py-3 mt-12  bg-violet-600 text-gray-50 hover:bg-violet-500"
					on:click={copyLink}>Share link</button
				>
				<button
					class="px-8 py-3 mt-12  bg-gray-200 text-gray-900 hover:bg-gray-100"
					on:click={skipBackup}>Skip</button
				>
			</div>
		</div>
		<img
			src="https://images.unsplash.com/photo-1465420513954-e331ffa275ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
			alt=""
			class="object-cover h-full  xl:col-span-3 bg-gray-500"
		/>
	</div>
</section>