import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const session = await locals.auth();

	if (!session) {
		return redirect(302, '/');
	}

	return {
		session
	};
};
