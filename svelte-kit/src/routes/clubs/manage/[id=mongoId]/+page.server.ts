import { recursiveStringifyId } from '$lib/database.js';
import Club from '$lib/models/Club';
import User from '$lib/models/User';
import { error, fail, redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export const prerender = false;

export const load = async ({ params }) => {
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

	return {
		club,
		users: await User.find()
			.lean()
			.exec()
			.then((users) => users.map(recursiveStringifyId))
	};
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

		return redirect(303, '/clubs/manage');
	},
	async delete(event) {
		const { id } = event.params;
		const club = await Club.findById(id);

		if (!club) {
			return fail(404, { message: 'Club non trouvé' });
		}

		await club.deleteOne();
		return redirect(303, '/clubs/manage');
	}
};
