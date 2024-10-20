<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
	$: event = data.event;
</script>

<h1>Modifier l'évènement</h1>

<form method="POST" action="/dashboard/events/?/updateEvent" use:enhance>
	<input type="hidden" name="id" value={event._id} />
	<div>
		<label for="title">Titre:</label>
		<input type="text" id="title" name="title" value={event.title} required />
	</div>
	<div>
		<label for="description">Contenu:</label>
		<textarea id="description" name="description" required>{event.description}</textarea>
	</div>
	<div>
		<label for="date">Date:</label>
		<input
			type="date"
			id="date"
			name="date"
			value={event.date.toISOString().split('T')[0]}
			required
		/>
	</div>
	<div>
		<label for="price">Prix:</label>
		<input type="text" id="price" name="price" value={event.price} required />
	</div>
	<div>
		<label for="tag">Tag:</label>
		<input type="text" id="tag" name="tag" value={event.tag} required />
	</div>
	<button type="submit">Mettre à jour l'évènement</button>
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
