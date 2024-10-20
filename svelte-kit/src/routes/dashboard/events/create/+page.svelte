<script lang="ts">
	import zEvent, { tags } from '$lib/models/schemas/zEvent.js';
	import { dateProxy, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

	export let data;

	const { constraints, errors, enhance, form, capture, restore } = superForm(data.form, {
		customValidity: true,
		validators: zod(zEvent),
		validationMethod: 'onblur',
		autoFocusOnError: false,
		scrollToError: false
	});

	const proxyDate = dateProxy(form, 'date', { format: 'date', taint: false });

	export const snapshot = { capture, restore };

	function getTommorrow(): string {
		const date = new Date();
		date.setDate(date.getDate() + 1);

		return date.toISOString().slice(0, 10);
	}
</script>

<div class="container mx-auto">
	<form method="POST" action="/dashboard/events/?/createEvent" use:enhance>
		<h2 class="h2">Créer un nouvel évènement</h2>
		<div>
			<label for="title">Titre:</label>
			<input
				class="input"
				type="text"
				name="title"
				aria-invalid={$errors.title ? 'true' : undefined}
				bind:value={$form.title}
			/>
			{#if $errors.title}
				<p class="variant-filled-error">{$errors.title}</p>
			{/if}
		</div>
		<div>
			<label for="tag">Tag:</label>
			<select
				class="select"
				name="tag"
				aria-invalid={$errors.tag ? 'true' : undefined}
				bind:value={$form.tag}
			>
				{#each tags as tag}
					<option value={tag}>{tag}</option>
				{/each}</select
			>
			{#if $errors.tag}
				<p class="variant-filled-error">{$errors.tag}</p>
			{/if}
		</div>
		<div>
			<label for="date">Date:</label>
			<input
				class="input"
				type="date"
				name="date"
				aria-invalid={$errors.date ? 'true' : undefined}
				bind:value={$proxyDate}
				min={getTommorrow()}
			/>
			{#if $errors.date}
				<p class="variant-filled-error">{$errors.date}</p>
			{/if}
		</div>
		<div>
			<label for="description">Description:</label>
			<textarea
				class="textarea form-textarea"
				name="description"
				aria-invalid={$errors.description ? 'true' : undefined}
				bind:value={$form.description}
			></textarea>
			{#if $errors.description}
				<p class="variant-filled-error">{$errors.description}</p>
			{/if}
		</div>
		<div>
			<label for="price">Prix:</label>
			<input
				class="input"
				type="number"
				name="price"
				aria-invalid={$errors.price ? 'true' : undefined}
				bind:value={$form.price}
			/>
			{#if $errors.price}
				<p class="variant-filled-error">{$errors.price}</p>
			{/if}
		</div>
		<button type="submit" class="btn variant-filled-success variant-outline-primary">
			Créer l'évènement
		</button>
	</form>
</div>
