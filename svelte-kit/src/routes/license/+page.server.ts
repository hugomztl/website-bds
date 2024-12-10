import User from '$lib/models/User';
import { redirect } from '@sveltejs/kit';
import { error } from 'console';

export const load = async ({ params, parent }) => {
	const id = (await parent()).session?.user?.id;

	if (!id) throw redirect(303, '/auth');

	const user = await User.findById(params.id).lean().exec();

	if (!user) {
		return error(404, 'Utilisateur non trouvé');
	}

	if (!user.license) {
		throw redirect(303, '/ffsu');
	}

	return {
		user: {
			...user,
			_id: user?._id.toString()
		}
	};
};
