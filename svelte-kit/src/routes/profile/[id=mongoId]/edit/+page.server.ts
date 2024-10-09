import { isAdmin } from '$lib/authutil';
import User from '$lib/models/User';
import type { Session } from '@auth/sveltekit';
import { error, fail, redirect } from '@sveltejs/kit';

export const prerender = false;

export const load = async ({ locals, params }) => {
	const session = await locals.auth();

	if (!session) {
		return error(401, 'Non authentifié');
	}

	if (!isOwnProfileOrAdmin(session, params.id)) {
		return error(403, 'Accès interdit');
	}
};

export const actions = {
	editProfile: async ({ request, locals, params }) => {
		const session = await locals.auth();
		if (!session) {
			return error(401, 'Non authentifié');
		}

		if (!isOwnProfileOrAdmin(session, params.id)) {
			return error(403, 'Accès interdit');
		}

		const formData = await request.formData();
		const fullName = formData.get('fullName');
		const promo = formData.get('promo');
		const sports = formData.getAll('sports');
		const discord = formData.get('discord');

		const user = await User.findByIdAndUpdate(params.id, {
			fullName,
			promo,
			sports,
			discord
		});

		if (!user) {
			return error(404, 'Utilisateur non trouvé');
		}

		try {
			await user.save();
		} catch (e) {
			return fail(400, { message: 'Erreur lors de la sauvegarde' });
		}

		return redirect(302, `/profile/${user._id}`);
	}
};

function isOwnProfileOrAdmin(session: Session, userId: string) {
	return session?.user?.id === userId || isAdmin(session);
}
