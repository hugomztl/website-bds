<script>
	import { enhance } from '$app/forms';
</script>

<div class="container mx-auto">
	<form method="POST" action="/dashboard/blog/?/createPost" use:enhance>
		<h2 class="h2">Créer un nouveau post</h2>
		<div>
			<label for="title">Titre:</label>
			<input class="input" type="text" name="title" required />
		</div>
		<div>
			<label for="content">Contenu:</label>
			<textarea class="textarea form-textarea" name="content" required></textarea>
		</div>
		<button type="submit" class="btn variant-filled-success variant-outline-primary">
			Créer le post
		</button>
	</form>
</div>
