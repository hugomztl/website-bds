import { recursiveStringifyId } from '$lib/database.js';
import Club from '$lib/models/Club';
import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const session = await locals.auth();

	if (!session?.user) {
		throw redirect(302, '/signin');
	}

	if (!session.user.isAdmin) {
		error(403, { message: "Vous n'êtes pas autorisé à accéder à cette page" });
	}

	return {
		clubs: await Club.find()
			.populate('owner')
			.lean()
			.exec()
			.then((clubs) => clubs.map(recursiveStringifyId))
	};
};
