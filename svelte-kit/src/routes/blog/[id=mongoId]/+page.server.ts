import BlogPost from '$lib/models/BlogPost.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const post = await BlogPost.findById(params.id).exec();

    if (!post) {
        return error(404, 'Post introuvable');
    }

	return { post: post.toObject({ flattenObjectIds: true }) };
};
