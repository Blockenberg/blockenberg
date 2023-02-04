<script lang="ts">
	import { onDestroy } from "svelte";
	import { goto } from "$app/navigation";

	import { sessionStore } from "$src/stores";
	import { AREAS, cmsStore } from "$routes/cms/stores";
	import ImageGallery from "$routes/cms/components/imageGallery/ImageGallery.svelte";

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

<div class="mb-14 p-2 text-center">
	{#if $sessionStore.session}
		<div class="m-auto flex w-fit translate-y-1/2 items-center justify-center">
			<div class="tabs border-base-content overflow-hidden rounded-lg border-2">
				{#each Object.keys(AREAS) as area}
					<button
						on:click={() => handleChangeTab(AREAS[area])}
						class="tab h-10 text-sm font-bold ease-in {$cmsStore.selectedArea ===
						AREAS[area]
							? 'tab-active bg-base-content text-base-100'
							: 'bg-base-100 text-base-content'}"
					>
						{AREAS[area]} Photos
					</button>
				{/each}
			</div>
		</div>

		<ImageGallery />
	{/if}
</div>
