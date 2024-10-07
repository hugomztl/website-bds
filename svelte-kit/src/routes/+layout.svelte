<script>
	import { isAdmin } from '$lib/authutil';

	export let data;
</script>

<nav>
	<a href="/">Accueil</a>
	<a href="/clubs">Clubs</a>
	<a href="/signin">Connexion</a>
	<a href="/register">Inscription</a>

	{#if isAdmin(data.session)}
		<a class="adminLink" href="/blog">Gestion du blog</a>
	{/if}
</nav>

<slot />

<style>
	nav {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 1rem;
		background-color: #f0f0f0;
		width: 100%;
		gap: 1rem;
	}

	.adminLink {
		margin-left: auto;
		color: chocolate;
	}
</style>
