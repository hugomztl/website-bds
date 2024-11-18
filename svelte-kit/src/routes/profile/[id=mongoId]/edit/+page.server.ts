import { isAdmin } from '$lib/authutil';
import User from '$lib/models/User';
import type { Session } from '@auth/sveltekit';
import { error, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import userForm from './userForm.js';

export const prerender = false;

export const load = async ({ locals, params, parent }) => {
	const session = await locals.auth();

	if (!session) {
		return error(401, 'Non authentifié');
	}

	if (!isOwnProfileOrAdmin(session, params.id)) {
		return error(403, 'Accès interdit');
	}

	const user = (await parent()).user;
	if (!user) {
		return error(404, 'Utilisateur introuvable');
	}

	// @ts-expect-error
	const form = await superValidate(user, zod(userForm));

	return { form };
};

export const actions = {
	editProfile: async ({ request, locals, params }) => {
		const session = await locals.auth();
		if (!session) {
			return fail(401);
		}

		if (!isOwnProfileOrAdmin(session, params.id)) {
			return fail(403);
		}

		const form = await superValidate(request, zod(userForm));
		if (!form.valid) {
			return fail(400, { form });
		}

		const { fullName, promo, sports, discord } = form.data;
		const user = await User.findByIdAndUpdate(
			params.id,
			{
				fullName,
				promo,
				sports,
				discord
			},
			{ runValidators: true }
		);

		if (!user) {
			return fail(404);
		}

		console.info({ fullName, promo, sports, discord });
	}
};

function isOwnProfileOrAdmin(session: Session, userId: string) {
	return session?.user?.id === userId || isAdmin(session);
}
