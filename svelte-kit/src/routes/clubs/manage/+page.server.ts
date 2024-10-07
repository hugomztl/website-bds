import { recursiveStringifyId } from '$lib/database';
import Club from '$lib/models/Club';
import type { User } from '@auth/sveltekit/providers/notion';

export const load = async ({}) => {
	return {
		clubs: await Club.find()
			.populate<{ owner: User }>('owner')
			.lean()
			.exec()
			.then((clubs) => clubs.map(recursiveStringifyId))
	};
};
