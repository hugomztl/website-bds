import { fail, isRedirect, redirect } from '@sveltejs/kit';
import { signIn } from '../../auth';
import type { Actions, PageServerLoad } from './$types';
import { CredentialsSignin } from '@auth/core/errors';

export const prerender = false;
export const actions: Actions = {
	default: async (event) => {
		try {
			return await signIn(event);
		} catch (error) {
			if (error instanceof CredentialsSignin) {
				return fail(400, {
					error: 'Identifiant ou mot de passe invalide'
				});
			}

			if (isRedirect(error)) {
				throw error;
			}

			console.error('Une erreur inattendue est survenue: ' + JSON.stringify(error));
			return fail(500, {
				error: 'Une erreur inattendue est survenue'
			});
		}
	}
};

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();
	if (session) {
		throw redirect(303, '/');
	}
};
