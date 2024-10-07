import { error } from '@sveltejs/kit';
import BlogPost from '$lib/models/BlogPost';

export const load = async ({ params }) => {
	try {
		const post = await BlogPost.findById(params.id)
			.exec()
			.then((post) => {
				if (!post) {
					throw error(404, 'Post non trouvé');
				}
				return post.toObject({ flattenObjectIds: true });
			});

		return { post };
	} catch (err) {
		console.error('Error loading blog post:', err);
		throw error(500, 'Erreur lors du chargement du post');
	}
};
