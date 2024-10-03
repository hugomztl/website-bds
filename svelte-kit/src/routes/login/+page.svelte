<script lang="ts">
	import { SignIn } from '@auth/sveltekit/components';
</script>

<main id="app">
	<h1>S'identifier</h1>
	<SignIn provider="credentials">
		<svelte:fragment slot="credentials">
			<input type="email" name="email" placeholder="Mail viacesi" />
			<input type="password" name="password" placeholder="Mot de passe" />
		</svelte:fragment>
		<span slot="submitButton">Se connecter</span>
	</SignIn>

	<br />

	<a href="/"> Retour à l'accueil </a>
</main>

<style>
	input {
		border-radius: 8px;
		border: 1px solid transparent;
		padding: 0.6em 1.2em;
		font-size: 1em;
		font-weight: 500;
		font-family: inherit;
		background-color: #1a1a1a;
		transition: border-color 0.25s;
		color: rgba(255, 255, 255, 0.87);
		margin-bottom: 0.5em;
	}

	input:hover {
		border-color: #646cff;
	}

	input:focus {
		outline: 4px auto -webkit-focus-ring-color;
	}

	@media (prefers-color-scheme: light) {
		input {
			background-color: #f9f9f9;
			color: #213547;
		}
	}
</style>
