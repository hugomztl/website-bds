<script lang="ts">
	import { page } from '$app/stores';
	import { promos, sports } from '$lib/enums';
	import { superForm } from 'sveltekit-superforms';

	export let data;

	const _superForm = superForm(data.form);

	const { form, enhance } = _superForm;
</script>

{#if $page.data.error}
	<p class="error">{$page.data.error}</p>
{/if}

<form method="POST" action="?/editProfile" use:enhance class="mt-[5%]">
	<div>
		<label for="fullName">Nom complet:</label>
		<input type="text" id="fullName" name="fullName" bind:value={$form.fullName} required />
	</div>

	<div>
		<label for="promo">Promo:</label>
		<select id="promo" name="promo" bind:value={$form.promo}>
			<option value="">Sélectionner une promo</option>
			{#each promos as promo}
				<option value={promo}>{promo}</option>
			{/each}
		</select>
	</div>

	<div>
		<p>Sports:</p>
		{#each sports as sport}
			<label>
				<input
					type="checkbox"
					name="sports"
					value={sport}
					bind:group={$form.sports}
					checked={$form.sports?.includes(sport)}
				/>
				{sport}
			</label>
		{/each}
	</div>

	<div>
		<label for="discord">Discord:</label>
		<input type="text" id="discord" name="discord" bind:value={$form.discord} />
	</div>

	<button type="submit">Enregistrer les modifications</button>
</form>
