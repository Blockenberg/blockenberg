/* eslint-disable @typescript-eslint/quotes */
import { get as getStore } from 'svelte/store';
import * as wn from 'webnative';
import type PublicFile from 'webnative/fs/v1/PublicFile';
import type PrivateFile from 'webnative/fs/v1/PrivateFile';
import { isFile } from 'webnative/fs/types/check';

import {
  filesystemStore,
  accountSettingsStore,
  sessionStore
} from '$src/stores';
import { AREAS, cmsStore } from '$routes/cms/stores';
import { addNotification } from '$lib/notifications';
import { fileToUint8Array } from '$lib/utils';

import { CID } from 'multiformats/cid';
import * as json from 'multiformats/codecs/json';
import { sha256 } from 'multiformats/hashes/sha2';

export type Image = {
  cid: string;
  ctime: number;
  name: string;
  private: boolean;
  size: number;
  src: string;
};

export type DocGallery = {
  publicDocuments;
  privateDocuments;
  selectedArea: AREAS;
  loading: boolean;
};

export type ContentDoc = {
  image: string;
  header: string;
  tags: string[];
  CID: string;
  content: string;
  private: boolean;
  updated: number;
  author: string;
};

type Link = {
  size: number;
};

export const GALLERY_DIRS = {
  [AREAS.PUBLIC]: ['public', 'gallery'],
  [AREAS.PRIVATE]: ['private', 'gallery']
};
export const DOCS_DIRS = {
  [AREAS.PUBLIC]: ['public', 'documents'],
  [AREAS.PRIVATE]: ['private', 'documents']
};
const FILE_SIZE_LIMIT = 20;

const userSettings = getStore(accountSettingsStore);
const sessionSettings = getStore(sessionStore);

/**
 * Get docs from the user's WNFS
 */
export const getDocsFromWNFS: () => Promise<boolean> = async () => {
  try {
    // Set loading: true on the cmsStore
    cmsStore.update(store => ({ ...store, loading: true }));

    const { selectedArea } = getStore(cmsStore);
    const isPrivate = selectedArea === AREAS.PRIVATE;
    const fs = getStore(filesystemStore);

    // Set path to either private or public gallery dir
    const path = wn.path.directory(...DOCS_DIRS[selectedArea]);

    // Get list of links for files in the gallery dir
    const links = await fs.ls(path);

    //console.log(links);

    let docs = await Promise.all(
      Object.entries(links).map(async ([name]) => {
        const file = await fs.get(
          wn.path.file(...DOCS_DIRS[selectedArea], `${name}`)
        );
        //console.log(name);
        //console.log(selectedArea);
        if (!isFile(file)) return null;
        //console.log(new TextDecoder().decode(file.content));

        // The CID for private files is currently located in `file.header.content`,
        // whereas the CID for public files is located in `file.cid`
        const cid = isPrivate
          ? (file as PrivateFile).header.content.toString()
          : (file as PublicFile).cid.toString();

        // Create a blob to use as the image `src`
        const decDoc = JSON.parse(new TextDecoder().decode(file.content));
        let src;
        const imageFragment = decDoc.image;
        try {
          const image = JSON.parse(decodeURI(imageFragment));
          src = await getImageFromWNFS(image.name);
          //console.log(image);
        } catch {
          console.info('image not found');
        }
        const content = String(decDoc.content);
        const header = String(decDoc.header);
        const ctime = isPrivate
          ? (file as PrivateFile).header.metadata.unixMeta.ctime
          : (file as PublicFile).header.metadata.unixMeta.ctime;

        return {
          cid,
          ctime,
          name,
          header,
          private: isPrivate,
          size: (links[name] as Link).size,
          src,
          content
        };
      })
    );

    // Sort docs by ctime(created at date)
    // NOTE: this will eventually be controlled via the UI
    docs = docs.filter(a => !!a);
    docs.sort((a, b) => b.ctime - a.ctime);

    // Push docs to the cmsStore
    cmsStore.update(store => ({
      ...store,
      ...(isPrivate
        ? {
            privateDocuments: docs
          }
        : {
            publicDocuments: docs
          }),
      loading: false
    }));
    return docs.length > 0;
  } catch (error) {
    console.error(error);
    cmsStore.update(store => ({
      ...store,
      loading: false
    }));
    return false;
  }
};

/**
 * get an image from the user's  public WNFS
 * @param name
 */
export const getImageFromWNFS: (
  name: string
) => Promise<string> = async name => {
  try {
    const fs = getStore(filesystemStore);
    //console.info(fs);
    const imageExists = await fs.exists(
      wn.path.file(...GALLERY_DIRS[AREAS.PUBLIC], name)
    );

    if (imageExists) {
      const file = await fs.get(
        wn.path.file(...GALLERY_DIRS[AREAS.PUBLIC], name)
      );
      if (!isFile(file)) return null;
      //console.log(file);
      const blob = new Blob([file.content]);
      return URL.createObjectURL(blob);
    } else {
      throw new Error(`${name} doesn't exist`);
    }
  } catch (error) {
    //info - the picture does not have to exist
    console.info('filesystem issue:', error);
  }
};

