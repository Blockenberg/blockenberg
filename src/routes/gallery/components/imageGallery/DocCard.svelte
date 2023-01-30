<script lang="ts">
	import type { Image } from "$routes/gallery/lib/gallery";

	export let image: Image;
	export let openModal: (image: Image) => void;
	//console.log(image.src);

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
	<div class="p-6 space-y-2">
		<h3
			class="text-2xl font-semibold group-hover:underline group-focus:underline"
		>
			{decodeURI(image.name)}
		</h3>
		<span class="text-xs dark:text-gray-400">January 21, 2021</span>
		<p>
			Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex
			has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus
			consulatu patrioque mea, ei vocent delicata indoctum pri.
		</p>
	</div>
</button>
