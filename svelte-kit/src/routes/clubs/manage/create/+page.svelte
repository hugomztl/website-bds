<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
	export let form;
</script>

<!-- TODO: Ajouter un popup pour afficher le résultat de la création d'un club -->
<main id="app">
	<h1>Créer un club</h1>

	{#if form?.success === false}
		<p>Erreur lors de la création du club</p>
	{/if}

	<form method="POST" use:enhance>
		<input type="text" placeholder="name" name="name" />
		<input type="text" placeholder="description" name="description" />

		<label>
			<span>Président</span>
			<select class="select" name="owner" id="owner">
				<option value="">Aucun président assigné</option>
				{#each data.users as user}
					<option value={user._id}>{user.email}</option>
				{/each}
			</select>
		</label>

		<button type="submit">Créer un club</button>
	</form>
</main>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: auto;
	}
</style>
