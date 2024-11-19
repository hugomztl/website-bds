import BlogPost from '$lib/models/BlogPost';
import { error } from '@sveltejs/kit';

export const load = async ({ parent, params }) => {
	await parent();

	const id = params.id;
	const post = (await BlogPost.findById(id))?.toObject({ flattenObjectIds: true });

	if (!post) {
		return error(404);
	}

	return { post };
};