/**
 * Fetch the doc from the user's private or public WNFS
 * @param name
 */
export const getDocFromWNFS: (
  name: string
) => Promise<{
  cid: string;
  ctime: number;
  name: string;
  header: string;
  tags: string[];
  private: boolean;
  imgsrc: string;
  imgname: string;
  content: string;
}> = async name => {
  try {
    const { selectedArea } = getStore(cmsStore);
    const fs = getStore(filesystemStore);
    const docExists = await fs.exists(
      wn.path.file(...DOCS_DIRS[selectedArea], name)
    );

    if (docExists) {
      const file = await fs.get(wn.path.file(...DOCS_DIRS[selectedArea], name));
      if (!isFile(file)) return null;
      const isPrivate = selectedArea === AREAS.PRIVATE;
      const cid = isPrivate
        ? (file as PrivateFile).header.content.toString()
        : (file as PublicFile).cid.toString();

      // Create a blob to use as the image `src`
      const decDoc = JSON.parse(new TextDecoder().decode(file.content));
      let imgsrc, imgname: string;
      const imageFragment = decDoc.image;
      //console.log(decDoc);
      try {
        const image = JSON.parse(decodeURI(imageFragment));
        imgname = image.name;
        imgsrc = await getImageFromWNFS(imgname);
        //console.log(imagesrc);
      } catch {
        console.info('image not found');
      }
      const content = decodeURI(String(decDoc.content));
      const header = decodeURI(String(decDoc.header));
      //console.log(cid, name);
      const ctime = isPrivate
        ? (file as PrivateFile).header.metadata.unixMeta.ctime
        : (file as PublicFile).header.metadata.unixMeta.ctime;

      return {
        cid,
        ctime,
        name,
        header,
        tags: decDoc.tags,
        private: isPrivate,
        imgsrc,
        imgname,
        content
      };
    }
  } catch (error) {
    console.error('filesystem issue:', error);
  }
};

/**
 * Get images from the user's WNFS and construct the `src` value for the images
 */
