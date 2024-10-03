<script>
	import { page } from '$app/stores';
	import { SignIn } from '@auth/sveltekit/components';
	let email = $page.url.searchParams.get('email') || '';
</script>

<main id="app">
	<h1>Se connecter</h1>

	{#if $page.form?.taken}
		<p class="error">Cette adresse e-mail est déjà utilisée.</p>
	{/if}
	<SignIn provider="credentials">
		<svelte:fragment slot="credentials">
			<input type="email" name="email" placeholder="Mail viacesi" value={email} />

			<br />

			<input type="password" name="password" placeholder="Mot de passe" />

			<br />
		</svelte:fragment>
		<span slot="submitButton">Se connecter</span>
	</SignIn>
</main>
