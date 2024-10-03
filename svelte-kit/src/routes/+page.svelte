<script lang="ts">
	import { page } from '$app/stores';
	import { SignOut } from '@auth/sveltekit/components';
</script>

<main id="app">
	<div>
		<img src="logo-bds.png" alt="Logo BDS" draggable="false" />
	</div>

	<h1>Bientôt, le site du BDS ici 🗿</h1>

	{#if $page.data.session}
		{@const user = $page.data.session?.user}
		<div class="user-info">
			<span>Bienvenue {user?.email}</span>
		</div>
		<SignOut />
	{:else}
		<a href="/signin"><button>Se connecter</button></a>
		<a href="/register"><button>Créer un compte</button></a>
	{/if}
</main>

<style>
	:global(*) {
		user-select: none;
	}

	img {
		width: 20rem;
	}

	.user-info > * {
		vertical-align: middle;
	}
</style>
