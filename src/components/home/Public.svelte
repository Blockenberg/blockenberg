<script lang="ts">
	import { sessionStore } from "$src/stores";
	import Alert from "$components/icons/Alert.svelte";
</script>

<section class=" bg-white mt-10 text-gray-800">
	<div
		class="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl"
	>
		<h1 class="text-4xl font-bold leading-none sm:text-5xl">
			Welcome to BlockenBerg
			<span class="text-violet-600">headless and decentralized</span> CMS
		</h1>
		<p class="px-8 mt-8 mb-12 text-lg">
			We provide decentralized CMS for your website. All data stays yours, we
			provide just the tooling.
		</p>
		{#if $sessionStore.error === "Unsupported Browser"}
			<div class="p-4 bg-base-content text-neutral-50">
				<h3 class="flex items-center gap-2 text-base">
					<span class="-translate-y-[2px]"><Alert /></span>
					Unsupported device
				</h3>
				<p>
					It appears this device isn’t supported. Webnative requires IndexedDB
					in order to function. This browser doesn’t appear to implement this
					API. Are you in a Firefox private window?
				</p>
			</div>
		{:else}
			<div class="flex flex-wrap justify-center">
				<a
					href="/register"
					class="px-8 py-3 m-2 text-lg font-semibold  bg-violet-600 text-gray-50"
					>Create account</a
				>
				<a
					href="/recover"
					class="px-8 py-3 m-2 text-lg border  text-gray-900 border-gray-300"
					>Recover</a
				>
			</div>
		{/if}
	</div>
</section>
