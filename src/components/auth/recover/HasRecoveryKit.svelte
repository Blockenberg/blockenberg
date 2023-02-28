<script lang="ts">
  import * as RootKey from 'webnative/common/root-key';
  import * as UCAN from 'webnative/ucan/index';
  import * as DID from 'webnative/did/index';
  import * as uint8arrays from 'uint8arrays';

  import { sessionStore, filesystemStore } from '$src/stores';
  import {
    RECOVERY_STATES,
    USERNAME_STORAGE_KEY,
    loadAccount,
    prepareUsername
  } from '$lib/auth/account';
  import Check from '$components/icons/CheckIcon.svelte';
  import RecoveryKitButton from './RecoveryKitButton.svelte';
  import { setOrgStatus } from '$lib/auth/organization';

  let state = $sessionStore.session
    ? RECOVERY_STATES.Done
    : RECOVERY_STATES.Ready;

  /**
   * Parse the user's `username` and `readKey` from the uploaded recovery kit and pass them into
   * webnative to recover the user's account and populate the `session` and `filesystem` stores
   * @param files
   */
  export const handleFileInput: (
    files: FileList
  ) => Promise<void> = async files => {
    const reader = new FileReader();

    reader.onload = async event => {
      state = RECOVERY_STATES.Processing;

      try {
        const {
          authStrategy,
          program: {
            components: { crypto, reference, storage }
          }
        } = $sessionStore;

        const recovery = JSON.parse(event.target.result as string);

        // const parts = (event.target.result as string)
        //   .split('username: ')[1]
        //   .split('key: ');

        const readKey = uint8arrays.fromString(
          // Trim any whitespace from the parsed readKey
          // parts[1].replace(/(\r\n|\n|\r)/gm, ''),
          // 'base64pad'
          String(recovery.key).replace(/(\r\n|\n|\r)/gm, ''),
          'base64pad'
        );

        // Trim any whitespace from the parsed username
        const oldUsername = String(recovery.username).replace(
          /(\r\n|\n|\r)/gm,
          ''
        ); //parts[0].replace(/(\r\n|\n|\r)/gm, '');
        const hashedOldUsername = await prepareUsername(oldUsername);
        const newRootDID = await $sessionStore.program.agentDID();

        // Construct a new username using the old `trimmed` name and `newRootDID`
        const newUsername = `${oldUsername.split('#')[0]}#${newRootDID}`;
        const hashedNewUsername = await prepareUsername(newUsername);

        storage.setItem(USERNAME_STORAGE_KEY, newUsername);

        // Register the user with the `hashedNewUsername`
        const { success } = await authStrategy.register({
          username: hashedNewUsername
        });
        if (!success) {
          throw new Error('Failed to register new user');
        }

        setOrgStatus($filesystemStore, recovery.organization);

        sessionStore.update(session => ({
          ...session,
          organization: recovery.organization
        }));

        // Build an ephemeral UCAN to authorize the dataRoot.update call
        const proof: string | null = await storage.getItem(
          storage.KEYS.ACCOUNT_UCAN
        );
        const ucan = await UCAN.build({
          dependencies: $sessionStore.program.components,
          potency: 'APPEND',
          resource: '*',
          proof: proof ? proof : undefined,
          lifetimeInSeconds: 60 * 3, // Three minutes
          audience: newRootDID,
          issuer: newRootDID
        });

        const oldRootCID = await reference.dataRoot.lookup(hashedOldUsername);

        // Update the dataRoot of the new user
        await reference.dataRoot.update(oldRootCID, ucan);

        // Store the accountDID, which is used to namespace the readKey
        await RootKey.store({
          accountDID: newRootDID,
          readKey,
          crypto: crypto
        });

        // Load account data into sessionStore
        await loadAccount(hashedNewUsername, newUsername);

        state = RECOVERY_STATES.Done;
      } catch (error) {
        console.error(error);
        state = RECOVERY_STATES.Error;
      }
    };

    reader.onerror = error => {
      console.error(error);
      state = RECOVERY_STATES.Error;
    };

    reader.readAsText(files[0]);
  };
</script>

<section class="py-6 dark:bg-violet-400 dark:text-gray-900">
  <div
    class="container mx-auto flex flex-col items-center justify-center space-y-8 p-4 md:p-10 md:px-24 xl:px-48"
  >
    {#if state === RECOVERY_STATES.Done}
      <h1 class="text-center text-5xl font-bold leading-none">Welcome back!</h1>
      <p class="pt-2 pb-8 text-center text-xl font-medium">
        It is a pleasure to have you back {$sessionStore.username.trimmed}.
        Enjoy Blockenberg, the only unstoppable CMS.
      </p>
    {:else}
      <h1 class="text-center text-5xl font-bold leading-none">
        Restore account
      </h1>
      <p class="pt-2 pb-8 text-center text-xl font-medium">
        If you’ve lost access to all of your connected devices, you can use your
        recovery kit to restore access to your private data. The file you are
        looking for is named Blockenberg-yourUsername.recovery.
      </p>
      <RecoveryKitButton {handleFileInput} {state} />
    {/if}
    {#if state === RECOVERY_STATES.Error}
      <p class="text-red-600">
        Please double check that you uploaded the correct file. The legacy of
        your account will live forever on the IPFS, but we can't help you to
        recover your account with this file. If you are out of options, consider
        copying the content from your client somewhere else and start anew.
      </p>
    {/if}
  </div>
</section>
