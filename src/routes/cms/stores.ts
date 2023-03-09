import { writable, type Writable } from 'svelte/store';

import type { DocGallery } from '$routes/cms/lib/cms';

export enum AREAS {
	PRIVATE = 'private',
	PUBLIC = 'public',
}

export const cmsStore: Writable<DocGallery> = writable({
	loading: true,
	publicDocuments: [],
	privateDocuments: [],
	selectedArea: AREAS.PRIVATE,
});
