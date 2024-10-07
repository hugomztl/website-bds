import { isAdmin } from '$lib/authutil.js';
import BlogPost from '$lib/models/BlogPost';

export const prerender = false;

export const load = async ({}) => {
	console.info('Getting posts!');
	const posts = await BlogPost.find()
		.exec()
		.then((posts) => posts.map((post) => post.toObject({ flattenObjectIds: true })));

	return { posts };
};

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

		return { success: true };
	}
};
