<script lang="ts">
	import { sessionStore } from "../../stores";
	import { onDestroy } from "svelte";
	import { goto } from "$app/navigation";
	import { AREAS, cmsStore } from "$routes/gallery/stores";
	import DocGallery from "$routes/gallery/components/imageGallery/DocGallery.svelte";

	/**
	 * Tab between the public/private areas and load associated images
	 * @param area
	 */
	const handleChangeTab: (area: AREAS) => void = (area) =>
		cmsStore.update((store) => ({
			...store,
			selectedArea: area,
		}));

	// If the user is not authed redirect them to the home page
	const unsubscribe = sessionStore.subscribe((newState) => {
		if (!newState.loading && !newState.session) {
			goto("/");
		}
	});

	onDestroy(unsubscribe);
</script>

<section>
	<div
		class="container mx-auto flex flex-col items-center px-4 py-8 text-center md:py-12 md:px-10 lg:px-32 xl:max-w-3xl"
	>
		<h1 class="text-4xl font-bold leading-none sm:text-5xl">
			Welcome
			<span class="dark:text-violet-400">{$sessionStore.username.trimmed}</span
			>!
		</h1>
	</div>
</section>
<section class="py-6 sm:py-4 min-h-[calc(100vh-300px)]">
	<div class="container p-6 mx-auto space-y-8">
		<div class="flex justify-center">
			{#each Object.keys(AREAS) as area}
				<button
					on:click={() => handleChangeTab(AREAS[area])}
					class="px-4 py-2 font-bold text-gray-900 ease-in {$cmsStore.selectedArea ===
					AREAS[area]
						? ' dark:bg-violet-400 text-violet-400 dark:text-gray-900 underline dark:no-underline'
						: 'dark:text-gray-100'}"
				>
					{AREAS[area]}
				</button>
			{/each}
		</div>

		{#if $sessionStore.session}
			<DocGallery />
		{/if}
	</div>
</section>
