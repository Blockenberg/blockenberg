import { writable, type Writable } from 'svelte/store';

import type { DocGallery } from '$routes/cms/lib/cms';

export enum AREAS {
  PRIVATE = 'In Progress',
  PUBLIC = 'Published',
}

export const cmsStore: Writable<DocGallery> = writable({
  loading: true,
  publicDocuments: [],
  privateDocuments: [],
  selectedArea: AREAS.PRIVATE,
});
