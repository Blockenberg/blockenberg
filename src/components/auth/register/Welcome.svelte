<script lang="ts">
	import { sessionStore } from "../../../stores";
</script>

<section class="p-6 min-h-[calc(100vh-128px)] ">
	<div
		class="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-5"
	>
		<div
			class="w-full px-6 py-16  sm:px-12 md:px-16 xl:col-span-2 bg-gray-50 dark:bg-gray-900"
		>
			<span class="block mb-2 text-violet-600">Blockenberg</span>
			<h1 class="text-5xl font-bold text-gray-900 dark:text-gray-50">
				Welcome, {$sessionStore.username.trimmed}!
			</h1>
			<p class="my-8">
				<span class="font-bold text-gray-900 dark:text-gray-50"
					>Your account is ready.</span
				> You don't need any password, your identity is now secured on this computer.
			</p>
			<a
				class="px-8 py-3 mt-12  bg-violet-600 text-gray-50 hover:bg-violet-500"
				href="/delegate-account">Continue</a
			>
		</div>
		<img
			src="https://images.unsplash.com/photo-1465420513954-e331ffa275ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
			alt=""
			class="object-cover w-full  xl:col-span-3 bg-gray-500"
		/>
	</div>
</section>
