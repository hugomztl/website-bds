import { recursiveStringifyId } from '$lib/database.js';
import Club from '$lib/models/Club';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const club = await Club.findById(params.id).lean().exec();

	if (!club) {
		throw error(404, 'Club introuvable.');
	}

	return {
		club: recursiveStringifyId(club)
	};
};
