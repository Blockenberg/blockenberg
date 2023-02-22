import * as webnative from 'webnative';

import { dev } from '$app/environment';
import { filesystemStore, sessionStore } from '../stores';
import { type BackupStatus, getBackupStatus } from '$lib/auth/backup';
import { createDID, USERNAME_STORAGE_KEY } from '$lib/auth/account';
import { webnativeNamespace } from '$lib/app-info';

export const initialize = async (): Promise<void> => {
  try {
    let backupStatus: BackupStatus = null;

    const program: webnative.Program = await webnative.program({
      namespace: webnativeNamespace,
      debug: dev,
    });

    if (program.session) {
      // Authed
      backupStatus = await getBackupStatus(program.session.fs);

      const fullUsername = await program.components.storage.getItem(
        USERNAME_STORAGE_KEY,
      ) as string;

      sessionStore.set({
        username: {
          full: fullUsername,
          hashed: program.session.username,
          trimmed: fullUsername.split('#')[0],
        },
        session: program.session,
        authStrategy: program.auth,
        program,
        loading: false,
        backupCreated: backupStatus.created,
      });

      filesystemStore.set(program.session.fs);
    } else {
      // Not authed
      sessionStore.set({
        username: null,
        session: null,
        authStrategy: program.auth,
        program,
        loading: false,
        backupCreated: null,
      });
    }
  } catch (error) {
    console.error(error);

    switch (error) {
      case webnative.ProgramError.InsecureContext:
        sessionStore.update((session) => ({
          ...session,
          loading: false,
          error: 'Insecure Context',
        }));
        break;

      case webnative.ProgramError.UnsupportedBrowser:
        sessionStore.update((session) => ({
          ...session,
          loading: false,
          error: 'Unsupported Browser',
        }));
        break;
    }
  }
};
