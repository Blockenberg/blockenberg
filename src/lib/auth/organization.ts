import * as webnative from 'webnative';
import type FileSystem from 'webnative/fs/index';

export const setOrgStatus = async (
	fs: FileSystem,
	isOrganization: boolean,
): Promise<void> => {
	const accountTypePath = webnative.path.file('private', 'orgtype');
	await fs.write(
		accountTypePath,
		new TextEncoder().encode(JSON.stringify(isOrganization)),
	);
	await fs.publish();
};

export const getOrgStatus = async (fs: FileSystem): Promise<boolean> => {
	const accountTypePath = webnative.path.file('private', 'orgtype');

	if (await fs.exists(accountTypePath)) {
		const fileContent = await fs.read(accountTypePath);

		try {
			return JSON.parse(new TextDecoder().decode(fileContent)) as boolean;
		} catch (err) {
			console.warn(`Unable to load backup status: ${err.message || err}`);
		}

		return false;
	} else {
		return false;
	}
};
