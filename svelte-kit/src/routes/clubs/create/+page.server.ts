import Club from '$lib/models/Club';
import User from '$lib/models/User.js';
import { error, fail, redirect } from '@sveltejs/kit';

export const prerender = false;

export const load = async ({}) => {
	return {
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
	async default({ request }) {
		const formData = await request.formData();
		const name = formData.get('name');
		const description = formData.get('description');
		const logo = formData.get('logo');
		// Puisque l'owner est optionnel, on le définit explicitement à undefined s'il est vide (premier choix)
		const owner = formData.get('owner') || undefined;

		try {
			const club = new Club({
				name,
				description,
				logo,
				owner
			});

			await club.save();
		} catch (error) {
			return fail(400, { success: false });
		}

		return redirect(303, '/clubs');
	}
};
