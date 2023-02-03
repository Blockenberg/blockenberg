<script lang="ts">
  import { onDestroy } from 'svelte'

  import { filesystemStore, sessionStore } from '$src/stores'
  import { AREAS, cmsStore } from '$routes/cms/stores'
  import { getImagesFromWNFS, type Image } from '$routes/cms/lib/cms'
 
  export let imageContent

  let selectedArea = AREAS.PUBLIC
  cmsStore.update(store => ({
      ...store,
      selectedArea: selectedArea
    }))

  const unsubscribeCMSStore = cmsStore.subscribe(async updatedStore => {
    if (selectedArea !== updatedStore.selectedArea) {
      selectedArea = updatedStore.selectedArea
      await getImagesFromWNFS()
    }
  })

  // Once the user has been authed, fetch the images from their file system
  let imagesFetched = false
  const unsubscribeSessionStore = sessionStore.subscribe((newState) => {
    if (newState.session && $filesystemStore && !imagesFetched) {
      imagesFetched = true
      // Get images from the user's public WNFS
     // $cmsStore.selectedArea === AREAS.PUBLIC
      getImagesFromWNFS()
    }
  })

  onDestroy(() => {
    unsubscribeCMSStore()
    unsubscribeSessionStore()
  })
</script>

<div
	class="grid grid-cols-1 justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3"
>
	{#each $cmsStore.selectedArea === AREAS.PRIVATE ? $cmsStore.privateDocuments : $cmsStore.publicDocuments as image}
		<img
			role="presentation"
			class="h-44 w-full cursor-pointer object-cover p-2 hover:bg-gray-200 dark:bg-gray-500"
			alt={`Gallery Image: ${image.name}`}
			src={image.src}
			on:click={() => (imageContent = image)}
		/>
	{/each}
</div>
