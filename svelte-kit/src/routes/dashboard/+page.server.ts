import Event from '$lib/models/Event';
import BlogPost from '$lib/models/BlogPost';
import Club from '$lib/models/Club';
import PendingClub from '$lib/models/PendingClub';
import { type UserType } from '$lib/models/User';
import { recursiveStringifyId } from '$lib/database';

export const load = async ({ parent, depends }) => {
	await parent();

	depends('dashboard:all');

	const events = await Event.find().then((events) =>
		events.map((event) => event.toObject({ flattenObjectIds: true }))
	);
	const posts = await BlogPost.find()
		.populate<{ createdBy: UserType }>('createdBy')
		.then((posts) => posts.map((post) => post.toObject({ flattenObjectIds: true })));

	const clubs = await Club.find()
	.populate<{ owner: UserType }>('owner')
	.then((clubs) =>
		clubs.map((club) => club.toObject({ flattenObjectIds: true }))
	);

	return {
		events,
		posts,
		clubs,
		pendingClubs: await PendingClub.find()
			.populate<{ owner: UserType }>('owner')
			.lean()
			.exec()
			.then((clubs) => clubs.map(recursiveStringifyId))
	};
};
