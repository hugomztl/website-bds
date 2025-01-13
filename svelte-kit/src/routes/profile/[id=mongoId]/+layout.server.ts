import { recursiveStringifyId } from '$lib/database.js';
import Club from '$lib/models/Club';
import User from '$lib/models/User';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const maybeMongooseUser = await User.findById(params.id).lean().exec();

	if (!maybeMongooseUser) {
		return error(404, 'Utilisateur non trouvé');
	}

	const clubs = await Club.find({
		$or: [
			{ owner: maybeMongooseUser._id },
			{ 'members.user': maybeMongooseUser._id }
		]
	}).lean().exec();

	return {
		user: {
			...maybeMongooseUser,
			_id: maybeMongooseUser?._id.toString()
		},
		clubs: recursiveStringifyId(clubs)
	}
};
