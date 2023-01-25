<script lang="ts">
	import "../global.css";
	import { addNotification } from "$lib/notifications";
	import { appDescription, appImageURL, appName, appURL } from "$lib/app-info";
	import { sessionStore } from "../stores";
	import { errorToMessage } from "$lib/session";
	import { initialize } from "$lib/init";
	import FullScreenLoadingSpinner from "$components/common/FullScreenLoadingSpinner.svelte";
	import Header from "$components/Header.svelte";
	import Notifications from "$components/notifications/Notifications.svelte";
	import SidebarNav from "$components/nav/SidebarNav.svelte";
	import Footer from "$components/Footer.svelte";

	sessionStore.subscribe((session) => {
		if (session.error) {
			const message = errorToMessage(session.error);
			addNotification(message, "error");
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

<div class="dark:bg-gray-800 bg-gray-100 dark:text-gray-100">
	{#if $sessionStore.loading}
		<FullScreenLoadingSpinner />
	{:else}
		<div class="flex flex-col justify-between min-h-screen">
			<Header />
			<slot />
			<Footer />
		</div>
	{/if}
</div>
