<script>
	import { page } from '$app/stores';
	import { SignIn } from '@auth/sveltekit/components';

	let email = $page.form?.email || '';
	let password = '';
</script>

<main class="flex h-full flex-col items-center justify-center">
	<h1 class="h1">Se connecter</h1>
	<span>ou <a class="anchor" href="/register">créer un compte</a></span>
	<SignIn class="mt-6 flex w-[25%] flex-col items-center" provider="credentials">
		<svelte:fragment slot="credentials">
			{#if $page.form?.error}
				<p class="alert variant-filled-error mb-6 p-4 px-6">{$page.form.error}</p>
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
				bind:value={password}
			/>
		</svelte:fragment>

		<svelte:fragment slot="submitButton">
			<button
				class="btn variant-form-material border-surface-500-400-token mt-2 px-10"
				type="submit">Se connecter</button
			>
		</svelte:fragment>
	</SignIn>
</main>
