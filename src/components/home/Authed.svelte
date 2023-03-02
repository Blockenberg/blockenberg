<script lang="ts">
  import { sessionStore } from '../../stores';
  import { onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { AREAS, cmsStore } from '$routes/cms/stores';
  import DocGallery from '$routes/cms/components/docGallery/DocGallery.svelte';

  /**
   * Tab between the public/private areas and load associated images
   * @param area
   */
  const handleChangeTab: (area: AREAS) => void = area =>
    cmsStore.update(store => ({
      ...store,
      selectedArea: area
    }));

  // If the user is not authed redirect them to the home page
  const unsubscribe = sessionStore.subscribe(newState => {
    if (!newState.loading && !newState.session) {
      goto('/');
    }
  });

  onDestroy(unsubscribe);
</script>

<section>
  <div
    class="container mx-auto flex flex-col items-center px-4 py-8 text-center md:py-12 md:px-10 lg:px-32 xl:max-w-3xl"
  >
    <h1 class="text-4xl font-bold leading-none sm:text-5xl">
      Welcome
      <span class="dark:text-violet-600">{$sessionStore.username.trimmed}</span>
    </h1>
  </div>
</section>
<section class="min-h-[calc(100vh-300px)] py-6 sm:py-4">
  <div class="container mx-auto space-y-8 p-6">
    <div class="flex space-x-4 lg:space-x-8 justify-center">
      {#each Object.keys(AREAS) as area}
        <button
          on:click={() => handleChangeTab(AREAS[area])}
          class="ease-in {$cmsStore.selectedArea ===
          AREAS[area]
            ? 'w-full justify-center rounded border-2 border-violet-600  bg-violet-600 px-4 py-2 text-xl font-semibold text-white transition-all delay-150 duration-1000 hover:bg-violet-700 focus:outline-none dark:bg-violet-600  dark:text-violet-50 dark:hover:bg-violet-800  md:w-40'
            : 'w-full justify-center rounded border-2 border-violet-600 px-4 py-2 text-xl font-semibold text-violet-600 transition-all delay-150 duration-1000 hover:border-violet-600 hover:bg-violet-100 focus:outline-none  dark:bg-stone-800  dark:text-violet-50 dark:hover:bg-violet-900  md:w-40'}"
        >
          {AREAS[area] === AREAS.PRIVATE ? 'Saved' : 'Published'}
        </button>
      {/each}
    </div>

    {#if $sessionStore.session}
      <DocGallery />
    {/if}
  </div>
</section>
