<script lang="ts">
	import { get as getStore } from "svelte/store";

	import { sessionStore } from "$src/stores";
	import {
		createDID,
		prepareUsername,
		register,
		USERNAME_STORAGE_KEY,
	} from "$lib/auth/account";
	import FilesystemActivity from "$components/common/FilesystemActivity.svelte";

	let username: string = "";
	let encodedUsername: string = "";
	let usernameValid = true;
	let usernameAvailable = true;
	let registrationSuccess = true;
	let checkingUsername = false;

	let initializingFilesystem = false;

	const checkUsername = async (event: Event) => {
		const { value } = event.target as HTMLInputElement;
		const {
			program: {
				components: { crypto, storage },
			},
		} = getStore(sessionStore);

		username = value;
		checkingUsername = true;

		/**
		 * Create a new DID for the user, which will be appended to their username, concatenated
		 * via a `#`, hashed and encoded to ensure uniqueness
		 */
		const did = await createDID(crypto);
		const fullUsername = `${value}#${did}`;
		await storage.setItem(USERNAME_STORAGE_KEY, fullUsername);

		encodedUsername = await prepareUsername(fullUsername);

		checkingUsername = false;
	};

	const registerUser = async (event: Event) => {
		event.preventDefault();

		if (checkingUsername) {
			return;
		}

		initializingFilesystem = true;

		registrationSuccess = await register(encodedUsername);

		if (!registrationSuccess) initializingFilesystem = false;
	};

	$: usernameApproved =
		username.length > 0 &&
		!checkingUsername &&
		usernameValid &&
		usernameAvailable;
	$: usernameError =
		username.length > 0 &&
		!checkingUsername &&
		(!usernameValid || !usernameAvailable);

	let existingAccount = false;
	const toggleExistingAccount = () => (existingAccount = !existingAccount);
</script>

{#if initializingFilesystem}
	<FilesystemActivity activity="Initializing" />
{:else}
	<section class="p-6 min-h-[calc(100vh-128px)]">
		<div
			class="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-5"
		>
			<div class="w-full px-6 py-16 sm:px-12 md:px-16 xl:col-span-2 bg-gray-50">
				<span class="block mb-2 text-violet-600"
					>Blockenberg content management system</span
				>
				<h1 class="text-5xl font-bold text-gray-900">
					Register with Blockenberg
				</h1>
				{#if !registrationSuccess}
					<p class="my-8">
						<span class="font-bold text-red-900">Failed.</span> There was an issue
						registering your account. Please try again.
					</p>
				{:else}
					<p class="my-8">
						<span class="font-bold text-gray-900">Easy and secure.</span> Your account
						is stored on this device and later you will be able to create a backup
						device like mobile phone. Please do not use public or shared computer.
					</p>
				{/if}
				<form
					on:submit={registerUser}
					class="self-stretch space-y-3 ng-untouched ng-pristine ng-valid"
				>
					<div>
						<label for="name" class="text-sm sr-only">Your name</label>
						<input
							id="registration"
							type="text"
							placeholder="Your name"
							class="w-full focus:ring focus:ring-violet-600 {usernameApproved &&
								'ring-green-400'} {usernameError && 'ring-red-400'}"
							class:input-error={username.length !== 0 &&
								(!usernameValid || !usernameAvailable)}
							on:input={checkUsername}
						/>
					</div>
					<div class="flex space-x-2">
						<button
							disabled={username.length === 0 ||
								!usernameValid ||
								!usernameAvailable ||
								checkingUsername}
							type="submit"
							class="w-full py-2 font-bold bg-violet-600 hover:bg-violet-500 text-gray-50 disabled:opacity-10 transition-all delay-150 duration-1000"
							>Register</button
						>
						<button
							type="button"
							on:click={toggleExistingAccount}
							class="w-full py-2 font-bold bg-gray-50 text-gray-800 hover:bg-violet-100"
							>I have an account</button
						>
					</div>
					<div class="flex space-x-2">
						{#if existingAccount}
							<div class="flex flex-col text-left gap-4 py-6 ">
								<p class="font-bold">
									Which device are you connected on?
								</p>
								<p>To connect your existing account, you'll need to:</p>
								<ol class="pl-6 list-decimal">
									<li>Find a device the account is already connected on</li>
									<li>Navigate to your Account Settings</li>
									<li>Click "Connect a new device"</li>
								</ol>
                <span>Alternatively <a href="/recover" class="underline">recover an account</a></span>
                
							</div>
						{/if}
					</div>
				</form>
			</div>
			<img
				src="https://images.unsplash.com/photo-1514412076816-d228b5c0973c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
				alt=""
				class="object-cover w-full xl:col-span-3 bg-gray-500"
			/>
		</div>
	</section>
{/if}
