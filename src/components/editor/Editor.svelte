<script lang="ts">
  import { goto } from '$app/navigation';
  import {
    uploadImageToWNFS,
    uploadDocumentToWNFS,
    deleteDocFromWNFS
  } from '$routes/cms/lib/cms';
  import { sessionStore } from '$src/stores';
  import type { ContentDoc } from '$routes/cms/lib/cms';
  import ImagePicker from '$routes/cms/components/imageGallery/ImagePicker.svelte';
  import TipTap from './TipTap.svelte';
  import { tick } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import sanitizeHtml from 'sanitize-html';
  import placeholder from '$lib/assets/placeholder.svg';

  // Handle files uploaded directly through the file input
  let files: FileList;
  let preview;
  export let currenttags;
  $: tags = currenttags || [];
  export let imageContent = { name: '', cid: '', src: '' };
  export let contentHeader: string, contentText: string, CID: string;
  $: showheader = !contentHeader || !contentText;
  //console.log(contentText);
  let galleryModal: boolean = false;

  $: if (files) {
    uploadImg(files[0]);
  }

  async function uploadImg(file: File) {
    const uploadres = await uploadImageToWNFS(file);
    //console.log(file);
    imageContent = uploadres;
    galleryModal = false;
  }

  async function uploadDoc(publish: boolean) {
    $sessionStore.loading = true;
    const doc: ContentDoc = {
      image: JSON.stringify({ name: imageContent.name, cid: imageContent.cid }),
      CID: CID,
      header: contentHeader,
      tags,
      content: sanitizeHtml(contentText),
      private: !publish,
      updated: Date.now(),
      author: $sessionStore.username.trimmed[0]
    };
    await uploadDocumentToWNFS(doc, publish);
    $sessionStore.loading = false;
    goto('/');
  }

  function getBase64(image: Blob) {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = e => {
      preview = e.target.result;
    };
  }

  async function handleKeydown(event) {
    if (event.key !== 'Tab') return;
    event.preventDefault();
    const { value } = this;
    tags.push(value);
    //console.log(tags);
    await tick();
    this.value = '';
    tags = tags;
  }
</script>

<section
  class="container mx-auto flex flex-col items-start justify-start space-y-2 lg:max-w-5xl"
>
  {#if showheader}
    <div
      in:fade
      out:fly={{ y: -200, duration: 500 }}
      class="container flex flex-col items-end justify-end py-4"
    >
      {#if preview || imageContent.src}
        <img
          alt="header"
          class=" mb-2 h-60 w-full rounded object-cover object-top"
          src={preview || imageContent?.src}
        />
      {:else}
        <img
          alt="header"
          class="object-fit mb-2 h-60 w-full opacity-10"
          src={placeholder}
        />
      {/if}
      <div class="flex space-x-2">
        {#if galleryModal}
          <label
            for="upload-file"
            class="flex cursor-pointer flex-col items-center justify-center object-cover"
          >
            <span
              class="flex w-full items-center justify-center rounded border-2 border-violet-600 px-4 py-2 text-lg font-semibold text-violet-600 transition-all delay-150 duration-1000 hover:border-violet-600 hover:bg-violet-100 focus:outline-none  dark:bg-stone-800  dark:text-violet-50 dark:hover:bg-violet-900  md:w-40"
            >
              <svg
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

              Upload
            </span>
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
          class="w-full justify-center rounded border-2 border-violet-600  bg-violet-600 px-4 py-2 text-lg font-semibold text-white transition-all delay-150 duration-1000 hover:bg-violet-700 focus:outline-none dark:bg-violet-600  dark:text-violet-50 dark:hover:bg-violet-800  md:w-40"
          on:click={() =>
            galleryModal ? (galleryModal = false) : (galleryModal = true)}
        >
          <span>Cover Photo</span>
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
      in:fade
      out:fly={{ y: -200, duration: 500 }}
      type="text"
      bind:value={contentHeader}
      class="container mx-auto rounded border-none bg-stone-50 p-4 text-3xl text-stone-900 focus:ring-stone-900 dark:bg-stone-700/50 dark:text-stone-50 focus:dark:bg-stone-900"
      placeholder="Header"
      tabindex={0}
    />
    <div class="grid w-full grid-cols-2 gap-4">
      <input
        type="text"
        on:keydown={handleKeydown}
        class="container mx-auto rounded border-none bg-stone-50 p-4 text-stone-900 focus:ring-stone-900 dark:bg-stone-700/50 dark:text-stone-50 focus:dark:bg-stone-900"
        placeholder="tags - use Tab to add"
        tabindex={1}
      />
      <div class="flex space-x-2">
        {#if tags.length > 0}
          {#each tags as tag, i}
            <button
              on:click={() => {
                tags = [];
              }}
              class="self-start rounded px-3 py-1 text-sm dark:bg-violet-600 dark:text-stone-50"
            >
              {tag}
            </button>
          {/each}
        {:else}
          <a href="/about#tags" class="flex self-start px-3 py-1 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="mr-2 h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                clip-rule="evenodd"
              />
            </svg>
            Using default tag "blog".
          </a>
        {/if}
      </div>
    </div>
  {:else}
    <div class="flex w-full items-end justify-end pt-4">
      <button on:click={() => (showheader = true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="h-6 w-6"
        >
          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
          <path
            fill-rule="evenodd"
            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  {/if}
  <div class="w-full transition-all delay-150 duration-1000">
    <TipTap bind:editorcontent={contentText} />
  </div>
  <div class="container flex justify-between font-bold">
    <div>
      <button
        on:click={() => uploadDoc(false)}
        disabled={!contentHeader || !contentText}
        class="w-full justify-center rounded border-2 border-violet-600 px-4 py-2 text-xl font-semibold text-violet-600 transition-all delay-150 duration-1000 hover:border-violet-600 hover:bg-violet-100 focus:outline-none  dark:bg-stone-800  dark:text-violet-50 dark:hover:bg-violet-900  md:w-40"
      >
        Save
      </button>
      <button
        on:click={() => uploadDoc(true)}
        disabled={!contentHeader || !contentText}
        class="w-full justify-center rounded border-2 border-violet-600  bg-violet-600 px-4 py-2 text-xl font-semibold text-white transition-all delay-150 duration-1000 hover:bg-violet-700 focus:outline-none dark:bg-violet-600  dark:text-violet-50 dark:hover:bg-violet-800  md:w-40"
      >
        Publish
      </button>
    </div>
    <button
      on:click={() => {
        deleteDocFromWNFS(CID);
        goto('/');
      }}
      disabled={!contentHeader || !contentText}
      class="w-full justify-center rounded border-2 border-violet-600 px-4 py-2 text-xl font-semibold text-violet-600 transition-all delay-150 duration-1000 hover:border-violet-600 hover:bg-violet-100 focus:outline-none  dark:bg-stone-800  dark:text-violet-50 dark:hover:bg-violet-900  md:w-40"
    >
      Delete
    </button>
  </div>
</section>
