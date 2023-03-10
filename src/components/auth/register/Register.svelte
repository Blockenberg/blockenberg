<script lang="ts">
  import { get as getStore } from 'svelte/store';

  import { sessionStore } from '$src/stores';
  import {
    createDID,
    prepareUsername,
    register,
    USERNAME_STORAGE_KEY
  } from '$lib/auth/account';
  import FilesystemActivity from '$components/common/FilesystemActivity.svelte';

  let username: string = '';
  let encodedUsername: string = '';
  let usernameValid = true;
  let usernameAvailable = true;
  let registrationSuccess = true;
  let checkingUsername = false;
  let organization = false;

  let initializingFilesystem = false;

  const checkUsername = async (event: Event) => {
    const { value } = event.target as HTMLInputElement;
    const {
      program: {
        components: { crypto, storage }
      }
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

    registrationSuccess = await register(encodedUsername, organization);

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
  <section>
    <div
      class="container mx-auto my-4 grid gap-6 text-center lg:grid-cols-2 xl:grid-cols-5"
    >
      <div
        class="w-full rounded bg-stone-50 px-6 py-16 dark:bg-stone-900 sm:px-12 md:px-16 xl:col-span-2"
      >
        <span class="mb-2 block uppercase dark:text-violet-50">
          Blockenberg content management system
        </span>
        <h1 class="py-4 text-5xl font-bold text-stone-900 dark:text-stone-50">
          Register with Blockenberg
        </h1>
        {#if !registrationSuccess}
          <p class="my-8">
            <span class="font-bold text-red-900">Failed.</span>
            There was an issue registering your account. Please try again.
          </p>
        {:else}
          <p class="my-8">
            <span class="font-bold text-stone-900 dark:text-stone-50">
              Easy and secure.
            </span>
            Your account is stored on this device and later you will be able to create
            a backup device like mobile phone. Please do not use public or shared
            computer.
          </p>
        {/if}
        <div
          class="mx-auto flex max-w-sm flex-wrap justify-center space-x-4 p-4 text-center"
        >
          <div>
            <input
              type="radio"
              on:click={() => {
                organization = !organization;
              }}
              class="checked:bg-violet-600 focus:bg-violet-600 checked:focus:bg-violet-600 checked:active:bg-violet-600"
              id="personal"
              name="accounttype"
              checked
            />
            <label for="personal">Personal</label>
          </div>

          <div>
            <input
              type="radio"
              on:click={() => {
                organization = !organization;
              }}
              class="checked:bg-violet-600 focus:bg-violet-600 checked:focus:bg-violet-600 checked:active:bg-violet-600"
              name="accounttype"
              id="org"
            />
            <label for="org">Organization</label>
          </div>
        </div>

        <form
          on:submit={registerUser}
          class="flex flex-col space-y-3 self-stretch lg:space-y-6"
        >
          <div>
            <label for="name" class="sr-only text-sm">Your name</label>
            <input
              id="registration"
              type="text"
              placeholder={organization ? 'Organization name' : 'Your name'}
              class="w-full rounded-md border-2 border-stone-50 bg-stone-50 text-stone-900 focus:ring focus:ring-violet-600 {usernameApproved &&
                'ring-green-400'} {usernameError && 'ring-red-400'}"
              class:input-error={username.length !== 0 &&
                (!usernameValid || !usernameAvailable)}
              on:input={checkUsername}
            />
          </div>
          <div class="flex space-x-4">
            <button
              disabled={username.length === 0 ||
                !usernameValid ||
                !usernameAvailable ||
                checkingUsername}
              type="submit"
              class="w-full justify-center rounded border-2 border-violet-600  bg-violet-600 px-4 py-2 text-lg font-semibold text-white transition-all delay-150 duration-1000 hover:bg-violet-700 focus:outline-none disabled:opacity-5  dark:bg-violet-600 dark:text-violet-50 dark:hover:bg-violet-800  md:w-40"
            >
              Register
            </button>
            <button
              type="button"
              on:click={toggleExistingAccount}
              class="flex w-full items-center justify-center rounded border-2 border-violet-600 px-4 py-2 text-lg font-semibold text-violet-600 transition-all delay-150 duration-1000 hover:border-violet-600 hover:bg-violet-100 focus:outline-none  disabled:opacity-5  dark:bg-stone-900 dark:text-violet-50 dark:hover:bg-violet-900"
            >
              I have an account
            </button>
          </div>
          <div class="flex space-x-2">
            {#if existingAccount}
              <div class="flex flex-col gap-4 py-6 text-left ">
                <p class="font-bold">Which device are you connected on?</p>
                <p>To connect your existing account, you'll need to:</p>
                <ol class="list-decimal pl-6">
                  <li>Find a device the account is already connected on</li>
                  <li>Navigate to your Account Settings</li>
                  <li>Click "Connect a new device"</li>
                </ol>
                <span>
                  Alternatively <a href="/recover" class="underline">
                    recover an account
                  </a>
                </span>
              </div>
            {/if}
          </div>
        </form>
      </div>
      <img
        src="https://images.unsplash.com/photo-1514412076816-d228b5c0973c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        alt="birds"
        class="w-full rounded bg-stone-500 object-cover xl:col-span-3"
      />
    </div>
  </section>
{/if}
