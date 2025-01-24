<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Card from "$lib/components/ui/card";
	import type { EventType } from '$lib/models/Event';
	import { Trash } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import {Separator} from '$lib/components/ui/separator';

	export let event: EventType;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>{event.title}</Card.Title>
		<Card.Description>
		{#if event.tag}
			{event.tag}
		{/if}
		</Card.Description>
	</Card.Header>
	<Card.Content>
		Description :
		{event.description}
		<br />
		<br />
		Prix : {event.price}€
	</Card.Content>
	<Card.Footer class="flex justify-between">
		<span>Du <b>{new Date(event.startDate).toLocaleDateString('fr-FR')}</b> au <b>{new Date(event.endDate).toLocaleDateString('fr-FR')}</b></span>
		<div class="flex">
			<form
			action="/dashboard/events/?/deleteEvent"
			method="POST"
			use:enhance={({ cancel }) => {
				if (!confirm('Voulez-vous vraiment supprimer cet évènement ?')) cancel();
			}}
		>
			<input type="hidden" name="id" value={event._id} />
			<Button variant="ghost" type="submit">
				<Trash />
			</Button>
		</form>
		<Separator orientation="vertical" />
		<Button href="/dashboard/events/{event._id}" variant="ghost">Modifier</Button>
		</div>
	</Card.Footer>
</Card.Root>
