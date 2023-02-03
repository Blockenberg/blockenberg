<script lang="ts">
	import type { Image } from "$routes/cms/lib/cms";

	export let image: Image;
	export let openModal: (image: Image) => void;

	const handleOpenModal = () => openModal(image);
</script>

<button
	on:click={handleOpenModal}
	class="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900 bg-gray-50"
>
	<img
		role="presentation"
		class="object-cover w-full h-44 dark:bg-gray-500"
		alt={`Gallery Image: ${image.name}`}
		src={image.src}
	/>
</button>
