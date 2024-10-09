import User from '$lib/models/User';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const maybeMongooseUser = await User.findById(params.id).lean().exec();

	if (!maybeMongooseUser) {
		return error(404, 'Utilisateur non trouvé');
	}

	return {
		user: {
			...maybeMongooseUser,
			_id: maybeMongooseUser?._id.toString()
		}
	};
};
