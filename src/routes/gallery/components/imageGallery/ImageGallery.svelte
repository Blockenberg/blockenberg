<script lang="ts">
  import { onDestroy } from 'svelte'

  import { filesystemStore, sessionStore } from '$src/stores'
  import { AREAS, cmsStore } from '$routes/gallery/stores'
  import { getImagesFromWNFS, type Image } from '$routes/gallery/lib/gallery'
  import FileUploadCard from '$routes/gallery/components/upload/FileUploadCard.svelte'
  import ImageCard from '$routes/gallery/components/imageGallery/ImageCard.svelte'
  import ImageModal from '$routes/gallery/components/imageGallery/ImageModal.svelte'

  /**
   * Open the ImageModal and pass it the selected `image` from the gallery
   * @param image
   */
  let selectedImage: Image
  const setSelectedImage: (image: Image) => void = image =>
    (selectedImage = image)

  const clearSelectedImage = () => (selectedImage = null)

  // If cmsStore.selectedArea changes from private to public, re-run getImagesFromWNFS
  let selectedArea = null
  const unsubscribecmsStore = cmsStore.subscribe(async updatedStore => {
    // Get initial selectedArea
    if (!selectedArea) {
      selectedArea = updatedStore.selectedArea
    }

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
      getImagesFromWNFS()
    }
  })

  onDestroy(() => {
    unsubscribecmsStore()
    unsubscribeSessionStore()
  })
</script>

<div class="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {#each $cmsStore.selectedArea === AREAS.PRIVATE ? $cmsStore.privateDocuments : $cmsStore.publicDocuments as image}
  <ImageCard {image} openModal={setSelectedImage} />
  {/each}
</div>
	

{#if selectedImage}
	<FileUploadCard />
	<ImageModal
		image={selectedImage}
		isModalOpen={!!selectedImage}
		on:close={clearSelectedImage}
	/>
{/if}
