<script lang="ts">
	import type { EventType } from '$lib/models/Event';
	import { tags } from '$lib/models/schemas/zEvent';
	import { dateProxy, type SuperForm } from 'sveltekit-superforms';

	export let title: string;
	export let id = undefined;
	export let superForm: SuperForm<Omit<EventType, '_id'>, unknown>;

	$: action =
		id !== undefined ? '/dashboard/events/?/updateEvent' : '/dashboard/events/?/createEvent';

	const { errors, enhance, form } = superForm;

	const proxyDate = dateProxy(superForm, 'date', { format: 'date', taint: false });

	function getTommorrow(): string {
		const date = new Date();
		date.setDate(date.getDate() + 1);

		return date.toISOString().slice(0, 10);
	}
</script>

<form method="POST" {action} use:enhance>
	<input type="hidden" name="id" value={id} />
	<h2 class="h2">{title}</h2>
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
	<slot name="button" />
</form>
