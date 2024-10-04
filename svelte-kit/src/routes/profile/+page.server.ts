import User from '$lib/models/User';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const session = await locals.auth();

	if (!session) {
		return redirect(302, '/signin');
	}

	const maybeMongooseUser = await User.findOne({ email: session.user!.email }).lean().exec();

	return {
		session,
		user: {
			...maybeMongooseUser,
			_id: maybeMongooseUser?._id.toString()
		}
	};
};
