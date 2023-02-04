<script lang="ts">
	import { goto } from "$app/navigation";
	import { uploadImageToWNFS, uploadDocumentToWNFS } from "$routes/cms/lib/cms";
	import type { ContentDoc } from "$routes/cms/lib/cms";
	import ImagePicker from "$routes/cms/components/imageGallery/ImagePicker.svelte";

	//I'll make this universal for the updates as well, just running out of time

	// Handle files uploaded directly through the file input
	let files: FileList;
	let preview;
	let imageContent;
	let contentHeader, contentText;
	let galleryModal: boolean = false;

	$: if (files) {
		uploadImg(files[0]);
	}

	async function uploadImg(file: File) {
		const uploadres = await uploadImageToWNFS(file);
		console.log(uploadres);
		imageContent.name = uploadres;
	}

	async function uploadDoc(publish: boolean) {
		console.log(imageContent);
		const doc: ContentDoc = {
			image: JSON.stringify(imageContent),
			header: contentHeader,
			content: contentText,
			private: true,
		};

		uploadDocumentToWNFS(doc, publish, false).then(() => goto("/"));
	}

	function getBase64(image: Blob) {
		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			preview = e.target.result;
		};
	}
</script>

<section
	class="container mx-auto flex flex-col items-start justify-start space-y-2 lg:max-w-5xl"
>
	<div
		class="container flex h-60 flex-col items-end justify-end py-4"
		style="background: no-repeat center/cover url('{preview ||
			imageContent?.src ||
			'https://images.unsplash.com/photo-1527176930608-09cb256ab504?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80'}')"
	>
		<div class="flex space-x-2">
			{#if galleryModal}
				<label
					for="upload-file"
					class="flex cursor-pointer flex-col items-center justify-center object-cover"
				>
					<span
						class="flex bg-gray-50 px-4 py-2 dark:bg-violet-600 dark:text-gray-900"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="mr-2 h-5 w-5"
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
				class="bg-gray-50 px-4 py-2 dark:bg-violet-600 dark:text-gray-900"
				on:click={() =>
					galleryModal ? (galleryModal = false) : (galleryModal = true)}
			>
				<span class="text-sm font-bold">Cover Photo</span>
			</button>
		</div>
	</div>
	{#if galleryModal}
		<button
			class="flex max-h-96 overflow-y-auto"
			on:click={() => (galleryModal = false)}
		>
			<ImagePicker bind:imageContent />
		</button>
	{/if}

	<input
		type="text"
		bind:value={contentHeader}
		class="container mx-auto border-none bg-gray-100 text-3xl text-gray-900 focus:ring-gray-900 dark:bg-gray-700/50 dark:text-gray-50 focus:dark:bg-gray-900"
		placeholder="Header"
		tabindex={0}
	/>
	<div
		contenteditable="true"
		class="container mx-auto h-80 p-4 text-gray-900 dark:bg-gray-700/50 dark:text-gray-50  focus:dark:bg-gray-900"
		bind:innerHTML={contentText}
		placeholder="Content..."
	/>

	<div class="container mx-auto">
		<button
			on:click={() => uploadDoc(false)}
			class="bg-gray-50 px-4 py-2 dark:bg-violet-600 dark:text-gray-900"
			>Save</button
		>
		<button
			on:click={() => uploadDoc(true)}
			class="bg-gray-50 px-4 py-2 dark:text-gray-900">Publish</button
		>
	</div>
</section>
