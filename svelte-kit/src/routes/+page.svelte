<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Accordion from '$lib/components/ui/accordion';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import {
		Volume2,
		VolumeX,
		ChevronRight,
		Mail,
		Trophy,
		Link,
		Linkedin,
		Github,
		Instagram,
		Youtube
	} from 'lucide-svelte';
	import Marquee from './Marquee.svelte';
	import '@event-calendar/core/index.css';
	import Autoplay from 'embla-carousel-autoplay';
	import '../app.postcss';
	import { Badge } from '$lib/components/ui/badge';
	import { onMount } from 'svelte';
	import { Separator } from '$lib/components/ui/separator';
	import * as Avatar from '$lib/components/ui/avatar';
	import svelteTilt from 'vanilla-tilt-svelte';
	import BureauCard from '$lib/components/bureauCard.svelte';
	import * as Resizable from '$lib/components/ui/resizable';
	import { Header } from '$lib/components/ui/alert-dialog';
	import { Description } from '$lib/components/ui/alert';
	import FounderCard from '$lib/components/founderCard.svelte';
	import Faq from '$lib/components/faq.svelte';
	import Footer from '$lib/components/footer.svelte';
	export let data;

	let isMuted = true;
	let videoElement: HTMLVideoElement | null = null;

	let partenaires = [
		{ nom: 'FFSU', logo: '/logos/ffsu.png' },
		{ nom: "Jeun'Est", logo: '/logos/jeun_est.png' },
		{ nom: 'Race System', logo: '/logos/race_system.png' },
		{ nom: "Caisse d'Épargne", logo: '/logos/caisse_epargne.png' }
		// Ajoutez d'autres partenaires selon vos besoins
	];

	console.log(data.posts);

	let actu = [
		{
			titre: 'Soirée BBQ',
			date: '26/11/2024',
			desc: 'Description de la soirée BBQ.',
			categorie: 'Événement'
		},
		{
			titre: 'Club BFC (Brat Fight Club)',
			date: '26/11/2024',
			desc: 'Description du club BFC.',
			categorie: 'Sport'
		},
		{
			titre: 'Randonnée Vosges',
			date: '26/11/2024',
			desc: 'Description de la randonnée.',
			categorie: 'Événement'
		},
		{
			titre: 'Nouveaux prix licences FFSU',
			date: '26/11/2024',
			desc: 'Informations sur les licences FFSU.',
			categorie: 'Licences'
		},
		{
			titre: 'CESI, finito ou masterclass ?',
			date: '26/11/2024',
			desc: 'Discussion sur le CESI.',
			categorie: 'Info'
		}
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
			bind:this={videoElement}
		>
			<source src="Motivation-1.webm" type="video/webm" />
			<track kind="captions" src="" srclang="fr" label="Français" />
			Votre navigateur ne supporte pas la vidéo HTML5.
		</video>

		<div class="absolute inset-0 bg-black/50"></div>

		<div class="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
			<h1 class="h1 mb-8 text-center text-5xl font-bold md:text-7xl">PRÊT À TE DÉPASSER ?</h1>
			<Button
				variant="ghost"
				href="/register"
				class="hover:bg-background/95 hover:supports-[backdrop-filter]:bg-background/60 animate-bounce text-xl hover:animate-none hover:shadow-xl hover:backdrop-blur"
			>
				Rejoins le BDS
				<ChevronRight />
			</Button>
		</div>

		<Button
			on:click={() => (isMuted = !isMuted)}
			class="hover:bg-background/95 hover:supports-[backdrop-filter]:bg-background/60 z-5 absolute right-4 top-[10%] hover:shadow-xl hover:backdrop-blur"
			variant="ghost"
		>
			{#if isMuted}
				<VolumeX size={24} color="red" />
			{:else}
				<Volume2 size={24} color="white" />
			{/if}
		</Button>
	</section>

	<section class="container w-full">
		<p class="mt-[5%] text-center text-4xl font-bold">Actualités</p>
		<Carousel.Root
			orientation="horizontal"
			plugins={[plugin]}
			class="w-full"
			on:mousenter={plugin.stop}
			on:mouseleave={plugin.reset}
		>
			<Carousel.Content class={`w-full select-none hover:cursor-grab active:cursor-grabbing`}>
				{#each data.posts as _, i (i)}
					<Carousel.Item class="pt-[1.5%]">
						<div class="p-1">
							<Card.Root class="w-full">
								<Card.Header>
									<Card.Title>{_.title}</Card.Title>
									<!-- <Card.Description><Badge variant={getBadgeVariant(_.categorie)}>{_.categorie}</Badge> -->
									<!-- </Card.Description> -->
								</Card.Header>
								<Card.Content>
									{_.content}
								</Card.Content>
								<Card.Footer class="flex justify-between">
									<span
										>Posté le {new Date(_.createdAt).toLocaleDateString('fr-FR')} par <Button
											class="px-0"
											variant="link"
											href="/profile/{_.createdBy._id}">{_.createdBy.fullName}</Button
										></span
									>
									<Button href="/blog/{_._id}">En savoir plus <ChevronRight /></Button>
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

	<section class="font-roboto container mt-[5%] flex justify-between">
		<Card.Root class="w-[35%] border-none shadow-none">
			<Card.Header>
				<Card.Title class="font-bold">Qu'est-ce qu'un BDS ?</Card.Title>
			</Card.Header>

			<Card.Content>
				<Separator class="mb-5" />
				<p class="text-muted-foreground">
					Le <b>BDS (Bureau des Sports)</b> est une association étudiante, généralement présente
					dans les écoles supérieures et universités, dont le rôle principal est d’organiser et de
					promouvoir les activités sportives pour les étudiants. Le BDS est souvent un des piliers
					de la vie associative étudiante, au même titre que d'autres bureaux comme le
					<b>BDE (Bureau des Étudiants)</b>.
				</p>
			</Card.Content>
		</Card.Root>

		<Card.Root class="w-[60%] border-none shadow-none">
			<Card.Header>
				<Card.Title class="font-bold">Nos missions</Card.Title>
			</Card.Header>
			<Card.Content>
				<Separator class="mb-5" />
				<ul class="text-muted-foreground ml-4 list-disc">
					<li>
						<b>Organiser les événements sportifs :</b> tournois, compétitions inter-écoles, journées
						sportives.
					</li>
					<li>
						<b>Promouvoir la pratique sportive :</b> séances d'entraînement, découverte de nouvelles
						disciplines.
					</li>
					<li>
						<b>Encadrer les équipes sportives :</b> gestion des inscriptions, fourniture d'équipements.
					</li>
					<li>
						<b>Gérer les infrastructures :</b> réservation de terrains, salles, et matériel sportif.
					</li>
					<li>
						<b>Créer une cohésion étudiante :</b> activités sportives fédératrices, soirées à thème,
						week-ends sportifs.
					</li>
					<li>
						<b>Rechercher des financements :</b> partenariats, sponsors, cotisations pour soutenir les
						activités.
					</li>
				</ul>
			</Card.Content>
		</Card.Root>
	</section>

	<section class="font-roboto mt-[5%] bg-black">
		<Card.Root class=" container border-none bg-transparent shadow-none">
			<Card.Header>
				<Card.Title class="my-4 text-center text-4xl font-bold text-white">Fondateurs</Card.Title>
			</Card.Header>
			<Card.Content class="flex justify-between space-x-4">
				<FounderCard
					nom="berton"
					prenom="téo"
					linkedin="bertonteo"
					imgUrl="berton.webp"
					classList="w-[25%]"
				/>
				<FounderCard
					nom="mazzitelli"
					prenom="hugo"
					linkedin="hugomztl"
					imgUrl="mazz.webp"
					classList="w-[25%]"
				/>
				<FounderCard
					nom="khatchatrian"
					prenom="haïk"
					linkedin="haik-khatchatrian"
					imgUrl="hk.webp"
					classList="w-[25%]"
				/>
				<FounderCard
					nom="changarnier"
					prenom="théo"
					linkedin="theo-changarnier"
					imgUrl="chang.webp"
					classList="w-[25%]"
				/>
			</Card.Content>
			<Card.Footer>
				<p class="text-muted-foreground my-4 text-center">
					En 2022, après deux années de cycle préparatoire au CESI Nancy, nous étions quatre amis
					partageant une passion commune pour le sport. En discutant de notre expérience sur le
					campus, nous avons réalisé qu’il manquait un véritable espace dédié à la vie sportive et
					qu’aucun Bureau des Sports n’existait pour fédérer les étudiants. Cette prise de
					conscience nous a poussés à agir : ensemble, nous avons décidé de créer le BDS. Notre
					objectif était simple mais ambitieux : rassembler les étudiants autour de leurs passions
					sportives, animer la vie du campus et renforcer les liens entre les différentes
					promotions.
				</p>
			</Card.Footer>
		</Card.Root>
	</section>

	<section class="font-roboto container mt-[5%] w-full">
		<h2 class="mb-12 text-center text-4xl font-bold">Nos partenaires</h2>
		<div class="overflow-hidden transition-transform hover:scale-110">
			<Marquee {partenaires} scrollSpeedSec={partenaires.length * 2.5} />
		</div>
	</section>

	<section class="font-roboto mt-[5%] w-full bg-black">
		<p class="mb-[2%] pt-[2%] text-center text-4xl font-bold text-white">
			Bureau <span class="ms-2 rounded bg-white px-2.5 py-0.5 text-2xl font-thin text-black"
				>{new Date().getFullYear() - 1} - {new Date().getFullYear()}</span
			>
		</p>

		<div class="mx-[16%] grid grid-cols-5 grid-rows-1 gap-6">
			<div class="col-start-3 row-start-1">
				<BureauCard nom="DURENE" prenom="Louis" fonction="Président" imageUrl="pres.jpg" />
			</div>
			<div class="col-start-2 row-start-1">
				<BureauCard nom="MAZZITELLI" prenom="Hugo" fonction="Secrétaire" imageUrl="secret.jpg" />
			</div>
			<div class="col-start-4">
				<BureauCard nom="KHATCHATRIAN" prenom="Haïk" fonction="Trésorier" imageUrl="treso.jpg" />
			</div>
		</div>
		<Separator class="mx-auto w-[70%] justify-center" />
		<div class="mx-[16%] grid grid-cols-5 grid-rows-1 gap-6">
			<div class="col-start-2 row-start-2">
				<BureauCard
					nom="LAWRYNOWICZ"
					prenom="Eliott"
					fonction="Secrétaire adjoint"
					imageUrl="secret-adj.png"
				/>
			</div>
			<div class="col-start-3 row-start-2">
				<BureauCard
					nom="APTEL"
					prenom="Augustin"
					fonction="Vice-président"
					imageUrl="vice-pres.png"
				/>
			</div>
			<div class="col-start-4 row-start-2">
				<BureauCard
					nom="CAHOUCH"
					prenom="Ilian"
					fonction="Trésorier adjoint"
					imageUrl="treso-adj.jpg"
				/>
			</div>
		</div>
		<Separator class="mx-auto w-[70%] justify-center" />
		<div class="mx-[10%] grid grid-cols-5 grid-rows-1 gap-6">
			<div class="col-start-2 row-start-3">
				<BureauCard
					nom="BOUANANE"
					prenom="Wassim"
					fonction="Production audiovisuelle"
					imageUrl="prod-vis.jpg"
				/>
			</div>
			<div class="col-start-3 row-start-3">
				<BureauCard
					nom="JOLLY"
					prenom="Quentin"
					fonction="Responsable évènementiel"
					imageUrl="resp-event.jpg"
				/>
			</div>
			<div class="col-start-4 row-start-3">
				<BureauCard
					nom="ATILGAN"
					prenom="Berat"
					fonction="Responsable clubs"
					imageUrl="resp-clubs.jpg"
				/>
			</div>
		</div>
		<Separator class="mx-auto w-[70%] justify-center" />
		<div class="mx-[15%] grid grid-cols-5 grid-rows-1 gap-6">
			<div class="row-start-4">
				<BureauCard nom="LEOGANE" prenom="Marie" fonction="Responsable merch" imageUrl="" />
			</div>
			<div class="row-start-4">
				<BureauCard nom="PIQUEREL" prenom="Mael" fonction="Responsable clubs adjoint" imageUrl="" />
			</div>
			<div class="row-start-4">
				<BureauCard nom="SPAGNI" prenom="Louna" fonction="Responsable ???" imageUrl="" />
			</div>
			<div class="row-start-4">
				<BureauCard nom="GASIOREK" prenom="Alban" fonction="Responsable ???" imageUrl="" />
			</div>
			<div class="row-start-4">
				<BureauCard nom="MOTTI" prenom="Louise" fonction="Responsable ???" imageUrl="" />
			</div>
		</div>
		<Separator class="mx-auto w-[70%] justify-center" />
		<div class="mt-5 flex flex-col items-center pb-[2%]">
			<p class="mb-2 text-white">Tu souhaites apporter ta pierre à l'édifice ?</p>
			<Button class="bg-white text-black transition-transform hover:scale-110 hover:text-white">
				<Link class="mr-1" />Rejoindre le bureau
			</Button>
		</div>
	</section>

	<section class="font-roboto container mt-[5%] w-full">
		<h2 class="mb-12 text-center text-4xl font-bold">FAQ</h2>
		<Faq {shortcut} />
	</section>

	<section class="font-roboto mt-[5%] w-full bg-black py-[2%]">
		<Card.Root class="container bg-transparent">
			<Card.Header>
				<Card.Title class="text-white">Équipe IT</Card.Title>
				<Card.Description>Découvrez l'équipe qui se cache derrière ce site web !</Card.Description>
			</Card.Header>
			<Card.Content class="flex items-center">
				<Avatar.Root class="h-auto w-[25%] max-w-44">
					<Avatar.Image src="/bureau/resp-it.jpg" alt="VB" class="object-cover" />
					<Avatar.Fallback>VB</Avatar.Fallback>
				</Avatar.Root>
				<div>
					<strong class="ml-4 text-white">Valentin BONETTI</strong>
					<br />
					<span class="ml-4 text-white">Développeur full-stack</span>
					<Separator class="my-2 ml-4 w-[90%]" />
					<Button
						href="mailto:valentin.bonetti@viacesi.fr"
						variant="link"
						class="text-white transition-transform hover:scale-110"
						><Mail class="mr-1" />valentin.bonetti@viacesi.fr</Button
					>
					<br />
					<Button
						href="https://www.linkedin.com/in/valentin-bonetti/"
						variant="link"
						class="text-white transition-transform hover:scale-110"
						><Linkedin class="mr-1" />linkedin.com/in/valentin-bonetti</Button
					>
					<br />
					<Button
						href="https://github.com/ElMoustacho"
						variant="link"
						class="text-white transition-transform hover:scale-110"
						><Github class="mr-1" />github.com/ElMoustacho</Button
					>
				</div>

				<Separator orientation="vertical" class="h-[100%]" />

				<div>
					<strong class="ml-4 text-white">Hugo MAZZITELLI</strong>
					<br />
					<span class="ml-4 text-white">Développeur front-end</span>
					<Separator class="my-2 ml-4 w-[90%]" />
					<Button
						href="mailto:valentin.bonetti@viacesi.fr"
						variant="link"
						class="text-white transition-transform hover:scale-110"
						><Mail class="mr-1" />valentin.bonetti@viacesi.fr</Button
					>
					<br />
					<Button
						href="https://www.linkedin.com/in/valentin-bonetti/"
						variant="link"
						class="text-white transition-transform hover:scale-110"
						><Linkedin class="mr-1" />linkedin.com/in/valentin-bonetti</Button
					>
					<br />
					<Button
						href="https://github.com/ElMoustacho"
						variant="link"
						class="text-white transition-transform hover:scale-110"
						><Github class="mr-1" />github.com/ElMoustacho</Button
					>
				</div>

				<div>
					<strong class="ml-4 text-white">Haïk KHATCHATRIAN</strong>
					<br />
					<span class="ml-4 text-white">Développeur back-end</span>
					<Separator class="my-2 ml-4 w-[90%]" />
					<Button
						href="mailto:valentin.bonetti@viacesi.fr"
						variant="link"
						class="text-white transition-transform hover:scale-110"
						><Mail class="mr-1" />valentin.bonetti@viacesi.fr</Button
					>
					<br />
					<Button
						href="https://www.linkedin.com/in/valentin-bonetti/"
						variant="link"
						class="text-white transition-transform hover:scale-110"
						><Linkedin class="mr-1" />linkedin.com/in/valentin-bonetti</Button
					>
					<br />
					<Button
						href="https://github.com/ElMoustacho"
						variant="link"
						class="text-white transition-transform hover:scale-110"
						><Github class="mr-1" />github.com/ElMoustacho</Button
					>
				</div>
			</Card.Content>
			<Card.Footer></Card.Footer>
		</Card.Root>
	</section>

	<Footer />
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
