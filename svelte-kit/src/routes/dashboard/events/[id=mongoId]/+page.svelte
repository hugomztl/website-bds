<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import zEvent from '$lib/models/schemas/zEvent.js';
	import { Trash } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import EventForm from '../EventForm.svelte';

	export let data;

	const _superForm = superForm(data.form, {
		customValidity: true,
		validators: zod(zEvent),
		validationMethod: 'onblur',
		autoFocusOnError: false,
		scrollToError: false,
		dataType: 'json'
	});
</script>

<h1>Modifier l'évènement</h1>

<div class="container mx-auto">
	<EventForm superForm={_superForm} title="Modifier un évènement" id={data.event?._id}>
		<div class="btn-group" slot="button">
			<button type="submit" class="btn variant-filled-success variant-outline-primary">
				Modifier l'évènement
			</button>
			<form
				action="/dashboard/events/?/deleteEvent"
				method="POST"
				use:enhance={({ cancel }) => {
					if (!confirm('Voulez-vous vraiment supprimer cet évènement ?')) cancel();
				}}
			>
				<input type="hidden" name="id" value={$page.params.id} />
				<button class="btn variant-filled-error variant-outline-primary">
					<Trash />
					<span>Supprimer l'évènement</span>
				</button>
			</form>
		</div>
	</EventForm>
</div>
