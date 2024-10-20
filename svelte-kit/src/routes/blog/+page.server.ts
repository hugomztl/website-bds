import BlogPost from '$lib/models/BlogPost.js';

export const load = async ({}) => {
	const posts = await BlogPost.find()
		.exec()
		.then((posts) => posts.map((post) => post.toObject({ flattenObjectIds: true })));

	return { posts };
};
