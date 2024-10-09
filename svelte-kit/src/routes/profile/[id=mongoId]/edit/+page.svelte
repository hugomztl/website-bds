<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	export let data;
	const user = data.user;
</script>

{#if $page.data.error}
	<p class="error">{$page.data.error}</p>
{/if}

<form method="POST" action="?/editProfile" use:enhance>
	<div>
		<label for="fullName">Nom complet:</label>
		<input type="text" id="fullName" name="fullName" value={user.fullName} required />
	</div>

	<div>
		<label for="promo">Promo:</label>
		<select id="promo" name="promo" value={user.promo}>
			<option value="">Sélectionner une promo</option>
			<option value="A1">A1</option>
			<option value="A2">A2</option>
			<option value="A3">A3</option>
			<option value="A4">A4</option>
			<option value="A5">A5</option>
		</select>
	</div>

	<div>
		<label>Sports:</label>
		{#each ['football', 'basketball', 'tennis', 'natation', 'athlétisme', 'volleyball', 'rugby', 'autre'] as sport}
			<label>
				<input type="checkbox" name="sports" value={sport} checked={user.sports?.includes(sport)} />
				{sport}
			</label>
		{/each}
	</div>

	<div>
		<label for="discord">Discord:</label>
		<input type="text" id="discord" name="discord" value={user.discord || ''} />
	</div>

	<button type="submit">Enregistrer les modifications</button>
</form>
