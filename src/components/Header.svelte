<script lang="ts">
	import { sessionStore } from "../stores";
	import Avatar from "$components/settings/Avatar.svelte";
	import BrandLogo from "$components/icons/BrandLogo.svelte";
	let open;
</script>

<header class="container mx-auto flex h-16 items-center justify-between font-bold">
	<a
		rel="noopener noreferrer"
		href="/"
		aria-label="Homepage"
		class="flex space-x-2"
	>
		<BrandLogo />
		<p class="font-bold">Blockenberg</p>
	</a>
	<div class="hidden flex-grow items-center justify-end space-x-8 lg:flex">
		{#if $sessionStore.session}
			<div class="space-x-4">
				<a rel="noopener noreferrer" href="/">Manage</a>
				<a rel="noopener noreferrer" href="/create">Create</a>
				<a rel="noopener noreferrer" href="/about">About</a>
			</div>
		{/if}
		{#if !$sessionStore.session}
			<a
				href="/register"
				class=" border-b-4 border-gray-100 px-4 py-2 text-violet-600 transition-all delay-150 duration-1000 hover:border-violet-600 dark:border-gray-800 dark:bg-violet-600 dark:text-gray-50 hover:dark:border-gray-800 dark:hover:bg-violet-800 "
				>Register</a
			>
		{/if}
	</div>
	<div class="ml-4 flex">
		{#if !$sessionStore.loading && $sessionStore.backupCreated === false}
			<a
				href="/delegate-account"
				class=" border-b-4 border-gray-100 px-4 py-2 text-violet-600 transition-all delay-150 duration-1000 hover:border-violet-600 dark:border-gray-800 dark:bg-violet-600 dark:text-gray-50 hover:dark:border-gray-800 dark:hover:bg-violet-800"
				>Backup</a
			>
		{/if}
		{#if $sessionStore.session}
			<a href="/settings" class="mx-4 cursor-pointer">
				<Avatar size="small" />
			</a>
			<button
				class="flex items-center justify-center p-2 lg:hidden"
				on:click={() => (open = !open)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					class="h-6 w-6 dark:text-gray-50"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			</button>
		{/if}
	</div>
</header>

<div class="w-full flex-col space-y-4 p-4 md:hidden {open ? 'flex' : 'hidden'}">
	<a rel="noopener noreferrer" href="/create">Create</a>
	<a rel="noopener noreferrer" href="/manage">Manage</a>
	<a rel="noopener noreferrer" href="/publish">Publish</a>
</div>
