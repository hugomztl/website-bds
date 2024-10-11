<script lang="ts">
	import { enhance } from '$app/forms';

	export let user: {
		email: string;
	};
</script>

<main>
	<h1>Formulaire de Paiement</h1>
	<form method="POST" use:enhance>
		<!-- TODO: Autoremplissage du nom/prénom (mettre nom et prénom séparés dans la BDD/token?) -->
		<label>
			Prénom:
			<input class="input" type="text" name="firstName" required />
		</label>
		<!-- TODO: Autoremplissage du nom/prénom (mettre nom et prénom séparés dans la BDD/token?) -->
		<label>
			Nom:
			<input class="input" type="text" name="lastName" required />
		</label>
		<label>
			Email:
			<input class="input" type="email" name="email" value={user.email} disabled required />
		</label>
		<label>
			Date de Naissance:
			<input class="input" type="date" name="dateOfBirth" required />
		</label>
		<!-- TODO: Icone chargement -->
		<button type="submit">Payer</button>
	</form>
</main>

<style>
	main {
		max-width: 600px;
		margin: auto;
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 8px;
	}
	label {
		display: block;
		margin-bottom: 0.5rem;
	}
	input {
		width: 100%;
		padding: 0.5rem;
		margin-bottom: 1rem;
	}
	button {
		padding: 0.5rem 1rem;
		background-color: #28a745;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}
	button:hover {
		background-color: #218838;
	}
</style>
