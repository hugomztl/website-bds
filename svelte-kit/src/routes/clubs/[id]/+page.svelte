<script lang="ts">
	export let data;
</script>

<main id="app">
	<h1>{data.club.name}</h1>
	<p>{data.club.description}</p>

	<h2>Derniers posts du club</h2>
	{#each data.club.posts as post}
		<p>{post.title}</p>
	{:else}
		<p>Ce club n'a encore publié aucun post.</p>
	{/each}
</main>
