import { recursiveStringifyId } from '$lib/database.js';
import Club from '$lib/models/Club';
import PendingClub from '$lib/models/PendingClub.js';
import type { User } from '@auth/sveltekit/providers/notion';
import { fail } from '@sveltejs/kit';
import mongoose from 'mongoose';
import { isValidObjectId } from 'mongoose';

export const load = async ({ locals }) => {
	const userId = (await locals.auth())?.user?.id ?? '';
	return {
		clubs: await Club.find()
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
			}),
		pendingClubs: await PendingClub.find()
			.populate<{ owner: User }>('owner')
			.lean()
			.exec()
			.then((clubs) => clubs.map(recursiveStringifyId))
	};
};

export const actions = {
	acceptClub: async ({ locals, request }) => {
		const session = await locals.auth();

		if (!session?.user?.isAdmin) {
			return fail(401);
		}

		if (!session?.user?.isAdmin) {
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

		if (!session?.user?.isAdmin) {
			return fail(401);
		}

		if (!session?.user?.isAdmin) {
			return fail(403);
		}

		const id = (await request.formData()).get('id');
		if (!isValidObjectId(id)) {
			return fail(400);
		}

		await PendingClub.findByIdAndDelete(id);
	}
};
