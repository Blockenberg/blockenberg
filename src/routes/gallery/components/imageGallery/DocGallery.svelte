<script lang="ts">
	import { onDestroy } from "svelte";

	import { filesystemStore, sessionStore } from "$src/stores";
	import { AREAS, cmsStore } from "$routes/gallery/stores";
	import { getDocsFromWNFS } from "$routes/gallery/lib/gallery";

	// If cmsStore.selectedArea changes from private to public, re-run getDocsFromWNFS
	let selectedArea = null;
	const unsubscribecmsStore = cmsStore.subscribe(async (updatedStore) => {
		// Get initial selectedArea
		if (!selectedArea) {
			selectedArea = updatedStore.selectedArea;
		}

		if (selectedArea !== updatedStore.selectedArea) {
			selectedArea = updatedStore.selectedArea;
			await getDocsFromWNFS();
		}
	});

	// Once the user has been authed, fetch the images from their file system
	let imagesFetched = false;
	const unsubscribeSessionStore = sessionStore.subscribe((newState) => {
		if (newState.session && $filesystemStore && !imagesFetched) {
			imagesFetched = true;
			// Get images from the user's public WNFS
			getDocsFromWNFS();
		}
	});

	onDestroy(() => {
		unsubscribecmsStore();
		unsubscribeSessionStore();
	});
</script>

<div
	class="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
>
	{#each $cmsStore.selectedArea === AREAS.PRIVATE ? $cmsStore.privateDocuments : $cmsStore.publicDocuments as doc}
		<a
			href="/edit/${doc.name}"
			class="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900 bg-gray-50"
		>
			<img
				role="presentation"
				class="object-cover w-full h-44 dark:bg-gray-500"
				alt="Cover image for ${doc.name}"
				src={doc.src}
			/>
			<div class="p-6 space-y-2">
				<h3
					class="text-2xl font-semibold group-hover:underline group-focus:underline"
				>
					{decodeURI(doc.name)}
				</h3>
				<span class="text-xs dark:text-gray-400"
					>{new Date(doc.ctime).toLocaleDateString("en-GB", {
						weekday: "long",
						year: "numeric",
						month: "long",
						day: "numeric",
					})}</span
				>
				<p>
					{@html doc.content}
				</p>
			</div>
		</a>
	{/each}
</div>
