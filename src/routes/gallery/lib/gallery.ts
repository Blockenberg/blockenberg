import { get as getStore } from "svelte/store";
import * as wn from "webnative";
import type PublicFile from "webnative/fs/v1/PublicFile";
import type PrivateFile from "webnative/fs/v1/PrivateFile";
import { isFile } from "webnative/fs/types/check";

import { filesystemStore } from "$src/stores";
import { AREAS, cmsStore } from "$routes/gallery/stores";
import { addNotification } from "$lib/notifications";
import { fileToUint8Array } from "$lib/utils";

export type Image = {
  cid: string;
  ctime: number;
  name: string;
  private: boolean;
  size: number;
  src: string;
};

export type Gallery = {
  publicDocuments;
  privateDocuments;
  selectedArea: AREAS;
  loading: boolean;
};

export type ContentDoc = {
  image: string;
  header: string;
  content: string;
  private: boolean;
};

type Link = {
  size: number;
};

export const GALLERY_DIRS = {
  [AREAS.PUBLIC]: ["public", "gallery"],
  [AREAS.PRIVATE]: ["private", "gallery"],
};
export const DOCS_DIRS = {
  [AREAS.PUBLIC]: ["public", "documents"],
  [AREAS.PRIVATE]: ["private", "documents"],
};
const FILE_SIZE_LIMIT = 20;

/**
 * Get docs from the user's WNFS
 */
export const getDocsFromWNFS: () => Promise<void> = async () => {
  try {
    // Set loading: true on the cmsStore
    cmsStore.update((store) => ({ ...store, loading: true }));

    const { selectedArea } = getStore(cmsStore);
    //console.log(selectedArea);
    const isPrivate = selectedArea === AREAS.PRIVATE;
    const fs = getStore(filesystemStore);

    // Set path to either private or public gallery dir
    const path = wn.path.directory(...DOCS_DIRS[selectedArea]);

    // Get list of links for files in the gallery dir
    const links = await fs.ls(path);

    let docs = await Promise.all(
      Object.entries(links).map(async ([name]) => {
        const file = await fs.get(
          wn.path.file(...DOCS_DIRS[selectedArea], `${name}`),
        );

        if (!isFile(file)) return null;
        //console.log(new TextDecoder().decode(file.content));

        // The CID for private files is currently located in `file.header.content`,
        // whereas the CID for public files is located in `file.cid`
        const cid = isPrivate
          ? (file as PrivateFile).header.content.toString()
          : (file as PublicFile).cid.toString();

        // Create a blob to use as the image `src`
        const decDoc = JSON.parse(new TextDecoder().decode(file.content));
        // const blob = new Blob([file.content]);
        // const src = URL.createObjectURL(blob);
        const src = decDoc.image;
        const content = String(decDoc.content).slice(0, 50);
        const ctime = isPrivate
          ? (file as PrivateFile).header.metadata.unixMeta.ctime
          : (file as PublicFile).header.metadata.unixMeta.ctime;

        return {
          cid,
          ctime,
          name,
          private: isPrivate,
          size: (links[name] as Link).size,
          src,
          content,
        };
      }),
    );

    // Sort images by ctime(created at date)
    // NOTE: this will eventually be controlled via the UI
    docs = docs.filter((a) => !!a);
    docs.sort((a, b) => b.ctime - a.ctime);

    // Push images to the cmsStore
    cmsStore.update((store) => ({
      ...store,
      ...(isPrivate
        ? {
          privateDocuments: docs,
        }
        : {
          publicDocuments: docs,
        }),
      loading: false,
    }));
  } catch (error) {
    console.error(error);
    cmsStore.update((store) => ({
      ...store,
      loading: false,
    }));
  }
};

/**
 * Get images from the user's WNFS and construct the `src` value for the images
 */
