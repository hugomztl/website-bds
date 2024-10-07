<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	const club = data.club;
</script>

<!-- TODO: Ajouter un popup pour afficher le résultat de la modification d'un club -->
<main id="app">
	<h1>Modifier un club</h1>

	{#if form?.message}
		<p>{form.message}</p>
	{/if}

	<form method="POST" action="?/update" use:enhance>
		<input type="text" placeholder="name" name="name" required value={club.name} />
		<input
			type="text"
			placeholder="description"
			name="description"
			required
			value={club.description}
		/>

		<label>
			<span>Président</span>
			<select class="select" name="owner" id="owner" value={club.owner}>
				<option value="">Aucun président assigné</option>
				{#each data.users as user}
					<option value={user._id}>{user.email}</option>
				{/each}
			</select>
		</label>

		<button type="submit">Mettre à jour le club</button>
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
