<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from "$lib/components/ui/card";
	import * as Table from "$lib/components/ui/table";
	import { ChevronRight } from 'lucide-svelte';
	export let data;
	$: posts = data.posts;
</script>

<div class="container mx-auto mt-[5%] flex flex-col gap-8">
	{#each posts as post}
	<Card.Root>
		<Card.Header>
		  <Card.Title>{post.title}</Card.Title>
		  <Card.Description>Posté le {post.createdAt.toLocaleDateString()} par {post.createdBy}</Card.Description>
		</Card.Header>
		<Card.Content>
		  <p>{@html post.content}</p>
		</Card.Content>
		<Card.Footer class="flex justify-end">
		  <Button href={`/blog/${post._id}`} variant="secondary">Voir plus<ChevronRight class="ml-1"/></Button>
		</Card.Footer>
	</Card.Root>
	  
	{:else}
		<h2>Le BDS n'a encore rien posté 😵</h2>
	{/each}

</div>