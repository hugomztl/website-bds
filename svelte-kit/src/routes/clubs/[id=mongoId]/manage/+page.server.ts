import { isAdmin, isOwnerOrAdmin } from '$lib/authutil';
import { recursiveStringifyId } from '$lib/database.js';
import Club from '$lib/models/Club';
import User, { type UserType } from '$lib/models/User';
import { error, fail, redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export const prerender = false;

export const load = async ({ params, locals }) => {
	const session = await locals.auth();
	if (!session) {
		return error(403, { message: "Vous n'êtes pas autorisé à accéder à cette page" });
	}

	const club = await Club.findById(params.id)
		.populate<{ members: { user: UserType; pending: boolean }[] }>('members.user')
		.exec()
		.then((club) => {
			if (club === null) {
				throw error(404, 'Club non trouvé');
			}

			return club.toObject({ flattenObjectIds: true });
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
		const session = await event.locals.auth();

		const { id } = event.params;
		const formData = await event.request.formData();
		const name = formData.get('name');
		const description = formData.get('description');
		const owner = formData.get('owner');

		const club = await Club.findById(id);

		if (!club) {
			return fail(404, { message: 'Club non trouvé' });
		}

		if (!isOwnerOrAdmin(club.owner?.toString(), session)) {
			return fail(403, { message: "Vous n'êtes pas autorisé à modifier ce club" });
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
		if (!isAdmin(session)) {
			return fail(403, { message: "Vous n'êtes pas autorisé à supprimer un club" });
		}

		const { id } = event.params;
		const club = await Club.findById(id);

		if (!club) {
			return fail(404, { message: 'Club non trouvé' });
		}

		await club.deleteOne();
		return redirect(303, '/clubs');
	},
	async acceptMember({ params, request, locals }) {
		const session = await locals.auth();
		const userId = (await request.formData()).get('userId');
		const clubId = params.id;

		const club = await Club.findById(clubId).exec();
		if (!club) {
			return fail(404, { message: 'Club non trouvé' });
		}

		if (!isOwnerOrAdmin(club.owner?.toString(), session)) {
			return fail(403, { message: "Vous n'êtes pas autorisé à modifier ce club" });
		}

		if (!(typeof userId === 'string' && ObjectId.isValid(userId))) {
			return fail(400, { message: 'ID de membre invalide' });
		}

		club.members.map((member) => {
			if (member.user?.equals(userId)) {
				member.pending = false;
			}
		});

		await club.save();

		return { success: true };
	},
	async rejectMember({ params, request, locals }) {
		const session = await locals.auth();
		const userId = (await request.formData()).get('userId');
		const clubId = params.id;

		const club = await Club.findById(clubId).exec();
		if (!club) {
			return fail(404, { message: 'Club non trouvé' });
		}

		if (!isOwnerOrAdmin(club.owner?.toString(), session)) {
			return fail(403, { message: "Vous n'êtes pas autorisé à modifier ce club" });
		}

		if (!(typeof userId === 'string' && ObjectId.isValid(userId))) {
			return fail(400, { message: 'ID de membre invalide' });
		}

		// @ts-expect-error On ignore parce que tkt
		club.members = club.members.filter((member) => !member.user?.equals(userId));
		await club.save();

		return { success: true };
	},
	async createPost({ params, request, locals }) {
		const session = await locals.auth();
		const { id } = params;
		const formData = await request.formData();
		const title = formData.get('title');
		const content = formData.get('content');

		const club = await Club.findById(id);
		if (!club) {
			return fail(404, { message: 'Club non trouvé' });
		}

		if (!isOwnerOrAdmin(club.owner?.toString(), session)) {
			return fail(403, { message: "Vous n'êtes pas autorisé à modifier ce club" });
		}

		if (!(typeof title === 'string' && typeof content === 'string')) {
			return fail(400, { message: 'Titre ou contenu invalide.' });
		}

		club.posts.push({
			title,
			content
		});

		await club.save();

		return { success: true };
	}
};
