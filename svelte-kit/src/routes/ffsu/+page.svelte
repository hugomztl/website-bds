<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import Payment from './Payment.svelte';

	export let data;

	const user = data.user;
	const _superForm = superForm(data.form);
</script>

{#if user.license}
	<h2 class="h2">Vous êtes licensié!</h2>
	<a class="anchor" href="/">Retourner à l'accueil</a>
{:else}
	<h2 class="h2">Acheter sa license FFSU</h2>

	<br />

	<Payment {user} form={_superForm} />
{/if}
