<script>
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { signIn } from '@auth/sveltekit/client';

	let email = $page.url.searchParams.get('email') || '';
</script>

<main id="app">
	<h1>Créer un compte</h1>

	<p>
		<a href="/">Retour à l'accueil</a><br />
		<a href="/signin">Se connecter</a>
	</p>

	{#if $page.form?.taken}
		<p class="error">Cette adresse e-mail est déjà utilisée.</p>
	{/if}

	<form
		action="/register"
		method="POST"
		use:enhance={() => {
			return async ({ formData }) => {
				signIn('credentials', {
					email: formData.get('email'),
					password: formData.get('password'),
					callbackUrl: '/'
				});
			};
		}}
	>
		{#if $page.form?.invalid || $page.form?.missing}
			<p class="error">Entrez une adresse e-mail viacesi.</p>
		{/if}
		<input type="email" name="email" placeholder="Mail viacesi" value={email} />

		<br />

		{#if $page.form?.password_no_match}
			<p class="error">Les mots de passe ne correspondent pas.</p>
		{/if}
		<input type="password" name="password" placeholder="Mot de passe" />
		<input type="password" name="password_confirm" placeholder="Confirmer le mot de passe" />

		<br />

		<button>Créer un compte</button>
	</form>
</main>
