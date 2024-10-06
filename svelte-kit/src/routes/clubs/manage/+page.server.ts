import { recursiveStringifyId } from '$lib/database';
import Club from '$lib/models/Club';

export const load = async ({ locals }) => {
	return {
		clubs: await Club.find()
			.populate('owner')
			.lean()
			.exec()
			.then((clubs) => clubs.map(recursiveStringifyId))
	};
};
