<script lang="ts">
  import '../global.css';
  import { addNotification } from '$lib/notifications';
  import { appDescription, appImageURL, appName, appURL } from '$lib/app-info';
  import { sessionStore } from '../stores';
  import { errorToMessage } from '$lib/session';
  import { initialize } from '$lib/init';
  import FullScreenLoadingSpinner from '$components/common/FullScreenLoadingSpinner.svelte';
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
  import { browser } from '$app/environment';
  import Analytics from '$components/common/Analytics.svelte';

  if (browser) {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  sessionStore.subscribe(session => {
    if (session.error) {
      const message = errorToMessage(session.error);
      addNotification(message, 'error');
    }
  });

  const init = async () => {
    await initialize();
  };

  init();
</script>

<svelte:head>
  <title>{appName}</title>

  <meta name="description" content={appDescription} />
  <meta property="og:title" content={appName} />
  <meta property="og:description" content={appDescription} />
  <meta property="og:url" content={appURL} />
  <meta property="og:image" content={appImageURL} />
  <meta name="twitter:title" content={appName} />
  <meta name="twitter:description" content={appDescription} />
  <meta name="twitter:image" content={appImageURL} />
  <meta name="twitter:image:alt" content={appName} />
</svelte:head>

<div class="bg-stone-100 dark:bg-stone-800 dark:text-stone-100">
  {#if $sessionStore.loading}
    <FullScreenLoadingSpinner />
  {:else}
    <Analytics />
    <div class="flex min-h-screen flex-col justify-between md:p-2">
      <Header />
      <slot />
      <Footer />
    </div>
  {/if}
</div>
