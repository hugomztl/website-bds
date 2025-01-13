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
	import { Badge } from "$lib/components/ui/badge";
	import { onMount } from 'svelte';
	import { Separator } from "$lib/components/ui/separator";
	import { buttonVariants } from "$lib/components/ui/button";

	let isMuted = true;
	let videoElement: HTMLVideoElement | null = null;

	let partenaires = [
		{ nom: 'FFSU', logo: '/logos/ffsu.png' },
		{ nom: "Jeun'Est", logo: '/logos/jeun_est.png' },
		{ nom: 'Race System', logo: '/logos/race_system.png' },
		{ nom: "Caisse d'Épargne", logo: '/logos/caisse_epargne.png' }
		// Ajoutez d'autres partenaires selon vos besoins
	];

	let actu = [
		{ titre: 'Soirée BBQ', date: '26/11/2024', desc: 'Description de la soirée BBQ.', categorie: 'Événement' },
		{ titre: 'Club BFC (Brat Fight Club)', date: '26/11/2024', desc: 'Description du club BFC.', categorie: 'Sport' },
		{ titre: 'Randonnée Vosges', date: '26/11/2024', desc: 'Description de la randonnée.', categorie: 'Événement' },
		{ titre: 'Nouveaux prix licences FFSU', date: '26/11/2024', desc: 'Informations sur les licences FFSU.', categorie: 'Licences' },
		{ titre: 'CESI, finito ou masterclass ?', date: '26/11/2024', desc: 'Discussion sur le CESI.', categorie: 'Info' },
	];

	function getBadgeVariant(categorie: string): string {
		switch (categorie) {
			case 'Événement':
			return 'default';
			case 'Sport':
			return 'secondary';
			case 'Licences':
			return 'outline';
			case 'Info':
			return 'destructive';
			default:
			return 'default';
		}
	}


 	const plugin = Autoplay({ delay: 2000, stopOnInteraction: true });

	let shortcut = 'Unknown';

	onMount(() => {
	// Détecter l'OS
	const userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.includes('macintosh') || userAgent.includes('mac os x')) {
		shortcut = '⌘';
	} else if (userAgent.includes('windows')) {
		shortcut = 'Ctrl+';
	} else if (userAgent.includes('linux')) {
		shortcut = '⌘';
	}
	// Observer la visibilité de la vidéo
	if (videoElement) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) {
						isMuted = true; // Désactiver le son si la vidéo sort de l'écran
					}
				});
			},
			{ threshold: 0.1 } // Observer à partir de 10% de visibilité
		);
		observer.observe(videoElement);

		// Nettoyage de l'observateur lors du démontage
		return () => observer.disconnect();
	}
});

</script>

