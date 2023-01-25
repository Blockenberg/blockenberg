<script lang="ts">
	import { cmsStore } from "$routes/gallery/stores";
	import { handleFileInput } from "$routes/gallery/lib/gallery";

	// Handle files uploaded directly through the file input
	let files: FileList;
	$: if (files) {
		handleFileInput(files);
	}

	import { onMount } from "svelte";

	let editor;

	export let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, "blockquote", "link", "image", "video"],
		["bold", "italic", "underline", "strike"],
		[{ list: "ordered" }, { list: "ordered" }],
		[{ align: [] }],
		["clean"],
	];

	onMount(async () => {
		const { default: Quill } = await import("quill");

		let quill = new Quill(editor, {
			modules: {
				toolbar: toolbarOptions,
			},
			theme: "bubble",
			placeholder: "",
		});
	});
</script>

<label
	for="upload-file"
	class="flex flex-col justify-center items-center  object-cover cursor-pointer"
>
	<div
		class="flex flex-col justify-center items-center pt-5 pb-6"
	>
		<p class="mt-4 mb-2 text-sm">
			<span class="font-bold text-sm">Cover Photo</span>
		</p>
		<p class="text-xxs">SVG, PNG, JPG or GIF</p>
	</div>
	<input
		bind:files
		id="upload-file"
		type="file"
		multiple
		accept="image/*"
		class="hidden"
	/>
</label>
<div
	class="editor-wrapper h-60 container mx-auto text-gray-900 dark:text-gray-50 focus:border-violet-600 border"
>
	<div id="editor" bind:this={editor} />
</div>

<style>
	@import "https://cdn.quilljs.com/1.3.6/quill.bubble.css";
</style>
