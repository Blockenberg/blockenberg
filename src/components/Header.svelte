<script lang="ts">
	import { sessionStore } from "../stores";
	import Avatar from "$components/settings/Avatar.svelte";
	import BrandLogo from "$components/icons/BrandLogo.svelte";
</script>

<header
	class="container flex items-center justify-between h-16 px-4 mx-auto"
>
	<a rel="noopener noreferrer" href="/" aria-label="Homepage" class="flex space-x-2">
		<BrandLogo /> <p class="font-bold">Blockenberg</p>
	</a>
	<div class="items-center hidden space-x-8 lg:flex justify-end flex-grow">
		{#if $sessionStore.session}
			<div class="space-x-4">
				<a rel="noopener noreferrer" href="#">Create</a>
				<a rel="noopener noreferrer" href="#">Manage</a>
				<a rel="noopener noreferrer" href="#">Publish</a>
			</div>
		{/if}
		{#if !$sessionStore.session}
			<a
				href="/register"
				class="px-4 py-2 bg-gray-50 dark:bg-violet-600 dark:text-gray-900 "
				>Register</a
			>
		{/if}
	</div>
  <div class="flex ml-4">
	{#if !$sessionStore.loading && $sessionStore.backupCreated === false}
		<a
			href="/delegate-account"
			class="px-4 py-2 bg-gray-50 dark:bg-violet-600 dark:text-gray-900"
			>Backup</a
		>
	{/if}
	{#if $sessionStore.session}
		<button class="flex items-center justify-center p-2 lg:hidden">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				class="w-6 h-6 dark:text-gray-50"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/>
			</svg>
		</button>
		<a href="/settings" class="mx-4 cursor-pointer">
			<Avatar size="small" />
		</a>
	{/if}
</div>
</header>