<main>
	<section class="relative h-screen w-full overflow-hidden">
		<video 
		autoplay 
		loop 
		class="absolute inset-0 h-full w-full object-cover" 
		bind:muted={isMuted}
		bind:this={videoElement}>
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
				class="hover:shadow-xl hover:bg-background/95 hover:supports-[backdrop-filter]:bg-background/60 hover:backdrop-blur"
			>
				Rejoins le BDS
				<ChevronRight/>
		</Button>
		</div>

		<Button on:click={() => (isMuted = !isMuted)} class="hover:shadow-xl hover:bg-background/95 hover:supports-[backdrop-filter]:bg-background/60 hover:backdrop-blur absolute right-4 top-[10%] z-5" variant="ghost">
			{#if isMuted}
				<VolumeX size={24} color="red" />
			{:else}
				<Volume2 size={24} color="white" />
			{/if}
		</Button>
	</section>
	
	<section class="container w-full">
		<h2 class="mt-[5%] text-center font-bold text-4xl">ACTUALITÉS</h2>
		<Carousel.Root 
		orientation="horizontal"
		plugins={[plugin]}
		class="w-full"
		on:mousenter={plugin.stop}
		on:mouseleave={plugin.reset}
		>
			<Carousel.Content
			class={`w-full select-none active:cursor-grabbing hover:cursor-grab`}
			>
				{#each actu as _, i (i)}
				<Carousel.Item class="pt-[1.5%]">
					<div class="p-1">
					<Card.Root class="w-full">
						<Card.Header>
							<Card.Title>{_.titre}</Card.Title>
							<Card.Description><Badge variant={getBadgeVariant(_.categorie)}>{_.categorie}</Badge>
							</Card.Description>
							</Card.Header>
							<Card.Content>
							{_.desc}
							</Card.Content>
							<Card.Footer class="flex justify-between">
							<date>{_.date}</date>
							<Button>En savoir plus <ChevronRight/></Button>
							</Card.Footer>
					</Card.Root>
					</div>
				</Carousel.Item>
				{/each}
			</Carousel.Content>
			<Carousel.Previous />
			<Carousel.Next />
			</Carousel.Root>
	</section>

	<section class="container mt-[5%] flex justify-between">

		<Card.Root class="w-[35%]">
		
			<Card.Header>
			  <Card.Title>Qu'est-ce qu'un BDS ?</Card.Title>
			</Card.Header>

			<Card.Content>
				<Separator class="mb-5"/>
				Le <b>BDS (Bureau des Sports)</b> est une association étudiante, généralement présente dans les écoles supérieures et universités, dont le rôle principal est d’organiser et de promouvoir les activités sportives pour les étudiants. Le BDS est souvent un des piliers de la vie associative étudiante, au même titre que d'autres bureaux comme le <b>BDE (Bureau des Étudiants)</b>.
			</Card.Content>
		</Card.Root>
		
		<Card.Root class="w-[60%]">
			<Card.Header>
			  <Card.Title>Nos missions</Card.Title>
			</Card.Header>
			<Card.Content>	
				<Separator class="mb-5" />
				<ul class="list-disc ml-4">
					<li><b>Organiser les événements sportifs :</b> tournois, compétitions inter-écoles, journées sportives.</li>
					<li><b>Promouvoir la pratique sportive :</b> séances d'entraînement, découverte de nouvelles disciplines.</li>
					<li><b>Encadrer les équipes sportives :</b> gestion des inscriptions, fourniture d'équipements.</li>
					<li><b>Gérer les infrastructures :</b> réservation de terrains, salles, et matériel sportif.</li>
					<li><b>Créer une cohésion étudiante :</b> activités sportives fédératrices, soirées à thème, week-ends sportifs.</li>
					<li><b>Rechercher des financements :</b> partenariats, sponsors, cotisations pour soutenir les activités.</li>
				</ul>				
			</Card.Content>
		</Card.Root>
	</section>

	<section class="container w-full mt-[5%]">
			<h2 class="mb-12 text-center font-bold text-4xl">FAQ</h2>
			<Accordion.Root>
				<Accordion.Item value="item-1">
					<Accordion.Trigger>Comment rejoindre un club existant ?</Accordion.Trigger>
					<Accordion.Content>
						Pour rejoindre un club, accédez à la <a href="/clubs" class="underline">liste des clubs</a> et choisissez le club qui vous intéresse pour accéder à sa page. Vous pourrez alors effectuer une demande d'adhésion. Alternativement, vous pouvez chercher un club précis en utilisant la barre de recherche en haut de la page ou en appuyant sur
					  <kbd
					  class="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100">
					  <span class="text-xs">{shortcut}K</span>
					  </kbd>
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
					  Oui, si les installations utilisées par le club ne sont pas mises à disposition par la FFSU. Dans le cas contraire, une licence est obligatoire une fois vos séances d'essai épuisées.
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

			
	</section>

	<section class="container w-full mt-[5%]">

		<h2 class="mb-12 text-center font-bold">NOS PARTENAIRES</h2>
		<div class="overflow-hidden">
			<Marquee {partenaires} scrollSpeedSec={partenaires.length * 2.5} />
		</div>
		
	</section>

	<footer class="container w-full mt-[5%]">
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