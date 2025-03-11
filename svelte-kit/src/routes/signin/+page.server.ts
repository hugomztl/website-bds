import { fail, isRedirect, redirect } from '@sveltejs/kit';
import { signIn } from '../../auth';
import type { Actions, PageServerLoad } from './$types';
import { CredentialsSignin } from '@auth/core/errors';
import { superValidate } from 'sveltekit-superforms/server';
import { registerSchema } from './registerForm';
import { zod } from 'sveltekit-superforms/adapters';
import User from '$lib/models/User';
import { hashPassword } from '$lib/database';
import { formatName } from '$lib/email';

export const prerender = false;
export const actions: Actions = {
	signin: async (event) => {
		try {
			console.info("Signin");
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
	register: async (event) => {
		const form = await superValidate(event, zod(registerSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const { email, password } = form.data;
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

		await user.save();

		console.info(User.find({}));
	}
};

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();
	if (session) {
		throw redirect(303, '/');
	}

	const form = await superValidate(zod(registerSchema));
	return { form };
};