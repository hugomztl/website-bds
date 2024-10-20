import { error } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const session = (await parent()).session;

	if (!session?.user) {
		return error(401);
	}

	if (!session.user.isAdmin) {
		return error(403);
	}
};
