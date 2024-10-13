<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { signIn } from '@auth/sveltekit/client';

	let email = $page.url.searchParams.get('email') || '';
</script>

<main class="flex h-full flex-col items-center justify-center">
	<h1 class="h1">Créer un compte</h1>
	<span>ou <a class="anchor" href="/signin">se connecter</a></span>
	<form
		class="mt-6 flex w-[25%] flex-col items-center"
		action="/register"
		method="POST"
		use:enhance={() => {
			return async ({ update, formData }) => {
				const signInResult = await signIn('credentials', {
					email: formData.get('email'),
					password: formData.get('password')
				});

				if (signInResult?.ok) {
					goto('/');
				} else {
					console.error("Une erreur s'est produite lors de la connexion.");
				}
			};
		}}
	>
		{#if $page.form?.taken}
			<p class="alert variant-filled-error mb-6 p-4 px-6">
				Cette adresse e-mail est déjà utilisée.
			</p>
		{/if}
		{#if $page.form?.invalid || $page.form?.missing}
			<p class="alert variant-filled-error mb-6 p-4 px-6">Entrez une adresse e-mail viacesi.</p>
		{/if}
		{#if $page.form?.password_no_match}
			<p class="alert variant-filled-error mb-6 p-4 px-6">
				Les mots de passe ne correspondent pas.
			</p>
		{/if}
		<input
			class="input variant-form-material border-surface-500-400-token my-2"
			type="email"
			name="email"
			placeholder="Mail viacesi"
			bind:value={email}
		/>
		<input
			class="input variant-form-material border-surface-500-400-token my-2"
			type="password"
			name="password"
			placeholder="Mot de passe"
		/>
		<input
			class="input variant-form-material border-surface-500-400-token my-2"
			type="password"
			name="password_confirm"
			placeholder="Confirmer le mot de passe"
		/>
		<button class="btn variant-form-material border-surface-500-400-token mt-2 px-10" type="submit"
			>Créer un compte</button
		>
	</form>
</main>
