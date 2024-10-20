import BlogPost from '$lib/models/BlogPost';
import { fail } from '@sveltejs/kit';

export const load = async ({ parent, params }) => {
	await parent();

	const id = params.id;
	const post = (await BlogPost.findById(id))?.toObject({ flattenObjectIds: true });

	if (!post) {
		return fail(404);
	}

	return { post };
};
