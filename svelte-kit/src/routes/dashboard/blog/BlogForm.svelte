<script lang="ts">
	import type { Types } from 'mongoose';
	import { MarkdownEditor } from 'carta-md';
	import { carta } from '$lib/carta';
	import { enhance } from '$app/forms';

	// Component default theme
	import 'carta-md/default.css';
	import type { BlogPostType } from '$lib/models/BlogPost';

	export let post: BlogPostType | undefined = undefined;

	$: action = post !== undefined ? `/dashboard/blog/?/updatePost` : '/dashboard/blog/?/createPost';
	$: button = post !== undefined ? 'Mettre à jour le post' : 'Créer le post';

	let content = post?.content ?? '';
</script>

<form method="POST" {action} use:enhance>
	<input type="hidden" name="id" value={post?._id ?? ''} />
	<input type="hidden" name="content" value={content} />
	<div>
		<label for="title">Titre:</label>
		<input type="text" id="title" name="title" value={post?.title ?? ''} required />
	</div>
	<MarkdownEditor {carta} bind:value={content} />
	<button type="submit">{button}</button>
</form>
