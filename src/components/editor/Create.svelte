<script lang="ts">
	import { cmsStore } from "$routes/gallery/stores";
	import {
		uploadImageToWNFS,
		uploadDocumentToWNFS,
	} from "$routes/gallery/lib/gallery";
	import type { ContentDoc } from "$routes/gallery/lib/gallery";

	// Handle files uploaded directly through the file input
	let files: FileList;
	let preview;
	let imageResult;
	let contentHeader, contentText;

	$: if (files) {
		imageResult = uploadImg(files[0]);
	}

	async function uploadImg(file: File) {
		return await uploadImageToWNFS(file);
	}

	async function uploadDoc() {
		console.log(contentHeader, contentText);
		const doc: ContentDoc = {
			image: imageResult,
			header: contentHeader,
			content: contentText,
		};

		uploadDocumentToWNFS(doc);
	}

	function getBase64(image) {
		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			preview = e.target.result;
		};
	}
</script>

<section class="flex flex-col space-y-2 container mx-auto lg:max-w-5xl">
	<label
		for="upload-file"
		class="flex flex-col justify-center items-center object-cover cursor-pointer "
	>
		<div
			class="flex flex-col justify-end items-end py-4 h-60 container"
			style="background: no-repeat center url('{preview || '../Pix.gif'}')"
		>
			<div class="bg-gray-100 text-center p-4 hover:bg-gray-200">
				<span class="font-bold text-sm">Cover Photo</span>
			</div>
		</div>
		<input
			bind:files
			id="upload-file"
			type="file"
			multiple
			accept="image/*"
			class="hidden"
			on:change={() => getBase64(files[0])}
		/>
	</label>
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

	<style>
		@import "https://cdn.quilljs.com/1.3.6/quill.bubble.css";
	</style>
</section>
