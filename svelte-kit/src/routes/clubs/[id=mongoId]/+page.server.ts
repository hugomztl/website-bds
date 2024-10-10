import { recursiveStringifyId } from '$lib/database.js';
import Club from '$lib/models/Club';
import { error, fail } from '@sveltejs/kit';
import { addUserToClub } from './util';
import mongoose from 'mongoose';
import { isOwner } from '$lib/authutil';
import User from '$lib/models/User';

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

		const user = await User.findById(session.user?.id).exec();
		if (!user) {
			throw error(404, 'Utilisateur introuvable.');
		}

		const licenseOk = club.requireLicense ? user.license : true;
		const canJoinClub = session.user?.isAdmin || (licenseOk && session);

		if (!canJoinClub) {
			return fail(403, { message: "Vous n'avez pas la permission de rejoindre ce club." });
		}

		await addUserToClub(mongoose.Types.ObjectId.createFromHexString(session.user?.id!), club);

		return { success: true };
	},
	leave: async ({ locals, params }) => {
		const session = await locals.auth();
		if (!session) {
			return fail(403, { message: 'Vous devez être connecté pour quitter un club.' });
		}

		const club = await Club.findById(params.id).exec();
		if (!club) {
			throw error(404, 'Club introuvable.');
		}

		club.members = club.members.filter((member) => member.user?.toString() !== session.user?.id!);
		await club.save();

		return { success: true };
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
			?.toObject({ flattenObjectIds: true }),
		isOwner: isOwner(club.owner?.toString(), session),
		licensed: (await User.findById(session?.user?.id ?? '').exec())?.license
	};
};
