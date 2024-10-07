import Club from '$lib/models/Club';
import type { User } from '@auth/sveltekit/providers/notion';
import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	const session = await locals.auth();

	if (!session?.user) {
		throw redirect(302, '/signin');
	}

	if (params.id) {
		const club = await Club.findById(params.id).populate<{ owner: User }>('owner').exec();

		if (club?.owner?.email === session.user.email) {
			return;
		}
	}

	if (!session.user.isAdmin) {
		error(403, { message: "Vous n'êtes pas autorisé à accéder à cette page" });
	}
};
