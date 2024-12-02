<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Card from "$lib/components/ui/card";
	import * as Table from "$lib/components/ui/table";
	export let data;
	$: posts = data.posts;
</script>

<h1 class="h1 my-8 text-center">Blog du BDS</h1>

<div class="container mx-auto mt-10 flex flex-col gap-8">
	{#each posts as post}
	<Card.Root>
		<Card.Header>
		  <Card.Title>{post.title}</Card.Title>
		  <Card.Description>Posté le {post.createdAt.toLocaleDateString()}</Card.Description>
		</Card.Header>
		<Card.Content>
		  <p>{post.content}</p>
		</Card.Content>
		<Card.Footer>
		  <p>Card Footer</p>
		</Card.Footer>
	</Card.Root>
	  
	{:else}
		<h2>Le BDS n'a encore rien posté 😵</h2>
	{/each}

</div>