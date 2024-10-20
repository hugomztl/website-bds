import Event from '$lib/models/Event';
import BlogPost from '$lib/models/BlogPost';
import { type UserType } from '$lib/models/User';

export const load = async ({ parent, depends }) => {
	await parent();

	depends('dashboard:all');

	const events = await Event.find().then((events) =>
		events.map((event) => event.toObject({ flattenObjectIds: true }))
	);
	const posts = await BlogPost.find()
		.populate<{ createdBy: UserType }>('createdBy')
		.then((posts) => posts.map((post) => post.toObject({ flattenObjectIds: true })));

	return {
		events,
		posts
	};
};
