<script lang="ts">
	import { page } from '$app/stores';
</script>

<main>
	<h1>Erreur <span class="error-code">{$page.status}</span></h1>
	<p>Une erreur s'est produite : <b>{$page.error?.message}</b></p>
	<a class="home" href="/">Retour à l'accueil</a>
</main>

<style>
	main {
		margin: auto;
	}

	h1,
	p {
		font-weight: 400;
	}

	.error-code {
		color: coral;
		font-weight: bold;
	}

	.home {
		color: blueviolet;
		font-weight: bold;
		text-decoration: underline;
	}
</style>
