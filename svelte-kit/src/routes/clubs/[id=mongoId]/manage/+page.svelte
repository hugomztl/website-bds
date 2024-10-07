<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	const club = data.club;
</script>

<!-- TODO: Ajouter un popup pour afficher le résultat de la modification d'un club -->
<main id="app">
	<div style="display: flex; justify-content: space-between; align-items: center; gap: 2rem;">
		<h1>Gérer le club</h1>
		{#if data.session?.user?.isAdmin}
			<form
				method="POST"
				action="?/delete"
				use:enhance={({ cancel }) => {
					if (!confirm('Voulez-vous vraiment supprimer ce club?')) {
						cancel();
					}
				}}
			>
				<button type="submit" class="delete-button">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
						<path fill="none" d="M0 0h24v24H0z" />
						<path
							d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
						/>
					</svg>
				</button>
			</form>
		{/if}
	</div>

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
					<option value={user._id}>{user.fullName} ({user.email})</option>
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

	.delete-button {
		padding: 0.4rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #ff4136;
		color: white;
		border: none;
		cursor: pointer;
		margin-top: 1rem;
	}

	.delete-button svg {
		fill: currentColor;
	}
</style>
