<script lang="ts">
	import { sessionStore } from "$src/stores";
</script>

<div class="space-y-8 p-6">
	<main>
		<div class="container mx-auto space-y-16">
			<section class="grid gap-6 text-center lg:grid-cols-2 xl:grid-cols-5">
				<div
					class="w-full bg-gray-50 p-6 dark:bg-gray-900 sm:p-16 xl:col-span-2"
				>
					<span class="mb-2 block dark:text-violet-600"
						>Blockenberg content management system</span
					>
					<h1 class="text-5xl font-bold dark:text-gray-50">
						Publish with Blockenberg
					</h1>
					<p class="my-8">
						<span class="font-medium dark:text-gray-50"
							>Headless and decentralized.</span
						>The ultimate CMS for censorship resistant, decentralized world.
					</p>
					<form
						class="ng-untouched ng-pristine ng-valid space-y-3 self-stretch"
					>
						{#if $sessionStore.error === "Unsupported Browser"}
							<div class="bg-base-content p-4 text-gray-50">
								<p class="flex items-center gap-2 text-base">
									Unsupported device
								</p>
								<p>
									It appears this device isn’t supported. Webnative requires
									IndexedDB in order to function. This browser doesn’t appear to
									implement this API. Are you in a Firefox private window?
								</p>
							</div>
						{:else}
							<div class="flex flex-wrap justify-center">
								<a
									href="/register"
									class="m-2 bg-violet-600 px-8 py-3  text-lg text-gray-50 hover:bg-violet-500"
									>Register</a
								>
								<a
									href="/recover"
									class="m-2 border border-gray-300 px-8 py-3  text-lg text-gray-900 hover:bg-violet-100 dark:text-gray-50"
									>Recover</a
								>
							</div>
						{/if}
					</form>
				</div>
				<img
					src="https://images.unsplash.com/photo-1523115191856-c203e76215a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=480&q=80"
					alt="freedom"
					class="h-40 w-full bg-gray-50 object-cover dark:bg-gray-500 md:h-[500px] xl:col-span-3"
				/>
			</section>
			<section>
				<span
					class="mb-2 block text-xs font-medium uppercase tracking-widest dark:text-violet-600 lg:text-center"
					>How it works</span
				>
				<h2 class="text-5xl font-bold dark:text-gray-50 lg:text-center">
					Building with Blockenberg is simple
				</h2>
				<div class="my-16 grid gap-6 lg:grid-cols-3">
					<div class="flex flex-col space-y-4 bg-gray-50 p-8 dark:bg-gray-900">
						<div
							class="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-violet-600 text-xl font-bold text-gray-100 dark:bg-violet-600 dark:text-gray-900"
						>
							1
						</div>
						<p class="text-2xl ">
							<b>Your data.</b>Blockenberg publish your data to your
							decentralized account.
						</p>
					</div>
					<div class="flex flex-col space-y-4 bg-gray-50 p-8 dark:bg-gray-900">
						<div
							class="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-violet-600 text-xl font-bold text-gray-100 dark:bg-violet-600 dark:text-gray-900"
						>
							2
						</div>
						<p class="text-2xl ">
							<b>Easy to use.</b>Your content creators don't need to understand
							blockchain, nor the world of development.
						</p>
					</div>
					<div class="flex flex-col space-y-4 bg-gray-50 p-8 dark:bg-gray-900">
						<div
							class="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-violet-600 text-xl font-bold text-gray-100 dark:bg-violet-600 dark:text-gray-900"
						>
							3
						</div>
						<p class="text-2xl ">
							<b>Deploy anywhere.</b>Build your app, use your favorite
							framework, deploy on your favorite service.
						</p>
					</div>
				</div>
			</section>
			<section class="grid gap-6 lg:grid-cols-2">
				<img
					src="https://images.unsplash.com/reserve/rV1ymXsoQRCKUBVL2fGK_forsplash.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
					alt=""
					class="max-h-96 w-full bg-gray-50 object-cover dark:bg-gray-500"
				/>
				<div
					class="flex w-full flex-col items-center space-y-8 p-6 dark:bg-gray-900 lg:h-full lg:p-8 "
				>
					<img
						src="https://upload.wikimedia.org/wikipedia/en/7/72/Mark_Wing-Davey_as_Zaphod_Beeblebrox.jpg"
						alt=""
						class="h-20 w-20 bg-violet-600 object-cover text-gray-100 dark:bg-gray-500"
					/>
					<blockquote class="max-w-lg text-center text-lg font-medium italic">
						"Future of CMS!"
					</blockquote>
					<div class="text-center dark:text-gray-400">
						<p>Zaphod Beeblebrox</p>
						<p>President</p>
					</div>
				</div>
				<div class="space-y-8 p-8 dark:bg-gray-900 lg:col-span-full lg:py-12">
					<h2 class="text-5xl font-bold dark:text-gray-50">Create with us</h2>
					<p class="dark:text-gray-400">
						We provide the content creation interface. If you are familiar with
						WordPress, we are the "admin". In order to display your page, you
						need an application - this is the "headless" principle. You can
						bootstrap the development with sample application (coming soon) or
						build your own. In this approach, we are similar to Contently or
						Hygraph.
					</p>
					<p>
						Another difference between Blockenberg and WordPress is that instead
						of the database we use the blockchain technology. All your data are
						bound to the account you created and published on the distributed
						network. We don't control and can't influence what you are
						publishing in any means. Birds around are symbol of freedom - we
						(and Lincoln) belive that those who deny freedom to others deserve
						it not for themselves.
					</p>
				</div>
			</section>
			<section>
				<div class="grid gap-6 lg:grid-cols-3">
					<div class="overflow-hidden lg:col-span-3 lg:flex">
						<img
							src="https://images.unsplash.com/photo-1517061391662-b09454c10462?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2133&q=80"
							alt=""
							class="h-auto max-h-96 w-full bg-gray-50 object-cover dark:bg-gray-500"
						/>
						<div
							class="space-y-6 bg-gray-50 p-6 dark:bg-gray-900 md:flex md:flex-col lg:p-8"
						>
							<span
								class="self-start bg-violet-600 px-3 py-1 text-sm text-gray-100 dark:bg-violet-600 dark:text-gray-900"
								>Technology</span
							>
							<h2 class="text-3xl font-bold md:flex-1">
								Creating a censorship resistant website.
							</h2>
							<div>
								<p class="dark:text-gray-400">January 22, 2023</p>
								<p class="dark:text-gray-400">By Adam Sobotka</p>
							</div>
						</div>
					</div>
					<div class="bg-gray-50 p-6 dark:bg-gray-900 lg:p-8 lg:py-12">
						<a
							href="https://fission.codes/"
							class="inline font-medium text-violet-600 dark:text-gray-50"
						>
							Fission.
						</a>
						<p class="inline">Built on Fission Webnative platform.</p>
					</div>
					<div class="bg-gray-50 p-6 dark:bg-gray-900 lg:p-8 lg:py-12">
						<a
							href="https://filecoin.io/"
							class="inline font-medium text-violet-600 dark:text-gray-50"
						>
							Filecoin.
						</a>
						<p class="inline">Using Filecoin decentralized storage.</p>
					</div>
					<div class="bg-gray-50 p-6 dark:bg-gray-900 lg:p-8 lg:py-12">
						<a
							href="https://ucan.xyz/"
							class="inline font-medium text-violet-600 dark:text-gray-50"
						>
							Ucan.
						</a>
						<p class="inline">Utilizing Ucan authentication.</p>
					</div>
				</div>
			</section>
			<section>
				<div class="container mx-auto p-6 py-20 dark:bg-gray-900 lg:px-8">
					<h2 class="text-center text-5xl font-bold">
						Our team is here to help you.
					</h2>
					<div class="flex justify-center p-4">
						<a rel="noopener noreferrer" href="mailto:adamsobotka@duck.com"
							>Meet our crew &gt;</a
						>
					</div>
					<img
						src="https://images.unsplash.com/photo-1500405079076-d1d5a841e112?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2196&q=80"
						alt=""
						class="mt-8 h-auto max-h-96 w-full rounded object-cover dark:bg-gray-500"
					/>
				</div>
			</section>
		</div>
	</main>
</div>