export const getImagesFromWNFS: () => Promise<void> = async () => {
  try {
    // Set loading: true on the cmsStore
    cmsStore.update((store) => ({ ...store, loading: true }));

    const { selectedArea } = getStore(cmsStore);
    //console.log(selectedArea);
    const isPrivate = selectedArea === AREAS.PRIVATE;
    const fs = getStore(filesystemStore);

    // Set path to either private or public gallery dir
    const path = wn.path.directory(...GALLERY_DIRS[selectedArea]);

    // Get list of links for files in the gallery dir
    const links = await fs.ls(path);

    let images = await Promise.all(
      Object.entries(links).map(async ([name]) => {
        const file = await fs.get(
          wn.path.file(...GALLERY_DIRS[selectedArea], `${name}`),
        );

        if (!isFile(file)) return null;

        // The CID for private files is currently located in `file.header.content`,
        // whereas the CID for public files is located in `file.cid`
        const cid = isPrivate
          ? (file as PrivateFile).header.content.toString()
          : (file as PublicFile).cid.toString();

        // Create a blob to use as the image `src`
        const blob = new Blob([file.content]);
        const src = URL.createObjectURL(blob);

        const ctime = isPrivate
          ? (file as PrivateFile).header.metadata.unixMeta.ctime
          : (file as PublicFile).header.metadata.unixMeta.ctime;

        return {
          cid,
          ctime,
          name,
          private: isPrivate,
          size: (links[name] as Link).size,
          src,
        };
      }),
    );

    // Sort images by ctime(created at date)
    // NOTE: this will eventually be controlled via the UI
    images = images.filter((a) => !!a);
    images.sort((a, b) => b.ctime - a.ctime);

    // Push images to the cmsStore
    cmsStore.update((store) => ({
      ...store,
      ...(isPrivate
        ? {
          privateDocuments: images,
        }
        : {
          publicDocuments: images,
        }),
      loading: false,
    }));
  } catch (error) {
    console.error(error);
    cmsStore.update((store) => ({
      ...store,
      loading: false,
    }));
  }
};

/**
 * Upload the doc to the user's private WNFS //this needs to be merged to one upload fn
 * @param doc
 */
export const uploadDocumentToWNFS: (
  doc: ContentDoc,
  publish: boolean,
) => Promise<string> = async (doc, publish) => {
  try {
    //console.log(doc);
    const selectedArea = publish ? AREAS.PUBLIC : AREAS.PRIVATE; //we always upload to private
    const fs = getStore(filesystemStore);
    const filename = encodeURI(doc.header);

    // Reject the upload if doc with same name already exists in the directory
    const imageExists = await fs.exists(
      wn.path.file(...DOCS_DIRS[selectedArea], filename),
    );
    if (imageExists) {
      throw new Error(`${filename} image already exists`);
    }

    // Create a sub directory and add some content
    await fs.write(
      wn.path.file(...DOCS_DIRS[selectedArea], filename),
      new TextEncoder().encode(JSON.stringify(doc)),
    );

    // Announce the changes to the server
    await fs.publish();

    addNotification(`${filename} image has been published`, "success");

    return String(filename);
  } catch (error) {
    addNotification(error.message, "error");
    console.error(error);
  }
};

/**
 * Upload an image to the user's private  WNFS
 * @param image
 */
export const uploadImageToWNFS: (
  image: File,
) => Promise<string> = async (image) => {
  try {
    //console.log(image)
    const selectedArea = AREAS.PRIVATE;
    const fs = getStore(filesystemStore);

    // Reject files over 20MB
    const imageSizeInMB = image.size / (1024 * 1024);
    if (imageSizeInMB > FILE_SIZE_LIMIT) {
      throw new Error("Image can be no larger than 20MB");
    }

    // Reject the upload if the image already exists in the directory
    const imageExists = await fs.exists(
      wn.path.file(...GALLERY_DIRS[selectedArea], image.name),
    );
    if (imageExists) {
      throw new Error(`${image.name} image already exists`);
    }

    // Create a sub directory and add some content
    await fs.write(
      wn.path.file(...GALLERY_DIRS[selectedArea], image.name),
      await fileToUint8Array(image),
    );

    // Announce the changes to the server
    await fs.publish();

    addNotification(`${image.name} image has been published`, "success");

    return image.name;
  } catch (error) {
    addNotification(error.message, "error");
    console.error(error);
  }
};

/**
 * Delete an image from the user's private or public WNFS
 * @param name
 */
export const deleteImageFromWNFS: (
  name: string,
) => Promise<void> = async (name) => {
  try {
    const { selectedArea } = getStore(cmsStore);
    const fs = getStore(filesystemStore);

    const imageExists = await fs.exists(
      wn.path.file(...GALLERY_DIRS[selectedArea], name),
    );

    if (imageExists) {
      // Remove images from server
      await fs.rm(wn.path.file(...GALLERY_DIRS[selectedArea], name));

      // Announce the changes to the server
      await fs.publish();

      addNotification(`${name} image has been deleted`, "success");

      // Refetch images and update cmsStore
      await getImagesFromWNFS();
    } else {
      throw new Error(`${name} image has already been deleted`);
    }
  } catch (error) {
    addNotification(error.message, "error");
    console.error(error);
  }
};

/**
 * Handle uploads made by interacting with the file input directly
 */
export const handleFileInput: (
  files: FileList,
) => Promise<void> = async (files) => {
  await Promise.all(
    Array.from(files).map(async (file) => {
      await uploadImageToWNFS(file);
    }),
  );

  // Refetch images and update cmsStore
  await getImagesFromWNFS();
};
