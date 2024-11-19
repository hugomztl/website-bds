<script lang="ts">
	import { enhance } from '$app/forms';
	import { carta } from '$lib/carta';
	import type { EventType } from '$lib/models/Event';
	import { CartaViewer } from 'carta-md';
	import { Trash } from 'lucide-svelte';

	export let event: EventType;
</script>

<li>
	<a class="flex" href="/dashboard/events/{event._id}">
		<h3>{event.title}</h3>
		<CartaViewer {carta} value={event.description} />
		<p>Date: {event.startDate}</p>
		<p>Prix: {event.price}</p>
		<p>Tag: {event.tag}</p>
	</a>
	<form
		action="/dashboard/events/?/deleteEvent"
		method="POST"
		use:enhance={({ cancel }) => {
			if (!confirm('Voulez-vous vraiment supprimer cet évènement ?')) cancel();
		}}
	>
		<input type="hidden" name="id" value={event._id} />
		<button>
			<Trash />
		</button>
	</form>
</li>
