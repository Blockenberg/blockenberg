<script>
	import { onMount, onDestroy } from "svelte";
	import { Editor } from "@tiptap/core";
	import StarterKit from "@tiptap/starter-kit";
	import Image from "@tiptap/extension-image";
	let dialog;
	let imgurl;
	let element;
	let editor;

	export let editorcontent;

	function loadImage() {
		if (imgurl) {
			console.log(imgurl);
			editor.chain().focus().setImage({ src: imgurl }).run();
		}
	}

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit, Image],
			editorProps: {
				attributes: {
					class: "prose xl:prose-lg m-5 focus:outline-none max-w-none",
				},
			},
			content: "<p>Your article... </p>",
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			},
			onUpdate: ({ editor }) => {
				editorcontent = editor.getHTML();
				//console.log(editorcontent)
			},
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

{#if editor}
	<div class="max-w-full overflow-hidden">
		<div class="relative flex space-x-4 overflow-x-auto">
			<button
				on:click={() =>
					console.log && editor.chain().focus().toggleBold().run()}
				disabled={!editor.can().chain().focus().toggleBold().run()}
				class={editor.isActive("bold")
					? "editor-btn-selected"
					: "editor-btn-primary"}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					class="h-5 w-5 text-gray-900 dark:text-gray-50"
					><path fill="none" d="M0 0h24v24H0z" /><path
						fill="currentColor"
						d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z"
					/></svg
				>
			</button>
			<button
				on:click={() => editor.chain().focus().toggleItalic().run()}
				disabled={!editor.can().chain().focus().toggleItalic().run()}
				class={editor.isActive("italic")
					? "editor-btn-selected"
					: "editor-btn-primary"}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					class="h-5 w-5 text-gray-900 dark:text-gray-50"
					><path fill="none" d="M0 0h24v24H0z" /><path
						fill="currentColor"
						d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z"
					/></svg
				>
			</button>
			<button
				on:click={() => editor.chain().focus().toggleStrike().run()}
				disabled={!editor.can().chain().focus().toggleStrike().run()}
				class={editor.isActive("strike")
					? "editor-btn-selected"
					: "editor-btn-primary"}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					class="h-5 w-5 text-gray-900 dark:text-gray-50"
					><path fill="none" d="M0 0h24v24H0z" /><path
						fill="currentColor"
						d="M17.154 14c.23.516.346 1.09.346 1.72 0 1.342-.524 2.392-1.571 3.147C14.88 19.622 13.433 20 11.586 20c-1.64 0-3.263-.381-4.87-1.144V16.6c1.52.877 3.075 1.316 4.666 1.316 2.551 0 3.83-.732 3.839-2.197a2.21 2.21 0 0 0-.648-1.603l-.12-.117H3v-2h18v2h-3.846zm-4.078-3H7.629a4.086 4.086 0 0 1-.481-.522C6.716 9.92 6.5 9.246 6.5 8.452c0-1.236.466-2.287 1.397-3.153C8.83 4.433 10.271 4 12.222 4c1.471 0 2.879.328 4.222.984v2.152c-1.2-.687-2.515-1.03-3.946-1.03-2.48 0-3.719.782-3.719 2.346 0 .42.218.786.654 1.099.436.313.974.562 1.613.75.62.18 1.297.414 2.03.699z"
					/></svg
				>
			</button>
			<button
				on:click={() => editor.chain().focus().toggleCode().run()}
				disabled={!editor.can().chain().focus().toggleCode().run()}
				class={editor.isActive("code")
					? "editor-btn-selected"
					: "editor-btn-primary"}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					class="h-5 w-5 text-gray-900 dark:text-gray-50"
					><path fill="none" d="M0 0h24v24H0z" /><path
						fill="currentColor"
						d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"
					/></svg
				>
			</button>
			<button on:click={() => editor.chain().focus().unsetAllMarks().run()}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					class="h-5 w-5 text-gray-900 dark:text-gray-50"
					><path fill="none" d="M0 0h24v24H0z" /><path
						fill="currentColor"
						d="M12.651 14.065L11.605 20H9.574l1.35-7.661-7.41-7.41L4.93 3.515 20.485 19.07l-1.414 1.414-6.42-6.42zm-.878-6.535l.27-1.53h-1.8l-2-2H20v2h-5.927L13.5 9.257 11.773 7.53z"
					/></svg
				>
			</button>
			<button
				on:click={() => editor.chain().focus().setParagraph().run()}
				class={editor.isActive("paragraph")
					? "editor-btn-selected"
					: "editor-btn-primary"}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					class="h-5 w-5 text-gray-900 dark:text-gray-50"
					><path fill="none" d="M0 0h24v24H0z" /><path
						fill="currentColor"
						d="M12 6v15h-2v-5a6 6 0 1 1 0-12h10v2h-3v15h-2V6h-3zm-2 0a4 4 0 1 0 0 8V6z"
					/></svg
				>
			</button>
			<button
				on:click={() =>
					editor.chain().focus().toggleHeading({ level: 1 }).run()}
				class={editor.isActive("heading", { level: 1 })
					? "editor-btn-selected"
					: "editor-btn-primary"}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					class="h-5 w-5 text-gray-900 dark:text-gray-50"
					><path fill="none" d="M0 0H24V24H0z" /><path
						fill="currentColor"
						d="M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16zm8-12v12h-2v-9.796l-2 .536V8.67L19.5 8H21z"
					/></svg
				>
			</button>
			<button
				on:click={() =>
					editor.chain().focus().toggleHeading({ level: 2 }).run()}
				class={editor.isActive("heading", { level: 2 })
					? "editor-btn-selected"
					: "editor-btn-primary"}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					class="h-5 w-5 text-gray-900 dark:text-gray-50"
					><path fill="none" d="M0 0H24V24H0z" /><path
						fill="currentColor"
						d="M4 4v7h7V4h2v16h-2v-7H4v7H2V4h2zm14.5 4c2.071 0 3.75 1.679 3.75 3.75 0 .857-.288 1.648-.772 2.28l-.148.18L18.034 18H22v2h-7v-1.556l4.82-5.546c.268-.307.43-.709.43-1.148 0-.966-.784-1.75-1.75-1.75-.918 0-1.671.707-1.744 1.606l-.006.144h-2C14.75 9.679 16.429 8 18.5 8z"
					/></svg
				>
			</button>
			<button
				on:click={() =>
					editor.chain().focus().toggleHeading({ level: 3 }).run()}
				class={editor.isActive("heading", { level: 3 })
					? "editor-btn-selected"
					: "editor-btn-primary"}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					class="h-5 w-5 text-gray-900 dark:text-gray-50"
					><path fill="none" d="M0 0H24V24H0z" /><path
						fill="currentColor"
						d="M22 8l-.002 2-2.505 2.883c1.59.435 2.757 1.89 2.757 3.617 0 2.071-1.679 3.75-3.75 3.75-1.826 0-3.347-1.305-3.682-3.033l1.964-.382c.156.806.866 1.415 1.718 1.415.966 0 1.75-.784 1.75-1.75s-.784-1.75-1.75-1.75c-.286 0-.556.069-.794.19l-1.307-1.547L19.35 10H15V8h7zM4 4v7h7V4h2v16h-2v-7H4v7H2V4h2z"
					/></svg
				>
			</button>
			<button
				on:click={() =>
					editor.chain().focus().toggleHeading({ level: 4 }).run()}
				class={editor.isActive("heading", { level: 4 })
					? "editor-btn-selected"
					: "editor-btn-primary"}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					class="h-5 w-5 text-gray-900 dark:text-gray-50"
					><path fill="none" d="M0 0H24V24H0z" /><path
						fill="currentColor"
						d="M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16zm9-12v8h1.5v2H22v2h-2v-2h-5.5v-1.34l5-8.66H22zm-2 3.133L17.19 16H20v-4.867z"
					/></svg
				>
			</button>
			<button
				on:click={() => editor.chain().focus().toggleBulletList().run()}
				class={editor.isActive("bulletList")
					? "editor-btn-selected"
					: "editor-btn-primary"}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					class="h-5 w-5 text-gray-900 dark:text-gray-50"
					><path fill="none" d="M0 0h24v24H0z" /><path
						fill="currentColor"
						d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"
					/></svg
				>
			</button>
			<button
				on:click={() => editor.chain().focus().toggleOrderedList().run()}
				class={editor.isActive("orderedList")
					? "editor-btn-selected"
					: "editor-btn-primary"}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					class="h-5 w-5 text-gray-900 dark:text-gray-50"
					><path fill="none" d="M0 0h24v24H0z" /><path
						fill="currentColor"
						d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"
					/></svg
				>
			</button>
			<button on:click={() => dialog.showModal()} class="editor-btn-primary">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					class="h-5 w-5 text-gray-900 dark:text-gray-50"
					><path fill="none" d="M0 0h24v24H0z" /><path
						fill="currentColor"
						d="M21 15v3h3v2h-3v3h-2v-3h-3v-2h3v-3h2zm.008-12c.548 0 .992.445.992.993v9.349A5.99 5.99 0 0 0 20 13V5H4l.001 14 9.292-9.293a.999.999 0 0 1 1.32-.084l.093.085 3.546 3.55a6.003 6.003 0 0 0-3.91 7.743L2.992 21A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016zM8 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
					/></svg
				>
			</button>
			<button
				on:click={() => editor.chain().focus().toggleBlockquote().run()}
				class={editor.isActive("blockquote")
					? "editor-btn-selected"
					: "editor-btn-primary"}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					class="h-5 w-5 text-gray-900 dark:text-gray-50"
					><path fill="none" d="M0 0h24v24H0z" /><path
						fill="currentColor"
						d="M19.417 6.679C20.447 7.773 21 9 21 10.989c0 3.5-2.457 6.637-6.03 8.188l-.893-1.378c3.335-1.804 3.987-4.145 4.247-5.621-.537.278-1.24.375-1.929.311-1.804-.167-3.226-1.648-3.226-3.489a3.5 3.5 0 0 1 3.5-3.5c1.073 0 2.099.49 2.748 1.179zm-10 0C10.447 7.773 11 9 11 10.989c0 3.5-2.457 6.637-6.03 8.188l-.893-1.378c3.335-1.804 3.987-4.145 4.247-5.621-.537.278-1.24.375-1.929.311C4.591 12.322 3.17 10.841 3.17 9a3.5 3.5 0 0 1 3.5-3.5c1.073 0 2.099.49 2.748 1.179z"
					/></svg
				>
			</button>
			<button
				on:click={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().chain().focus().undo().run()}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					class="h-5 w-5 text-gray-900 dark:text-gray-50"
					><path fill="none" d="M0 0h24v24H0z" /><path
						fill="currentColor"
						d="M5.828 7l2.536 2.536L6.95 10.95 2 6l4.95-4.95 1.414 1.414L5.828 5H13a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H5.828z"
					/></svg
				>
			</button>
			<button
				on:click={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().chain().focus().redo().run()}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					class="h-5 w-5 text-gray-900 dark:text-gray-50"
					><path fill="none" d="M0 0h24v24H0z" /><path
						fill="currentColor"
						d="M18.172 7H11a6 6 0 1 0 0 12h9v2h-9a8 8 0 1 1 0-16h7.172l-2.536-2.536L17.05 1.05 22 6l-4.95 4.95-1.414-1.414L18.172 7z"
					/></svg
				>
			</button>
		</div>
	</div>
{/if}
<dialog
	id="urlDialog"
	class="h-screen w-full bg-gray-50 backdrop:bg-gray-50 dark:bg-gray-900 dark:backdrop:bg-gray-900 "
	bind:this={dialog}
	on:close={() => loadImage()}
>
	<form method="dialog">
		<p>
			<input
				class="container mx-auto border-none bg-gray-50 p-4 text-gray-900 focus:ring-gray-900 dark:bg-gray-700/50 dark:text-gray-50 focus:dark:bg-gray-700"
				type="url"
				placeholder="image url..."
				bind:value={imgurl}
			/>
		</p>
		<div class="container mt-2 flex justify-end space-x-2">
			<button
				class="bg-gray-50 px-4 py-2 transition-all delay-150 duration-1000 disabled:opacity-10 dark:bg-violet-600 dark:text-gray-900"
				value="cancel"
				on:click={() => (imgurl = null)}>Cancel</button
			>
			<button
				disabled={!imgurl}
				class="bg-gray-50 px-4 py-2 transition-all  delay-150 duration-1000 disabled:opacity-10 dark:text-gray-900"
				id="confirmBtn"
				value="default">Insert</button
			>
		</div>
	</form>
</dialog>
<article
	bind:this={element}
	class="mx-auto h-96 w-full overflow-x-hidden overflow-y-scroll bg-gray-50"
/>

