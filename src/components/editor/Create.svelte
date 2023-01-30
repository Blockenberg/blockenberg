<script lang="ts">
	import { onDestroy } from "svelte";
	import { AREAS, cmsStore } from "$routes/gallery/stores";
	import {
		uploadImageToWNFS,
		uploadDocumentToWNFS,
	} from "$routes/gallery/lib/gallery";
	import type { ContentDoc } from "$routes/gallery/lib/gallery";
	import ImagePicker from "$routes/gallery/components/imageGallery/ImagePicker.svelte";

	// Handle files uploaded directly through the file input
	let files: FileList;
	let preview;
	let imageResult;
	let contentHeader, contentText;
	let galleryModal: boolean = false;

	$: if (files) {
		uploadImg(files[0]);
	}

	async function uploadImg(file: File) {
		imageResult = await uploadImageToWNFS(file);
		//console.log(await imageResult);
	}

	async function uploadDoc() {
		//console.log(imageResult);
		const doc: ContentDoc = {
			image: imageResult,
			header: contentHeader,
			content: contentText,
		};

		uploadDocumentToWNFS(doc);
	}

	function getBase64(image: Blob) {
		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			preview = e.target.result;
		};
	}
</script>

<section class="flex flex-col space-y-2 container mx-auto lg:max-w-5xl">
	<div
		class="flex flex-col justify-end items-end py-4 h-60 container"
		style="background: no-repeat center url('{preview || '../Pix.gif'}')"
	>
		<div class="flex space-x-2">
			{#if galleryModal}
				<label
					for="upload-file"
					class="flex flex-col justify-center items-center object-cover cursor-pointer"
				>
					<span
						class="flex px-4 py-2 bg-gray-50 dark:bg-violet-600 dark:text-gray-900"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="w-5 h-5 mr-2"
						>
							<path
								fill-rule="evenodd"
								d="M13.75 7h-3V3.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0L6.2 4.74a.75.75 0 001.1 1.02l1.95-2.1V7h-3A2.25 2.25 0 004 9.25v7.5A2.25 2.25 0 006.25 19h7.5A2.25 2.25 0 0016 16.75v-7.5A2.25 2.25 0 0013.75 7zm-3 0h-1.5v5.25a.75.75 0 001.5 0V7z"
								clip-rule="evenodd"
							/>
						</svg>

						Upload</span
					>
				</label>
				<input
					bind:files
					id="upload-file"
					type="file"
					multiple
					accept="image/*"
					class="hidden"
					on:change={() => getBase64(files[0])}
				/>
			{/if}
			<button
				class="px-4 py-2 bg-gray-50 dark:bg-violet-600 dark:text-gray-900"
				on:click={() =>
					galleryModal ? (galleryModal = false) : (galleryModal = true)}
			>
				<span class="font-bold text-sm">Cover Photo</span>
			</button>
		</div>
	</div>
	{#if galleryModal}
		<button class="flex overflow-y-auto max-h-96" on:click={() => (galleryModal = false)}>
			<ImagePicker bind:preview  />
		</button>
	{/if}

	<input
		type="text"
		bind:value={contentHeader}
		class="container mx-auto text-gray-900 dark:text-gray-50 dark:bg-gray-800 bg-gray-100 focus:border-violet-600 border border-gray-600 text-3xl"
		placeholder="Header"
	/>
	<div
		contenteditable="true"
		class="h-80 container mx-auto text-gray-900 dark:text-gray-50 focus:border-violet-600 border border-gray-600 p-4"
		bind:innerHTML={contentText}
		placeholder="Content..."
	/>

	<div class="mx-auto container">
		<button
			on:click={uploadDoc}
			class="px-4 py-2 bg-gray-50 dark:bg-violet-600 dark:text-gray-900"
			>Save</button
		>
	</div>
</section>
