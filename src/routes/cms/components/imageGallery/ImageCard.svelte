<script lang="ts">
  import type { Image } from '$routes/cms/lib/cms';

  export let image: Image;
  export let openModal: (image: Image) => void;

  const handleOpenModal = () => openModal(image);
</script>

<button
  on:click={handleOpenModal}
  class="group mx-auto max-w-sm bg-stone-50 hover:no-underline focus:no-underline dark:bg-stone-900"
>
  <img
    role="presentation"
    class="h-44 w-full object-cover dark:bg-stone-500"
    alt={`Gallery Image: ${image.name}`}
    src={image.src}
  />
</button>
