<script lang="ts">
	import { page } from '$app/stores';
	import { SignOut } from '@auth/sveltekit/components';

	export let data;
	$: posts = data.posts;
</script>

<main id="app">
	<div>
		<img src="logo-bds.png" alt="Logo BDS" draggable="false" />
	</div>

	<h1>Bientôt, le site du BDS ici 🗿</h1>

	{#if $page.data.session}
		{@const user = $page.data.session?.user}
		<div class="user-info">
			<span>Bienvenue <a href="/profile">{user?.email}</a></span>
		</div>
		<SignOut>
			<span slot="submitButton">Se déconnecter</span>
		</SignOut>
	{:else}
		<a href="/signin"><button tabindex="-1">Se connecter</button></a>
		<a href="/register"><button tabindex="-1">Créer un compte</button></a>
	{/if}

	<h1>Actualités du BDS</h1>
	{#each posts as post}
		<div class="post">
			<a href="/blog/{post._id}">
				<h2>{post.title}</h2>
			</a>
			<span>Posté le {post.createdAt.toLocaleDateString()}</span>
			<p>{post.content}</p>
		</div>
	{/each}
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
