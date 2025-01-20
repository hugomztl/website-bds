<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import Payment from './Payment.svelte';
	import Footer from '$lib/components/footer.svelte';

	export let data;

	const user = data.user;
	const _superForm = superForm(data.form);

	export const snapshot = {
		capture: _superForm.capture,
		restore: _superForm.restore
	};
</script>

{#if user.license}
	<h2 class="h2">Vous êtes licensié!</h2>
	<a class="anchor" href="/">Retourner à l'accueil</a>
{:else}
	<section class="container mt-[5%]">
		<h2 class="h2">Acheter sa license FFSU</h2>
	</section>

	<br />
	<section class="container mb-[5%]">
		<Payment {user} form={_superForm} />
	</section>

	<Footer />
{/if}
