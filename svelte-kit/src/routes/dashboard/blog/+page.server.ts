import { isAdmin } from '$lib/authutil.js';
import BlogPost from '$lib/models/BlogPost';
import { fail, redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export const prerender = false;

export const actions = {
	async createPost({ request, locals }) {
		const formData = await request.formData();
		const title = formData.get('title');
		const content = formData.get('content');

		const session = await locals.auth();
		if (!isAdmin(session) || !session?.user?.id) {
			return {
				status: 403,
				body: { message: "Vous n'êtes pas autorisé à créer un post de blog" }
			};
		}

		if (!title || !content) {
			return {
				status: 400,
				body: { message: 'Le titre et le contenu sont requis' }
			};
		}

		const post = new BlogPost({ title, content, createdBy: session.user.id });
		await post.save();

		return redirect(303, '/dashboard');
	},
	async deletePost({ request, locals }) {
		const formData = await request.formData();
		const postId = formData.get('postId');

		const session = await locals.auth();
		if (!isAdmin(session) || !session?.user?.id) {
			return {
				status: 403,
				body: { message: "Vous n'êtes pas autorisé à supprimer un post de blog" }
			};
		}

		await BlogPost.findByIdAndDelete(postId);
		return { success: true };
	},
	async updatePost({ request, locals, params }) {
		const formData = await request.formData();
		const title = formData.get('title');
		const content = formData.get('content');
		const id = formData.get('id');

		const session = await locals.auth();
		if (!isAdmin(session) || !session?.user?.id) {
			return fail(403);
		}

		if (!title || !content || typeof id !== 'string' || !ObjectId.isValid(id)) {
			return fail(400);
		}

		const updatedPost = await BlogPost.findByIdAndUpdate(
			id,
			{ title, content },
			{ new: true, runValidators: true }
		);

		if (!updatedPost) {
			return fail(404);
		}

		return redirect(303, '/blog');
	}
};
