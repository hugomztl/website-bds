<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
	$: post = data.post;
</script>

<h1>Modifier le post</h1>

<form method="POST" action="dashboard/blog/?updatePost" use:enhance>
	<div>
		<label for="title">Titre:</label>
		<input type="text" id="title" name="title" value={post.title} required />
	</div>
	<div>
		<label for="content">Contenu:</label>
		<textarea id="content" name="content" required>{post.content}</textarea>
	</div>
	<button type="submit">Mettre à jour le post</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	form div {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	form button {
		align-self: flex-start;
	}

	textarea {
		resize: vertical;
		min-height: 100px;
		min-width: 100%;
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-family: inherit;
		font-size: 1rem;
	}
</style>
