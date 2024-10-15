import Club, { type ClubType } from '$lib/models/Club';
import User from '$lib/models/User.js';
import { redirect } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import zClubForm from './zClubForm';
import { zod } from 'sveltekit-superforms/adapters';
import PendingClub from '$lib/models/PendingClub';

export const prerender = false;

export const load = async ({}) => {
	const form = await superValidate(zod(zClubForm));

	return {
		form,
		users: await User.find()
			.lean()
			.exec()
			.then((users) =>
				users.map((user) => ({
					...user,
					_id: user._id.toString()
				}))
			)
	};
};

export const actions = {
	async default({ request, locals }) {
		const session = await locals.auth();

		if (!session || !session.user) {
			return fail(401, {
				message: 'Vous devez être connecté pour effectuer une demande de création de club.'
			});
		}

		const form = await superValidate(request, zod(zClubForm));
		if (!form.valid) {
			return fail(400, { form });
		}

		const { name, description, logo } = form.data;
		let club: InstanceType<typeof Club> | InstanceType<typeof PendingClub>; // Assigning type to club
		if (session.user.isAdmin) {
			club = new Club({
				name,
				description,
				logo,
				owner: session.user.id
			});
		} else {
			club = new PendingClub({
				name,
				description,
				logo,
				owner: form.data.owner
			});
		}

		try {
			await club.save();
		} catch (error) {
			return fail(400, { success: false });
		}

		return redirect(303, '/clubs');
	}
};
