<script lang="ts">
	import { page } from '$app/stores';
	import SignOut from '$lib/components/auth/SignOut.svelte';
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
		<a href="/login">
			<button>Se connecter</button>
		</a>
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

	.user-avatar {
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
	}
</style>
