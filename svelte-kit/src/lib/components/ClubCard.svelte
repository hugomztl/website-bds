<script lang="ts">
	import * as Card from '$lib/components/ui/card/index';
	import { Button } from '$lib/components/ui/button/index';
	import { SquarePen } from 'lucide-svelte';

	export let club;
	//export let user;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>{club.name}</Card.Title>
		<Card.Description>
			{#if club.owner}
				Président :
				<Button href="/profile/{club.owner._id}" variant="link" class="px-0">
					{club.owner.fullName}
				</Button>
			{:else}
				<p>Actuellement sans président</p>
			{/if}</Card.Description
		>
	</Card.Header>
	<Card.Content>
		{club.description}
	</Card.Content>
	<Card.Footer class="flex justify-end">
		<!-- {#if user.isAdmin} -->
		<Button href={`/clubs/${club._id}/manage`} variant="ghost"
			><SquarePen class="mr-1" />Modifier</Button
		>
		<!-- {:else}
			<Button href={`/clubs/${club._id}`} variant="ghost"><SquarePen class="mr-1" />Voir</Button>
		{/if} -->
	</Card.Footer>
</Card.Root>
