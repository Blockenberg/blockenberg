<script lang="ts">
  import { goto } from '$app/navigation';
  import clipboardCopy from 'clipboard-copy';

  import { filesystemStore, sessionStore } from '../../../stores';
  import Share from '$components/icons/Share.svelte';
  import { addNotification } from '$lib/notifications';
  import { setBackupStatus } from '$lib/auth/backup';

  const skipBackup = () => {
    setBackupStatus($filesystemStore, { created: false });

    sessionStore.update(session => ({
      ...session,
      backupCreated: false
    }));

    goto('/');
  };

  export let qrcode: HTMLOrSVGElement;
  export let connectionLink: string;
  let displayQR = false;
  let copytext = 'Share link';

  const copyLink = async () => {
    await clipboardCopy(connectionLink);
    addNotification('Copied to clipboard', 'success');
    copytext = '✓ Copied';
  };
</script>

<section class="p-6 ">
  <div
    class="container mx-auto grid gap-6 text-center lg:grid-cols-2 xl:grid-cols-5"
  >
    <div
      class="w-full rounded bg-stone-50  px-6 py-16 dark:bg-stone-900 sm:px-12 md:px-16 xl:col-span-2"
    >
      <h1 class="text-5xl font-bold text-stone-900 dark:text-stone-50">
        Stay safe
      </h1>
      {#if $sessionStore.organization}
        {#if displayQR}
          <div class="mt-8 flex w-full justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="256"
              height="256"
              class="rounded"
            >
              {@html qrcode}
            </svg>
          </div>
        {/if}

        <p class="mt-4">
          <span class="font-bold text-stone-900 dark:text-stone-50">
            Thank you for choosing Blockenberg.
          </span>
          You can now invite your teammates to collaborate on your project. To do
          this, simply copy the link by clicking on the button below and send it
          to them via any messenger or email. Please note that you will need to remain
          on this page to confirm the security number they see on their screen. As
          an alternative, you can use the
          <a
            href={null}
            class="cursor-pointer font-bold underline"
            on:click={() => (displayQR = true)}
          >
            QR Code
          </a>
          and utilize your mobile phone as a backup device.
        </p>
        <div class="mt-6 flex justify-center space-x-2">
          <button
            class="w-full justify-center rounded border-2 border-violet-600  bg-violet-600 px-4 py-2 text-lg font-semibold text-white transition-all delay-150 duration-1000 hover:bg-violet-700 focus:outline-none dark:bg-violet-600  dark:text-violet-50 dark:hover:bg-violet-800  md:w-40"
            on:click={copyLink}
          >
            {copytext}
          </button>
          <button
            class="flex w-full items-center justify-center rounded border-2 border-violet-600 px-4 py-2 text-lg font-semibold text-violet-600 transition-all delay-150 duration-1000 hover:border-violet-600 hover:bg-violet-100 focus:outline-none  dark:bg-stone-900  dark:text-violet-50 dark:hover:bg-violet-900  md:w-40"
            on:click={skipBackup}
          >
            Skip
          </button>
        </div>
      {:else}
        <div class="my-8 flex w-full justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="256"
            height="256"
            class="rounded"
          >
            {@html qrcode}
          </svg>
        </div>
        <p>
          <span class="font-bold text-stone-900 dark:text-stone-50">
            Better save than sorry.
          </span>
          To save this personal account to your mobile phone, simply scan the provided
          QR code. Most modern mobile devices have a built-in QR code scanner in
          their camera app. If you are having trouble scanning the code, check out
          <a
            href="https://support.google.com/accounts/answer/9283368"
            class="font-bold underline"
          >
            this guide
          </a>
          for a detailed explanation of how to use this feature.
        </p>
        <div class="mt-6 flex justify-center space-x-2">
          <button
            class="hidden w-full justify-center rounded border-2 border-violet-600  bg-violet-600 px-4 py-2 text-lg font-semibold text-white transition-all delay-150 duration-1000 hover:bg-violet-700 focus:outline-none dark:bg-violet-600  dark:text-violet-50 dark:hover:bg-violet-800  md:w-40"
            on:click={copyLink}
          >
            Share link
          </button>
          <button
            class="flex w-full items-center justify-center rounded border-2 border-violet-600 px-4 py-2 text-lg font-semibold text-violet-600 transition-all delay-150 duration-1000 hover:border-violet-600 hover:bg-violet-100 focus:outline-none  dark:bg-stone-900  dark:text-violet-50 dark:hover:bg-violet-900  md:w-40"
            on:click={skipBackup}
          >
            Skip
          </button>
        </div>
      {/if}
    </div>
    <img
      src="https://images.unsplash.com/photo-1465420513954-e331ffa275ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
      alt=""
      class="h-full rounded  bg-stone-500 object-cover xl:col-span-3"
    />
  </div>
</section>
