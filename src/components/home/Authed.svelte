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
      !
    </h1>
  </div>
</section>
<section class="min-h-[calc(100vh-300px)] py-6 sm:py-4">
  <div class="container mx-auto space-y-8 p-6">
    <div class="flex justify-center">
      {#each Object.keys(AREAS) as area}
        <button
          on:click={() => handleChangeTab(AREAS[area])}
          class="px-4 py-2 font-bold text-gray-900 ease-in {$cmsStore.selectedArea ===
          AREAS[area]
            ? ' border-b-4 border-gray-100 px-4 py-2 text-violet-600 transition-all delay-150 duration-1000 hover:border-violet-600 dark:border-gray-800 dark:bg-violet-600 dark:text-gray-50 hover:dark:border-gray-800 dark:hover:bg-violet-800 '
            : 'border-b-4 border-gray-100 transition-all delay-150 duration-1000 hover:border-violet-600 dark:border-gray-800 dark:text-gray-50 hover:dark:border-gray-800 dark:hover:bg-gray-900'}"
        >
          {AREAS[area]}
        </button>
      {/each}
    </div>

    {#if $sessionStore.session}
      <DocGallery />
    {/if}
  </div>
</section>
