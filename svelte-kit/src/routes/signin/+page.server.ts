import { redirect } from '@sveltejs/kit';
import { signIn } from '../../auth';
import type { Actions, PageServerLoad } from './$types';

export const prerender = false;
export const actions: Actions = { default: signIn };

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();
	if (session) {
		throw redirect(303, '/');
	}
};
