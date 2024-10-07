import { recursiveStringifyId } from '$lib/database.js';
import Club from '$lib/models/Club';
import { error, fail } from '@sveltejs/kit';
import { addUserToClub } from './util';
import mongoose from 'mongoose';

export const prerender = false;

export const actions = {
	join: async ({ locals, params }) => {
		const session = await locals.auth();
		if (!session) {
			return fail(403, { message: 'Vous devez être connecté pour rejoindre un club.' });
		}

		const club = await Club.findById(params.id).exec();
		if (!club) {
			throw error(404, 'Club introuvable.');
		}

		addUserToClub(mongoose.Types.ObjectId.createFromHexString(session.user?.id!), club);
	}
};

export const load = async ({ params, locals }) => {
	const session = await locals.auth();

	const club = await Club.findById(params.id).exec();

	if (!club) {
		throw error(404, 'Club introuvable.');
	}

	return {
		club: recursiveStringifyId(club.toObject()),
		member: club.members
			.find((member) => (!session ? session : member.user?.equals(session.user?.id!)))
			?.toObject({ flattenObjectIds: true })
	};
};
