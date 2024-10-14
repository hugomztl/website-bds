<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	export let data;

	const { form, enhance, errors, constraints } = superForm(data.form);
</script>

<main>
	<h1>Créer un club</h1>

	<form method="POST" use:enhance>
		<input
			type="text"
			placeholder="name"
			name="name"
			aria-invalid={$errors.name ? 'true' : undefined}
			bind:value={$form.name}
			{...$constraints.name}
		/>
		<input
			type="text"
			placeholder="description"
			name="description"
			aria-invalid={$errors.description ? 'true' : undefined}
			bind:value={$form.description}
			{...$constraints.description}
		/>

		{#if data.session?.user?.isAdmin}
			<label>
				<span>Président</span>
				<select class="select" name="owner" bind:value={$form.owner}>
					<option value="">Aucun président assigné</option>
					{#each data.users as user}
						<option value={user._id}>{user.email}</option>
					{/each}
				</select>
			</label>
		{/if}

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
