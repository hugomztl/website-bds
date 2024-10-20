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

<div class="container mx-auto">
	<EventForm superForm={_superForm} title="Créer un nouvel évènement">
		<button slot="button" type="submit" class="btn variant-filled-success variant-outline-primary">
			Créer l'évènement
		</button>
	</EventForm>
</div>
