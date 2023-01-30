<script lang="ts">
  import { onDestroy } from 'svelte'

  import { filesystemStore, sessionStore } from '$src/stores'
  import { AREAS, cmsStore } from '$routes/gallery/stores'
  import { getImagesFromWNFS, type Image } from '$routes/gallery/lib/gallery'
 
  export let preview

  // If cmsStore.selectedArea changes from private to public, re-run getImagesFromWNFS
  let selectedArea = AREAS.PUBLIC
  const unsubscribecmsStore = cmsStore.subscribe(async updatedStore => {

    if (selectedArea !== updatedStore.selectedArea) {
      selectedArea = updatedStore.selectedArea
      await getImagesFromWNFS()
    }
  })

  function getBase64(image: Blob) {
		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			preview = e.target.result;
		};
	}

  // Once the user has been authed, fetch the images from their file system
  let imagesFetched = false
  const unsubscribeSessionStore = sessionStore.subscribe((newState) => {
    if (newState.session && $filesystemStore && !imagesFetched) {
      imagesFetched = true
      // Get images from the user's public WNFS
      getImagesFromWNFS()
    }
  })

  onDestroy(() => {
    unsubscribecmsStore()
    unsubscribeSessionStore()
  })
</script>

<div
	class="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
>
	{#each $cmsStore.selectedArea === AREAS.PRIVATE ? $cmsStore.privateDocuments : $cmsStore.publicDocuments as image}
		<img
			role="presentation"
			class="object-cover w-full h-44 dark:bg-gray-500 cursor-pointer p-2 hover:bg-gray-200"
			alt={`Gallery Image: ${image.name}`}
			src={image.src}
			on:click={() => (preview = image.src)}
		/>
	{/each}
</div>

