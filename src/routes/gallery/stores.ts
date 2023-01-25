import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

import type { Gallery } from '$routes/gallery/lib/gallery'

export enum AREAS {

  PRIVATE = 'In Progress',
  PUBLIC = 'Published'
}

export const cmsStore: Writable<Gallery> = writable({
  loading: true,
  publicImages: [],
  privateImages: [],
  selectedArea: AREAS.PUBLIC,
})
