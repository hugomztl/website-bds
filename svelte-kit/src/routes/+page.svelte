<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
  	import * as Card from "$lib/components/ui/card/index.js";
	import * as Accordion from "$lib/components/ui/accordion";
  	import * as Carousel from "$lib/components/ui/carousel/index.js";
  	import * as Select from "$lib/components/ui/select/index.js";
  	import { Input } from "$lib/components/ui/input/index.js";
  	import { Label } from "$lib/components/ui/label/index.js";
	import * as Sheet from "$lib/components/ui/sheet/index.js";
	import { Volume2, VolumeX, ChevronRight } from 'lucide-svelte';
	import Marquee from './Marquee.svelte';
	import '@event-calendar/core/index.css';
	import Autoplay from "embla-carousel-autoplay";
	import '../app.postcss';

	let isMuted = true;

	let partenaires = [
		{ nom: 'FFSU', logo: '/logos/ffsu.png' },
		{ nom: "Jeun'Est", logo: '/logos/jeun_est.png' },
		{ nom: 'Race System', logo: '/logos/race_system.png' },
		{ nom: "Caisse d'Épargne", logo: '/logos/caisse_epargne.png' }
		// Ajoutez d'autres partenaires selon vos besoins
	];

 	const plugin = Autoplay({ delay: 2000, stopOnInteraction: true });

</script>

<main>
	<section class="relative h-screen w-full overflow-hidden">
		<video autoplay loop class="absolute inset-0 h-full w-full object-cover" bind:muted={isMuted}>
			<source src="motivation.mp4" type="video/mp4" />
			<track kind="captions" src="" srclang="fr" label="Français" />
			Votre navigateur ne supporte pas la vidéo HTML5.
		</video>

		<div class="absolute inset-0 bg-black/50"></div>

		<div class="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
			<h1 class="h1 mb-8 text-center text-5xl font-bold md:text-7xl">PRÊT À TE DÉPASSER ?</h1>
			<Button
				variant="ghost"
				href="/register"
			>
				Rejoins le BDS
				<ChevronRight/>
		</Button>
		</div>

		<button on:click={() => (isMuted = !isMuted)} class="btn-icon absolute right-4 top-4 z-20">
			{#if isMuted}
				<VolumeX size={24} color="red" />
			{:else}
				<Volume2 size={24} color="white" />
			{/if}
		</button>
	</section>

	<section class="container mt-[5%] flex justify-between">

		<Card.Root class="w-[49%]">
		
			<Card.Header>
			  <Card.Title>Qu'est-ce qu'un BDS ?</Card.Title>
			  <Card.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</Card.Description>
			</Card.Header>
			<Card.Content>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
			</Card.Content>
		</Card.Root>

		<Card.Root class="w-[49%]">
			<Card.Header>
			  <Card.Title>Notre mission</Card.Title>
			  <Card.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</Card.Description>
			</Card.Header>
			<Card.Content>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
			</Card.Content>
		  </Card.Root>

	</section>

	<section class="container mt-[5%] flex justify-between">
			<h2 class="mb-12 text-center font-bold">FAQ</h2>
			<Accordion.Root class="w-[60%]">
				<Accordion.Item value="item-1">
					<Accordion.Trigger>Comment rejoindre un club existant ?</Accordion.Trigger>
					<Accordion.Content>
					  Pour rejoindre un club, ouvrez la barre de recherche en appuyant sur 
					  <kbd
					  class="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100">
					  <span class="text-xs">ctrl</span>
					  </kbd>
					  +
					  <kbd
					  class="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100">
					  <span class="text-xs">K</span>
					  </kbd>
					  et cherchez le nom du club que vous souhaitez rejoindre pour accéder à sa page. La liste des clubs est disponible plus haut ci-dessus.
					</Accordion.Content>
				  </Accordion.Item>
				<Accordion.Item value="item-2">
					<Accordion.Trigger>Comment créer un club ?</Accordion.Trigger>
					<Accordion.Content>
					  Pour créer un club, il vous suffit de remplir le formulaire de demande de création de club. Un administrateur se chargera de répondre à la demande dans les 48H.
					</Accordion.Content>
				  </Accordion.Item>
				  <Accordion.Item value="item-3">
					<Accordion.Trigger>Comment obtenir ma licence FFSU ?</Accordion.Trigger>
					<Accordion.Content>
					  Yes. It adheres to the WAI-ARIA design pattern.
					</Accordion.Content>
				  </Accordion.Item>
				  <Accordion.Item value="item-4">
					<Accordion.Trigger>Puis-je pratiquer sans licence ?</Accordion.Trigger>
					<Accordion.Content>
					  Oui, si les installations utilisées par le club ne sont pas mises à disposition par la FFSU.
					</Accordion.Content>
				  </Accordion.Item>
				  <Accordion.Item value="item-5">
					<Accordion.Trigger>Is it accessible?</Accordion.Trigger>
					<Accordion.Content>
					  Yes. It adheres to the WAI-ARIA design pattern.
					</Accordion.Content>
				  </Accordion.Item>
				  <Accordion.Item value="item-6">
					<Accordion.Trigger>Is it accessible?</Accordion.Trigger>
					<Accordion.Content>
					  Yes. It adheres to the WAI-ARIA design pattern.
					</Accordion.Content>
				  </Accordion.Item>
			  </Accordion.Root>

			<h2 class="h2 mb-12 text-center font-bold">ACTUALITÉS</h2>
			<Carousel.Root 
			plugins={[plugin]}
			class="w-full max-w-xs"
			on:mousenter={plugin.stop}
  			on:mouseleave={plugin.reset}
			>
				<Carousel.Content>
				  {#each Array(5) as _, i (i)}
					<Carousel.Item>
					  <div class="p-1">
						<Card.Root>
						  <Card.Content
							class="flex aspect-square items-center justify-center p-6"
						  >
							<span class="text-4xl font-semibold">{i + 1}</span>
						  </Card.Content>
						</Card.Root>
					  </div>
					</Carousel.Item>
				  {/each}
				</Carousel.Content>
				<Carousel.Previous />
				<Carousel.Next />
			  </Carousel.Root>

	</section>

	<section class="bg-surface-100-800-token py-16">
		<div class="container mx-auto px-4">
			<h2 class="h2 mb-12 text-center">NOS PARTENAIRES</h2>
			<div class="overflow-hidden">
				<Marquee {partenaires} scrollSpeedSec={partenaires.length * 2.5} />
			</div>
		</div>
	</section>

	<footer class="bg-surface-100-800-token py-8">
		<div class="container mx-auto px-4 text-center">
			<p class="text-surface-900-50-token">
				© {new Date().getFullYear()} BDS - Tous droits réservés
			</p>
		</div>
	</footer>
</main>

<style lang="postcss">
	/* Style complémentaire pour assurer le bon rendu de la vidéo */
	video {
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.overflow-hidden {
		display: flex;
		flex-direction: column;
	}
</style>
