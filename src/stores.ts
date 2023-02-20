import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type FileSystem from "webnative/fs/index";

import type { AccountSettings } from "$lib/account-settings";
import type { Notification } from "$lib/notifications";
import type { Session } from "$lib/session";

export const sessionStore: Writable<Session> = writable({
	username: null,
	session: null,
	authStrategy: null,
	program: null,
	loading: true,
	backupCreated: null,
});

export const filesystemStore: Writable<FileSystem | null> = writable(null);

export const notificationStore: Writable<Notification[]> = writable([]);

export const accountSettingsStore: Writable<AccountSettings> = writable({
	avatar: null,
	loading: true,
	organization: false,
	hook: "",
});
