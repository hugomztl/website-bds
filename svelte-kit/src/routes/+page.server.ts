import BlogPost from '$lib/models/BlogPost';
import type { UserType } from '$lib/models/User';
import type { EventType } from '$lib/models/Event';

export async function load({ fetch }) {
	try {
		const posts = await BlogPost.find()
		.populate<{ createdBy: UserType }>('createdBy')
		.sort({ createdAt: -1 }).limit(5);

		const events: EventType[] = await (
			await fetch(
				'/api/event?' +
					new URLSearchParams({
						date: new Date().toISOString(),
						weekRange: 10 + ''
					})
			)
		).json();
		return {
			posts: posts.map((post) => post.toObject({ flattenObjectIds: true })),
			events
		};
	} catch (error) {
		console.error('Error fetching blog posts or events:', error);
		return {
			posts: [],
			events: []
		};
	}
}
