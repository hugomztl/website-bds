import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { isViacesiEmail } from '$lib/email';
import { client, hashPassword } from '$lib/database';

export const prerender = false;

export const actions: Actions = {
	default: async ({ request }) => {
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

		const existingUser = await client.db().collection('users').findOne({ email });

		if (existingUser) {
			return fail(400, { email, taken: true });
		}

		const hashedPassword = hashPassword(password);
		await client.db().collection('users').insertOne({
			email,
			password: hashedPassword
		});

		return redirect(303, `/signin?email=${encodeURIComponent(email)}`);
	}
};

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();
	if (session) {
		throw redirect(303, '/');
	}
};
