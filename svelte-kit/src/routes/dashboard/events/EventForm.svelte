<script lang="ts">
	import type { EventType } from '$lib/models/Event';
	import { tags } from '$lib/models/schemas/zEvent';
	import { DateInput } from 'date-picker-svelte';
	import type { Types } from 'mongoose';
	import SuperDebug, { type SuperForm } from 'sveltekit-superforms';

	export let title: string;
	export let id: Types.ObjectId | undefined = undefined;
	export let superForm: SuperForm<Omit<EventType, '_id'>, unknown>;

	$: action =
		id !== undefined ? `/dashboard/events/${id}/?/updateEvent` : '/dashboard/events/?/createEvent';

	const { errors, enhance, form } = superForm;

	const locale = {
		months: [
			'janvier',
			'fevrier',
			'mars',
			'avril',
			'mai',
			'juin',
			'juillet',
			'août',
			'septembre',
			'octobre',
			'novembre',
			'decembre'
		],
		shortMonths: [
			'jan',
			'fev',
			'mar',
			'avr',
			'mai',
			'juin',
			'juil',
			'aou',
			'sep',
			'oct',
			'nov',
			'dec'
		],
		weekdays: ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'],
		weekStartsOn: 0
	};
</script>

<SuperDebug data={$form} />

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
	<div class="flex">
		<div>
			<label for="startDate">Date de début:</label>
			<DateInput
				required
				bind:value={$form.startDate}
				timePrecision="minute"
				format="yyyy-MM-dd HH:mm"
				placeholder={'2024-10-25 12:00'}
				{locale}
			/>
			{#if $errors.startDate}
				<p class="variant-filled-error">{$errors.startDate}</p>
			{/if}
		</div>
		<div>
			<label for="endDate">Date de fin:</label>
			<DateInput
				required
				valid
				min={$form.startDate ?? undefined}
				bind:value={$form.endDate}
				timePrecision="minute"
				format="yyyy-MM-dd HH:mm"
				placeholder={'2024-10-25 12:00'}
				{locale}
			/>
			{#if $errors.endDate}
				<p class="variant-filled-error">{$errors.endDate}</p>
			{/if}
		</div>
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
