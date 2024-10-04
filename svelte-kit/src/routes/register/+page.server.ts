import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { isViacesiEmail } from '$lib/email';
import { hashPassword } from '$lib/database';
import User from '$lib/models/User';
import { formatName } from '$lib/user';

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

		return redirect(303, `/signin?email=${encodeURIComponent(email)}`);
	}
};

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();
	if (session) {
		throw redirect(303, '/');
	}
};
