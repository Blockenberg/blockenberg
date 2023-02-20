<script lang="ts">
	import { goto } from "$app/navigation";
	import { sessionStore } from "$src/stores";
	import AvatarUpload from "$components/settings/AvatarUpload.svelte";
	import ConnectedDevices from "$components/settings/ConnectedDevices.svelte";
	import RecoveryKit from "$components/settings/RecoveryKit.svelte";
	import Username from "$components/settings/Username.svelte";
	import HookSettings from "$components/settings/HookSettings.svelte";
</script>

{#if $sessionStore.session}
	<section>
		<div class="container mx-auto flex flex-col px-5 py-24">
			<div class="mx-auto lg:w-4/6">
				<div class="mt-10 flex flex-col sm:flex-row">
					<div class="text-center sm:w-1/3 sm:py-8 sm:pr-8">
						<div
							class="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-800 text-gray-600"
						>
							<AvatarUpload />
						</div>
						<Username />
					</div>
					<div
						class="mt-4 border-t border-gray-800 pt-4 text-center sm:mt-0 sm:w-2/3 sm:border-l sm:border-t-0 sm:py-8 sm:pl-8 sm:text-left"
					>
						<div class="flex flex-col space-y-8">
							<ConnectedDevices />

							<RecoveryKit />
							<HookSettings />
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
{:else}
	{goto("/")}
{/if}
