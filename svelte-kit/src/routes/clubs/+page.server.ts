import { recursiveStringifyId } from '$lib/database.js';
import Club from '$lib/models/Club';
import type { User } from '@auth/sveltekit/providers/notion';

export const load = async ({ locals }) => {
	const userId = (await locals.auth())?.user?.id ?? '';
	return {
		clubs: await Club.find()
			.populate<{ owner: User }>('owner')
			.lean()
			.exec()
			.then((clubs) => clubs.map(recursiveStringifyId))
			.then((clubs) => {
				return clubs.sort((a, b) => {
					if (a.owner?._id === userId) return -1;
					if (b.owner?._id === userId) return 1;
					return 0;
				});
			})
	};
};
