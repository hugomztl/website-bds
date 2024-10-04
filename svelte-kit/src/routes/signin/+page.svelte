<script>
	import { page } from '$app/stores';
	import { signIn } from '@auth/sveltekit/client';

	let email = $page.url.searchParams.get('email') || '';
	let password = '';
</script>

<main id="app">
	<h1>Se connecter</h1>

	{#if $page.url.searchParams.get('error') === 'CredentialsSignin'}
		<p class="error">Nom d'utilisateur ou mot de passe invalide.</p>
	{/if}
	<form on:submit|preventDefault={() => signIn('credentials', { email, password })}>
		<input type="email" name="email" placeholder="Mail viacesi" bind:value={email} />
		<br />
		<input type="password" name="password" placeholder="Mot de passe" bind:value={password} />
		<br />
		<button type="submit"> Se connecter </button>
	</form>
</main>
