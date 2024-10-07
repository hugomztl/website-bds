import BlogPost from '$lib/models/BlogPost';

export async function load() {
	try {
		const posts = await BlogPost.find().sort({ createdAt: -1 });
		return {
			posts: posts.map((post) => post.toObject({ flattenObjectIds: true }))
		};
	} catch (error) {
		console.error('Error fetching blog posts:', error);
		return {
			posts: []
		};
	}
}
