<script lang="ts">
  import { onDestroy } from 'svelte';
  import { filesystemStore, sessionStore } from '$src/stores';
  import { AREAS, cmsStore } from '$routes/cms/stores';
  import { getDocsFromWNFS } from '$routes/cms/lib/cms';

  // If cmsStore.selectedArea changes from private to public, re-run getDocsFromWNFS
  let selectedArea = null;
  const unsubscribecmsStore = cmsStore.subscribe(async updatedStore => {
    // Get initial selectedArea
    if (!selectedArea) {
      selectedArea = updatedStore.selectedArea;
    }

    if (selectedArea !== updatedStore.selectedArea) {
      selectedArea = updatedStore.selectedArea;
      await getDocsFromWNFS();
    }
  });

  // Once the user has been authed, fetch the docs from their file system
  let docsFetched = false;
  const unsubscribeSessionStore = sessionStore.subscribe(newState => {
    if (newState.session && $filesystemStore && !docsFetched) {
      docsFetched = true;
      getDocsFromWNFS();
    }
  });
  onDestroy(() => {
    unsubscribecmsStore();
    unsubscribeSessionStore();
  });
</script>

  <div
    class="container mx-auto grid grid-cols-1 justify-center gap-6 md:p-6 md:py-20 text-center dark:bg-stone-800 sm:grid-cols-2 lg:grid-cols-4 lg:px-8"
  >
    {#each $cmsStore.selectedArea === AREAS.PRIVATE ? $cmsStore.privateDocuments : $cmsStore.publicDocuments as doc}
      <a
        href="/edit/{encodeURI(doc.name)}"
        class="group mx-auto w-full bg-stone-50 hover:bg-violet-50 dark:bg-stone-900 rounded-md border-2  border-stone-50/5 hover:border-violet-600/50 transition-all delay-150 duration-1000"
      >
        {#if doc.src}
          <img
            role="presentation"
            class="h-44 w-full object-cover dark:bg-stone-500 rounded-t-md"
            alt="Cover image for {decodeURI(doc.header)}"
            src={doc.src}
          />
        {/if}
        <div class="space-y-2 p-6">
          <h3
            class="text-3xl font-semibold group-focus:underline"
          >
            {decodeURI(doc.header)}
          </h3>
          <span class="text-xs dark:text-stone-400">
            {new Date(doc.ctime).toLocaleDateString('en-GB', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
          <p class="h-60 overflow-clip text-ellipsis ">
            {@html doc.content}
          </p>
        </div>
      </a>
    {/each}
  </div>
  <section>
    <div
      class="container mx-auto p-6 py-20 text-center dark:bg-stone-900 lg:px-8 hidden"
    >
      <div>
        <a
          class="border-b-2 border-transparent font-bold transition-all delay-150 duration-1000 hover:border-b-violet-600"
          href="/create"
        >
          * Create
        </a>
      </div>
      <p class="mt-6">
        “A person who wrote badly did better than a person who does not write at
        all. A bad writing can be corrected. An empty page remains an empty
        page.”
      </p>
      <div class="flex justify-center p-4">Israelmore Ayivor</div>
      <img
        src="https://images.unsplash.com/photo-1580011737349-fb60e771d7dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        alt=""
        class="mt-8 h-auto max-h-96 w-full object-[center_30%] object-cover dark:bg-stone-500"
      />
    </div>
  </section>