export const getImagesFromWNFS: () => Promise<void> = async () => {
  try {
    // Set loading: true on the cmsStore
    cmsStore.update(store => ({ ...store, loading: true }));

    const fs = getStore(filesystemStore);

    // Set path to either private or public gallery dir
    const path = wn.path.directory(...GALLERY_DIRS[AREAS.PUBLIC]);

    // Get list of links for files in the gallery dir
    const links = await fs.ls(path);

    let images = await Promise.all(
      Object.entries(links).map(async ([name]) => {
        const file = await fs.get(
          wn.path.file(...GALLERY_DIRS[AREAS.PUBLIC], `${name}`)
        );

        if (!isFile(file)) return null;

        // The CID for private files is currently located in `file.header.content`,
        // whereas the CID for public files is located in `file.cid`
        const cid = (file as PublicFile).cid.toString();

        // Create a blob to use as the image `src`
        const blob = new Blob([file.content]);
        const src = URL.createObjectURL(blob);

        const ctime = (file as PublicFile).header.metadata.unixMeta.ctime;

        return {
          cid,
          ctime,
          name,
          private: false,
          size: (links[name] as Link).size,
          src
        };
      })
    );

    // Sort images by ctime(created at date)
    // NOTE: this will eventually be controlled via the UI
    images = images.filter(a => !!a);
    images.sort((a, b) => b.ctime - a.ctime);

    // Push images to the cmsStore
    cmsStore.update(store => ({
      ...store,
      ...{
        publicDocuments: images
      },
      loading: false
    }));
  } catch (error) {
    console.error(error);
    cmsStore.update(store => ({
      ...store,
      loading: false
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
  overwrite: boolean
) => Promise<string> = async (doc, publish) => {
  try {
    //console.log(doc);
    const selectedArea = publish ? AREAS.PUBLIC : AREAS.PRIVATE;
    const fs = getStore(filesystemStore);
    const content = new TextEncoder().encode(JSON.stringify(doc));
    const filename =
      doc.CID ||
      CID.create(
        1,
        json.code,
        await sha256.digest(json.encode(content))
      ).toString();

    await fs.write(wn.path.file(...DOCS_DIRS[selectedArea], filename), content);

    // Announce the changes to the server
    //await fs.publish();
    await updateDataRoot(fs);

    //call hook if any
    console.log(userSettings.hook);
    const hookUrl = userSettings.hook;
    if (hookUrl && publish) {
      const newfile = await fs.get(
        wn.path.file(...DOCS_DIRS[selectedArea], filename)
      );

      const cid = publish
        ? (newfile as PublicFile).cid.toString()
        : (newfile as PrivateFile).header.content.toString();

      await callHook(hookUrl, cid);
    }

    addNotification(`${filename} file has been published`, 'success');

    return String(filename);
  } catch (error) {
    addNotification(error.message, 'error');
    console.error(error);
  }
};

/**
 * Upload an image to the user's public WNFS
 * @param image
 */
export const uploadImageToWNFS: (
  image: File
) => Promise<{
  cid: string;
  name: string;
  size: number;
  src: string;
}> = async image => {
  try {
    //console.log(image);
    const selectedArea = AREAS.PUBLIC;
    const fs = getStore(filesystemStore);

    // Reject files over 20MB
    const imageSizeInMB = image.size / (1024 * 1024);
    if (imageSizeInMB > FILE_SIZE_LIMIT) {
      throw new Error('Image can be no larger than 20MB');
    }

    // Reject the upload if the image already exists in the directory
    const imageExists = await fs.exists(
      wn.path.file(...GALLERY_DIRS[selectedArea], image.name)
    );
    if (imageExists) {
      throw new Error(`${image.name} image already exists`);
    }

    // Create a sub directory and add some content
    await fs.write(
      wn.path.file(...GALLERY_DIRS[selectedArea], image.name),
      await fileToUint8Array(image)
    );

    // Announce the changes to the server
    await fs.publish();

    const newfile = await fs.get(
      wn.path.file(...GALLERY_DIRS[selectedArea], image.name)
    );

    const cid = (newfile as PublicFile).cid.toString();

    addNotification(`${image.name} image has been published`, 'success');

    return { cid, name: image.name, size: image.size, src: '' };
  } catch (error) {
    addNotification(error.message, 'error');
    console.error(error);
  }
};

/**
 * Delete an image from the user's private or public WNFS
 * @param name
 */
export const deleteImageFromWNFS: (
  name: string
) => Promise<void> = async name => {
  try {
    const { selectedArea } = getStore(cmsStore);
    const fs = getStore(filesystemStore);

    const imageExists = await fs.exists(
      wn.path.file(...GALLERY_DIRS[selectedArea], name)
    );

    if (imageExists) {
      // Remove images from server
      await fs.rm(wn.path.file(...GALLERY_DIRS[selectedArea], name));

      // Announce the changes to the server
      await fs.publish();

      addNotification(`${name} image has been deleted`, 'success');

      // Refetch images and update cmsStore
      await getImagesFromWNFS();
    } else {
      throw new Error(`${name} image has already been deleted`);
    }
  } catch (error) {
    addNotification(error.message, 'error');
    console.error(error);
  }
};

/**
 * Delete a doc from the user's private or public WNFS
 * @param name
 */
export const deleteDocFromWNFS: (
  name: string
) => Promise<void> = async name => {
  try {
    const { selectedArea } = getStore(cmsStore);
    const fs = getStore(filesystemStore);

    const imageExists = await fs.exists(
      wn.path.file(...DOCS_DIRS[selectedArea], name)
    );

    if (imageExists) {
      // Remove images from server
      await fs.rm(wn.path.file(...DOCS_DIRS[selectedArea], name));

      // Announce the changes to the server
      await fs.publish();

      addNotification(`${name} document has been deleted`, 'success');

      // Refetch images and update cmsStore
      await getDocsFromWNFS();
    } else {
      throw new Error(`${name} document has already been deleted`);
    }
  } catch (error) {
    addNotification(error.message, 'error');
    console.error(error);
  }
};

/**
 * Handle uploads made by interacting with the file input directly
 */
export const handleFileInput: (
  files: FileList
) => Promise<void> = async files => {
  await Promise.all(
    Array.from(files).map(async file => {
      await uploadImageToWNFS(file);
    })
  );

  // Refetch images and update cmsStore
  await getImagesFromWNFS();
};
async function callHook(hookurl: string, cid: string) {
  console.log(cid);
  try {
    const response = await fetch(hookurl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        'x-blocken-signature': sessionSettings.username.hashed
      },
      body: JSON.stringify({ article: cid })
    });
    return await response.ok;
  } catch (e) {
    console.log(e);
  }
}

async function updateDataRoot(
  fs: wn.FileSystem
): Promise<{ success: boolean }> {
  const { program } = await getStore(sessionStore);
  const { reference } = await program.components;

  const fsUcan = await reference.repositories.ucans.lookupFilesystemUcan('*');
  if (!fsUcan) throw new Error("Couldn't find an appropriate UCAN");
  return reference.dataRoot.update(await fs.root.put(), fsUcan);
}
