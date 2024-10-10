<script lang="ts">
	import Payment from './Payment.svelte';

	export let data;
	export let form;

	const user = data.user;
</script>

{#if user.license}
	<h2 class="h2">Vous êtes licensié!</h2>
	<a class="anchor" href="/">Retourner à l'accueil</a>
{:else}
	<h2 class="h2">Acheter sa license FFSU</h2>

	<br />

	<div class="container">
		{#each form?.errors ?? [] as error}
			<p class="variant-soft-error p-2">{error.message}</p>
		{/each}
	</div>
	<Payment {user} />
{/if}
