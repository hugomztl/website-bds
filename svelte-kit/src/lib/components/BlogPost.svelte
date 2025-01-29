<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { PenSquare, Trash } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import type { BlogPostType } from '$lib/models/BlogPost';
	import { invalidate } from '$app/navigation';

	export let post: BlogPostType;

	function deletePost(post: Pick<BlogPostType, 'title' | '_id'>) {
		if (!confirm(`Voulez-vous supprimer le post: ${post.title}`)) return;

		const data = new FormData();
		data.set('postId', post._id.toString());

		fetch('/dashboard/blog?/deletePost', { body: data, method: 'POST' }).then(() => {
			invalidate('dashboard:all');
		});
	}
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>{post.title}</Card.Title>
		<Card.Description>
			Poté le {new Date(post.createdAt).toLocaleDateString('fr-FR')} par <Button
				class="px-0"
				variant="link"
				href="/profile/{post.createdBy._id}">{post.createdBy.fullName}</Button
			>
		</Card.Description>
	</Card.Header>
	<Card.Content>
		Description :
		{post.content}
	</Card.Content>
	<Card.Footer class="flex justify-end space-x-2">
		<Button href="dashboard/blog/{post._id}" variant="secondary"><PenSquare /></Button>
		<Button variant="destructive" on:click={() => deletePost(post)}><Trash /></Button>
	</Card.Footer>
</Card.Root>
