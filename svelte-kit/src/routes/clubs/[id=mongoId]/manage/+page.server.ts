import { recursiveStringifyId } from '$lib/database.js';
import Club from '$lib/models/Club';
import User from '$lib/models/User';
import { error, fail, redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export const prerender = false;

export const load = async ({ params, locals }) => {
	const session = await locals.auth();
	if (!session) {
		return error(403, { message: "Vous n'êtes pas autorisé à accéder à cette page" });
	}

	const club = await Club.findById(params.id)
		.lean()
		.exec()
		.then((club) => {
			if (club === null) {
				throw error(404, 'Club non trouvé');
			}

			return {
				...club,
				_id: club._id.toString(),
				owner: club.owner?._id?.toString() ?? ''
			};
		});

	if (!club) {
		throw error(404, 'Club non trouvé');
	}

	if (session.user?.isAdmin || club.owner?.toString() === session.user?.id) {
		return {
			club,
			users: await User.find()
				.lean()
				.exec()
				.then((users) => users.map(recursiveStringifyId))
		};
	}

	return error(403, "Vous n'êtes pas autorisé à accéder à cette page");
};

export const actions = {
	async update(event) {
		const { id } = event.params;
		const formData = await event.request.formData();
		const name = formData.get('name');
		const description = formData.get('description');
		const owner = formData.get('owner');

		const club = await Club.findById(id);

		if (!club) {
			return fail(404, { message: 'Club non trouvé' });
		}

		try {
			club.name = (name as string) ?? undefined;
			club.description = (description as string) ?? undefined;
			club.owner = owner ? ObjectId.createFromHexString(owner as string) : undefined;

			await club.save();
		} catch (error) {
			return fail(400, { message: 'Erreur lors de la mise à jour du club' });
		}

		return redirect(303, '/clubs');
	},
	async delete(event) {
		const session = await event.locals.auth();
		if (!session || !session?.user?.isAdmin) {
			return fail(403, { message: "Vous n'êtes pas autorisé à supprimer un club" });
		}

		const { id } = event.params;
		const club = await Club.findById(id);

		if (!club) {
			return fail(404, { message: 'Club non trouvé' });
		}

		await club.deleteOne();
		return redirect(303, '/clubs');
	}
};