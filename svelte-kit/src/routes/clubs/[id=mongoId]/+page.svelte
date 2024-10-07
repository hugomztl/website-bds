<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
</script>

<main id="app">
	<h1>{data.club.name}</h1>
	<p>{data.club.description}</p>

	{#if data.member?.pending === false}
		<p>Tu es dans ce club!</p>
	{:else if data.member?.pending === true}
		<p>Tu es en attente de validation.</p>
	{:else}
		<form method="POST" action="?/join" use:enhance>
			<button disabled={!data.member}>Rejoindre le club</button>
		</form>
	{/if}

	<h2>Derniers posts du club</h2>
	{#each data.club.posts as post}
		<p>{post.title}</p>
	{:else}
		<p>Ce club n'a encore publié aucun post.</p>
	{/each}
</main>
