<script lang="ts">
	import zEvent from '$lib/models/schemas/zEvent.js';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import EventForm from '../EventForm.svelte';

	export let data;

	const _superForm = superForm(data.form, {
		customValidity: true,
		validators: zod(zEvent),
		validationMethod: 'onblur',
		autoFocusOnError: false,
		scrollToError: false
	});

	const { capture, restore } = _superForm;
	export const snapshot = { capture, restore };
</script>

<h1>Modifier l'évènement</h1>

<div class="container mx-auto">
	<EventForm superForm={_superForm} title="Modifier un évènement" id={data.event._id}>
		<button slot="button" type="submit" class="btn variant-filled-success variant-outline-primary">
			Modifier l'évènement
		</button>
	</EventForm>
</div>
