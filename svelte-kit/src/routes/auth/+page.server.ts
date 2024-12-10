import { fail, isRedirect, redirect } from '@sveltejs/kit';
import { signIn } from '../../auth';
import type { Actions, PageServerLoad } from './$types';
import { CredentialsSignin } from '@auth/core/errors';
import { formatName, isViacesiEmail } from '$lib/email';
import { hashPassword } from '$lib/database';
import User from '$lib/models/User';

export const prerender = false;
export const actions: Actions = {
	signin: async (event) => {
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
	},
	register: async ({ request }) => {
		const form = await request.formData();
		const email = form.get('email');
		const password = form.get('password');
		const password_confirm = form.get('password_confirm');

		if (!email || !password || !password_confirm) {
			return fail(400, { missing: true });
		}

		if (password !== password_confirm) {
			return fail(400, { password_no_match: true });
		}

		if (typeof email !== 'string' || typeof password !== 'string' || !isViacesiEmail(email)) {
			return fail(400, { invalid: true });
		}

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return fail(400, { email, taken: true });
		}

		const hashedPassword = hashPassword(password);
		const user = new User({
			email,
			password: hashedPassword,
			license: false,
			admin: false,
			fullName: formatName(email)
		});

		// Lance une erreur si le modèle ci-dessus est invalide
		await user.save();

		return redirect(303, `/auth?email=${encodeURIComponent(email)}`);
	}
};

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();
	if (session) {
		throw redirect(303, '/');
	}
};
