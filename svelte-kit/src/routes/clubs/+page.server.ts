import { recursiveStringifyId } from '$lib/database.js';
import Club from '$lib/models/Club';

export const load = async ({}) => {
	return {
		clubs: await Club.find()
			.populate('owner')
			.lean()
			.exec()
			.then((clubs) => clubs.map(recursiveStringifyId))
	};
};
