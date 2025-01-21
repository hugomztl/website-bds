<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import Payment from './Payment.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { CheckCheck, ChevronLeft, IdCard } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

	export let data;

	const user = data.user;
	const _superForm = superForm(data.form);

	export const snapshot = {
		capture: _superForm.capture,
		restore: _superForm.restore
	};
</script>



	{#if user.license}
		<div class="my-[5%] flex items-center justify-center">
			<div class="flex-col items-center justify-center text-center space-x-4">
				<CheckCheck class="w-[30vw] h-auto text-green-500" />
				<h2 class="mb-4 text-4xl text-muted-foreground font-roboto">Vous êtes déjà licensié</h2>
				<Button href="/"><ChevronLeft class="mr-1"/>Retourner à l'accueil</Button>
				<Button href="/license"><IdCard class="mr-1"/>Voir ma licence</Button>
			</div>	
		</div>
	{:else}
		<section class="container mt-[5%]">
			<h2 class="h2">Acheter sa license FFSU</h2>
		</section>

		<br />
		<section class="container mb-[5%]">
			<Payment {user} form={_superForm} />
		</section>

		
	{/if}

<Footer/>