<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
	$: posts = data.posts;
</script>

<h1>Gestion du blog</h1>

<form method="POST" action="?/createPost" use:enhance>
	<h2>Créer un nouveau post</h2>
	<div>
		<label for="title">Titre:</label>
		<input type="text" id="title" name="title" required />
	</div>
	<div>
		<label for="content">Contenu:</label>
		<textarea id="content" name="content" required></textarea>
	</div>
	<button type="submit">Créer le post</button>
</form>

{#each posts as post}
	<div class="post">
		<h2>{post.title}</h2>
		<span>Posté le {post.createdAt.toLocaleDateString()}</span>
		<p>{post.content}</p>
		<form
			method="POST"
			action="?/deletePost"
			use:enhance={({ cancel }) => {
				if (!confirm('Voulez-vous vraiment supprimer ce post ?')) {
					cancel();
				}
			}}
		>
			<input type="hidden" name="postId" value={post._id} />
			<button type="submit">Supprimer</button>
		</form>
	</div>
{:else}
	<h2>Le BDS n'a encore rien posté 😵</h2>
{/each}

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

	.post {
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 1rem;
		box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
	}
</style>
