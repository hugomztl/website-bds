<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { ChevronLeft } from 'lucide-svelte';
	export let data;

	$: post = data.post;
</script>

<section class="grid-row-1 container mt-[5%] grid grid-cols-5 gap-4">
	<Button on:click={() => history.back()} variant="secondary" class="h-full"
		><ChevronLeft class="mr-1" />Retour</Button
	>
	<div class="col-span-4">
		<Card.Title>{post.title}</Card.Title>
		<Separator class="my-4" />
		<Card.Description
			>Posté le {new Date(post.createdAt).toLocaleDateString()} par {post.createdBy}</Card.Description
		>
	</div>
</section>

<article class="container mt-4">
	<Card.Root class="mt-4">
		<Card.Content>
			<div>{@html post.content}</div>
		</Card.Content>
		<Card.Footer></Card.Footer>
	</Card.Root>
</article>
