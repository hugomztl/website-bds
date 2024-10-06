<script>
	import { page } from '$app/stores';
</script>

<main id="app">
	<h1>Clubs:</h1>

	{#each $page.data.clubs as club}
		<div class="club">
			<h2>{club.name}</h2>

			<p>{club.description}</p>
			{#if club.owner}
				<p>Président: {club.owner.fullName}</p>
			{:else}
				<p>Actuellement sans président</p>
			{/if}
		</div>
	{:else}
		<h2>Aucun club pour le moment</h2>
	{/each}
</main>

<style>
	.club {
		border: 1px solid #ccc;
		padding: 1rem;
		margin: 1rem 0;
	}

	h2 {
		margin: 0;
	}
</style>
