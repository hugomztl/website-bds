<script lang="ts">
	import { CartaViewer } from 'carta-md';
	import { carta } from '$lib/carta';

	export let data;
	$: posts = data.posts;
</script>

<h1 class="h1 my-8 text-center">Blog du BDS</h1>

<div class="container mx-auto mt-10 flex flex-col gap-8">
	{#each posts as post}
		<div class="rounded-token bg-surface-300-600-token text-surface-600-300-token p-4 shadow-md">
			<h2>{post.title}</h2>
			<span>Posté le {post.createdAt.toLocaleDateString()}</span>
			<CartaViewer {carta} value={post.content} />
		</div>
	{:else}
		<h2>Le BDS n'a encore rien posté 😵</h2>
	{/each}
</div>
