import { recursiveStringifyId } from '$lib/database.js';
import Club from '$lib/models/Club';
import PendingClub from '$lib/models/PendingClub.js';
import type { User } from '@auth/sveltekit/providers/notion';
import { fail } from '@sveltejs/kit';
import mongoose from 'mongoose';
import { isValidObjectId } from 'mongoose';

export const load = async ({ locals }) => {
	const session = await locals.auth();
	const userId = session?.user?.id ?? '';
	const isAdmin = session?.user?.isAdmin ?? false;

	const clubs = await Club.find()
		.populate<{ owner: User }>('owner')
		.lean()
		.exec()
		.then((clubs) => clubs.map(recursiveStringifyId))
		.then((clubs) => {
			return clubs.sort((a, b) => {
				if (a.owner?._id === userId) return -1;
				if (b.owner?._id === userId) return 1;
				return 0;
			});
		});

	if (!session?.user) {
		return { clubs };
	}

	const pendingClubsFilter = isAdmin ? {} : { owner: { _id: userId } };
	return {
		clubs: clubs,
		pendingClubs: await PendingClub.find(pendingClubsFilter)
			.populate<{ owner: User }>('owner')
			.lean()
			.exec()
			.then((clubs) => clubs.map(recursiveStringifyId))
	};
};

export const actions = {
	acceptClub: async ({ locals, request }) => {
		const session = await locals.auth();

		if (!session?.user) {
			return fail(401);
		}

		if (!session.user.isAdmin) {
			return fail(403);
		}

		const id = (await request.formData()).get('id');
		if (!isValidObjectId(id)) {
			return fail(400);
		}

		const pendingClub = await PendingClub.findById(id).lean();
		if (!pendingClub) {
			return fail(404);
		}

		const club = new Club({
			description: pendingClub.description,
			owner: pendingClub.owner,
			requireLicense: pendingClub.requireLicense,
			logo: pendingClub.logo,
			name: pendingClub.name
		});

		const dbSession = await mongoose.startSession();
		dbSession.startTransaction();

		try {
			await PendingClub.findByIdAndDelete(id);
			await club.save();
		} catch (error) {
			await dbSession.abortTransaction();
		} finally {
			dbSession.endSession();
		}
	},
	rejectClub: async ({ locals, request }) => {
		const session = await locals.auth();

		if (!session?.user) {
			return fail(401);
		}

		if (!session.user.isAdmin) {
			return fail(403);
		}

		const id = (await request.formData()).get('id');
		if (!isValidObjectId(id)) {
			return fail(400);
		}

		await PendingClub.findByIdAndDelete(id);
	},
	cancelRequest: async ({ locals, request }) => {
		const session = await locals.auth();

		if (!session?.user) return fail(401);

		const id = (await request.formData()).get('id');
		if (!isValidObjectId(id)) return fail(400);

		const club = await PendingClub.findById(id);
		if (!club) return fail(404);

		if (session.user.id !== club.owner?._id.toString()) return fail(403);

		await club.deleteOne();
	}
};
