import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const session = await locals.auth();

	if (!session?.user) {
		return redirect(302, '/signin');
	}

	return redirect(302, `/profile/${encodeURIComponent(session.user.id!)}`);
};
