import { isAdmin } from '$lib/authutil.js';
import BlogPost from '$lib/models/BlogPost';
import { error, redirect } from '@sveltejs/kit';

export const prerender = false;

export const actions = {
	async updatePost({ request, locals, params }) {
		const formData = await request.formData();
		const title = formData.get('title');
		const content = formData.get('content');

		const session = await locals.auth();
		if (!isAdmin(session) || !session?.user?.id) {
			throw error(403, "Vous n'êtes pas autorisé à modifier un post de blog");
		}

		if (!title || !content) {
			throw error(400, 'Le titre et le contenu sont requis');
		}

		const updatedPost = await BlogPost.findByIdAndUpdate(
			params.id,
			{ title, content },
			{ new: true, runValidators: true }
		);

		if (!updatedPost) {
			throw error(404, 'Post non trouvé');
		}

		return redirect(303, '/blog');
	}
};
