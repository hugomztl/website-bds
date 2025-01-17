<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
  	import * as Card from "$lib/components/ui/card/index.js";
	import * as Accordion from "$lib/components/ui/accordion";
  	import * as Carousel from "$lib/components/ui/carousel/index.js";
  	import * as Select from "$lib/components/ui/select/index.js";
  	import { Input } from "$lib/components/ui/input/index.js";
  	import { Label } from "$lib/components/ui/label/index.js";
	import { Volume2, VolumeX, ChevronRight, Mail, Trophy, Link, Linkedin, Github, Instagram, Youtube } from 'lucide-svelte';
	import Marquee from './Marquee.svelte';
	import '@event-calendar/core/index.css';
	import Autoplay from "embla-carousel-autoplay";
	import '../app.postcss';
	import { Badge } from "$lib/components/ui/badge";
	import { onMount } from 'svelte';
	import { Separator } from "$lib/components/ui/separator";
	import * as Avatar from "$lib/components/ui/avatar";
	import svelteTilt from 'vanilla-tilt-svelte';
	import BureauCard from "$lib/components/bureauCard.svelte";
	import * as Resizable from "$lib/components/ui/resizable";
	import { Header } from "$lib/components/ui/alert-dialog";
	import { Description } from "$lib/components/ui/alert";
	import FounderCard from "$lib/components/founderCard.svelte";
	import Faq from "$lib/components/faq.svelte";
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
				class="hover:shadow-xl hover:bg-background/95 hover:supports-[backdrop-filter]:bg-background/60 hover:backdrop-blur animate-bounce hover:animate-none text-xl"
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
		<p class="mt-[5%] text-center font-bold text-4xl">Actualités</p>
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
							<span>{_.createdAt} par {_.createdBy}</span>
							<Button href="/blog/{_._id}">En savoir plus <ChevronRight/></Button>
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

	<section class="container mt-[5%] flex justify-between font-roboto">

		<Card.Root class="w-[35%] border-none shadow-none">
		
			<Card.Header>
			  <Card.Title>Qu'est-ce qu'un BDS ?</Card.Title>
			</Card.Header>

			<Card.Content>
				<Separator class="mb-5"/>
				<Card.Description>
				Le <b>BDS (Bureau des Sports)</b> est une association étudiante, généralement présente dans les écoles supérieures et universités, dont le rôle principal est d’organiser et de promouvoir les activités sportives pour les étudiants. Le BDS est souvent un des piliers de la vie associative étudiante, au même titre que d'autres bureaux comme le <b>BDE (Bureau des Étudiants)</b>.
				</Card.Description>
			</Card.Content>
		</Card.Root>
		
		<Card.Root class="w-[60%] border-none shadow-none">
			<Card.Header>
			  <Card.Title>Nos missions</Card.Title>
			</Card.Header>
			<Card.Content>	
				<Separator class="mb-5" />
				<Card.Description>
				<ul class="list-disc ml-4">
					<li><b>Organiser les événements sportifs :</b> tournois, compétitions inter-écoles, journées sportives.</li>
					<li><b>Promouvoir la pratique sportive :</b> séances d'entraînement, découverte de nouvelles disciplines.</li>
					<li><b>Encadrer les équipes sportives :</b> gestion des inscriptions, fourniture d'équipements.</li>
					<li><b>Gérer les infrastructures :</b> réservation de terrains, salles, et matériel sportif.</li>
					<li><b>Créer une cohésion étudiante :</b> activités sportives fédératrices, soirées à thème, week-ends sportifs.</li>
					<li><b>Rechercher des financements :</b> partenariats, sponsors, cotisations pour soutenir les activités.</li>
				</ul>	
				</Card.Description>			
			</Card.Content>
		</Card.Root>
	</section>

	<section class="mt-[5%] font-roboto bg-black">
		<Card.Root class=" container border-none shadow-none bg-transparent">
			<Card.Header>
				<Card.Title class="text-center font-bold text-4xl text-white my-4">Fondateurs</Card.Title>
			</Card.Header>
			<Card.Content class="flex justify-between space-x-4">
				<FounderCard nom="berton" prenom="téo" linkedin="bertonteo" imgUrl="berton.jpg" classList="w-[25%]"/>
				<FounderCard nom="mazzitelli" prenom="hugo" linkedin="hugomztl" imgUrl="mazz.webp" classList="w-[25%]"/>
				<FounderCard nom="khatchatrian" prenom="haïk" linkedin="haik-khatchatrian" imgUrl="hk.webp" classList="w-[25%]"/>
				<FounderCard nom="changarnier" prenom="théo" linkedin="theo-changarnier" imgUrl="chang.webp" classList="w-[25%]"/>
			</Card.Content>
			<Card.Footer>
				<Card.Description class="text-center my-4">En 2022, après deux années de cycle préparatoire au CESI Nancy, nous étions quatre amis partageant une passion commune pour le sport. En discutant de notre expérience sur le campus, nous avons réalisé qu’il manquait un véritable espace dédié à la vie sportive et qu’aucun Bureau des Sports n’existait pour fédérer les étudiants. Cette prise de conscience nous a poussés à agir : ensemble, nous avons décidé de créer le BDS. Notre objectif était simple mais ambitieux : rassembler les étudiants autour de leurs passions sportives, animer la vie du campus et renforcer les liens entre les différentes promotions.<br/><br/>Aujourd’hui, nous sommes fiers de voir notre initiative prendre vie et contribuer à créer une communauté étudiante plus dynamique et soudée.
				</Card.Description>
			</Card.Footer>
		</Card.Root>
    </section>

	<section class="container w-full mt-[5%] font-roboto">

		<h2 class="mb-12 text-center font-bold text-4xl">Nos partenaires</h2>
		<div class="overflow-hidden hover:scale-110 transition-transform">
			<Marquee {partenaires} scrollSpeedSec={partenaires.length * 2.5} />
		</div>
		
	</section>

	<section class="w-full mt-[5%] font-roboto bg-black">

		<p class="font-bold text-4xl text-center text-white mb-[2%] pt-[2%]">Bureau <span class="bg-white text-black text-2xl font-thin px-2.5 py-0.5 rounded ms-2">{new Date().getFullYear()-1} - {new Date().getFullYear()}</span></p>	

		<div class="grid grid-cols-5 grid-rows-1 gap-6 mx-[16%]">
			<div class="col-start-3 row-start-1">
				<BureauCard nom="DURENE" prenom="Louis" fonction="Président" imageUrl="pres.jpg"/>
			</div>
			<div class="col-start-2 row-start-1">
				<BureauCard nom="MAZZITELLI" prenom="Hugo" fonction="Secrétaire" imageUrl="secret.jpg"/>
			</div>
			<div class="col-start-4">
				<BureauCard nom="KHATCHATRIAN" prenom="Haïk" fonction="Trésorier" imageUrl="treso.jpg"/>
			</div>
		</div>
		<Separator class="justify-center w-[70%] mx-auto"/>
		<div class="grid grid-cols-5 grid-rows-1 gap-6 mx-[16%]">
			<div class="col-start-2 row-start-2">
				<BureauCard nom="LAWRYNOWICZ" prenom="Eliott" fonction="Secrétaire adjoint" imageUrl="secret-adj.png"/>
			</div>
			<div class="col-start-3 row-start-2">
				<BureauCard nom="APTEL" prenom="Augustin" fonction="Vice-président" imageUrl="vice-pres.png"/>
			</div>
			<div class="col-start-4 row-start-2">
				<BureauCard nom="CAHOUCH" prenom="Ilian" fonction="Trésorier adjoint" imageUrl="treso-adj.jpg"/>
			</div>
		</div>
		<Separator class="justify-center w-[70%] mx-auto"/>
		<div class="grid grid-cols-5 grid-rows-1 gap-6 mx-[10%]">
			<div class="col-start-2 row-start-3">
				<BureauCard nom="BOUANANE" prenom="Wassim" fonction="Production audiovisuelle" imageUrl="prod-vis.jpg"/>
			</div>
			<div class="col-start-3 row-start-3">
				<BureauCard nom="JOLLY" prenom="Quentin" fonction="Responsable évènementiel" imageUrl="resp-event.jpg"/>
			</div>
			<div class="col-start-4 row-start-3">
				<BureauCard nom="ATILGAN" prenom="Berat" fonction="Responsable clubs" imageUrl="resp-clubs.jpg"/>
			</div>
		</div>
		<Separator class="justify-center w-[70%] mx-auto"/>
		<div class="grid grid-cols-5 grid-rows-1 gap-6 mx-[15%]">
			<div class="row-start-4">
				<BureauCard nom="LEOGANE" prenom="Marie" fonction="Responsable merch" imageUrl=""/>
			</div>
			<div class="row-start-4">
				<BureauCard nom="PIQUEREL" prenom="Mael" fonction="Responsable clubs adjoint" imageUrl=""/>
			</div>
			<div class="row-start-4">
				<BureauCard nom="SPAGNI" prenom="Louna" fonction="Responsable ???" imageUrl=""/>
			</div>
			<div class="row-start-4">
				<BureauCard nom="GASIOREK" prenom="Alban" fonction="Responsable ???" imageUrl=""/>
			</div>
			<div class="row-start-4">
				<BureauCard nom="MOTTI" prenom="Louise" fonction="Responsable ???" imageUrl=""/>
			</div>
		</div>
		<Separator class="justify-center w-[70%] mx-auto"/>
		<div class="flex flex-col items-center mt-5 pb-[2%]">
			<p class="text-white mb-2">Tu souhaites apporter ta pierre à l'édifice ?</p>
			<Button class="hover:scale-110 transition-transform bg-white text-black hover:text-white">
				<Link class="mr-1"/>Rejoindre le bureau
			</Button>
		</div>
	</section>

	<section class="container w-full mt-[5%] font-roboto">
		<h2 class="mb-12 text-center font-bold text-4xl">FAQ</h2>
		<Faq shortcut={shortcut}/>
	</section>

	<section class="bg-black w-full mt-[5%] py-[2%] font-roboto">
		<Card.Root class="container bg-transparent">
			<Card.Header>
				<Card.Title class="text-white">Équipe IT</Card.Title>
				<Card.Description>Découvrez l'équipe qui se cache derrière ce site web !</Card.Description>
			</Card.Header>
			<Card.Content class="flex items-center">
						

					<Avatar.Root class="w-[25%] h-auto max-w-44">
						<Avatar.Image src="/bureau/resp-it.jpg" alt="VB" class="object-cover"/>
						<Avatar.Fallback>VB</Avatar.Fallback>
					</Avatar.Root>
					<div>
						<strong class="ml-4 text-white">Valentin BONETTI</strong>
						<br/>
						<span class="ml-4 text-white">Développeur full-stack</span>
						<Separator class="ml-4 my-2 w-[90%]"/>
						<Button href="mailto:valentin.bonetti@viacesi.fr" variant="link" class="text-white hover:scale-110 transition-transform"><Mail class="mr-1"/>valentin.bonetti@viacesi.fr</Button>
						<br/>
						<Button href="https://www.linkedin.com/in/valentin-bonetti/" variant="link" class="text-white hover:scale-110 transition-transform"><Linkedin class="mr-1"/>linkedin.com/in/valentin-bonetti</Button>
						<br/>
						<Button href="https://github.com/ElMoustacho" variant="link" class="text-white hover:scale-110 transition-transform"><Github class="mr-1"/>github.com/ElMoustacho</Button>
					</div>

						<Separator orientation="vertical" class="h-[100%]"/>
					
					<div>
						<strong class="ml-4 text-white">Hugo MAZZITELLI</strong>
						<br/>
						<span class="ml-4 text-white">Développeur front-end</span>
						<Separator class="ml-4 my-2 w-[90%]"/>
						<Button href="mailto:valentin.bonetti@viacesi.fr" variant="link" class="text-white hover:scale-110 transition-transform"><Mail class="mr-1"/>valentin.bonetti@viacesi.fr</Button>
						<br/>
						<Button href="https://www.linkedin.com/in/valentin-bonetti/" variant="link" class="text-white hover:scale-110 transition-transform"><Linkedin class="mr-1"/>linkedin.com/in/valentin-bonetti</Button>
						<br/>
						<Button href="https://github.com/ElMoustacho" variant="link" class="text-white hover:scale-110 transition-transform"><Github class="mr-1"/>github.com/ElMoustacho</Button>
					</div>

					<div>
						<strong class="ml-4 text-white">Haïk KHATCHATRIAN</strong>
						<br/>
						<span class="ml-4 text-white">Développeur back-end</span>
						<Separator class="ml-4 my-2 w-[90%]"/>
						<Button href="mailto:valentin.bonetti@viacesi.fr" variant="link" class="text-white hover:scale-110 transition-transform"><Mail class="mr-1"/>valentin.bonetti@viacesi.fr</Button>
						<br/>
						<Button href="https://www.linkedin.com/in/valentin-bonetti/" variant="link" class="text-white hover:scale-110 transition-transform"><Linkedin class="mr-1"/>linkedin.com/in/valentin-bonetti</Button>
						<br/>
						<Button href="https://github.com/ElMoustacho" variant="link" class="text-white hover:scale-110 transition-transform"><Github class="mr-1"/>github.com/ElMoustacho</Button>
					</div>	
			</Card.Content>
			<Card.Footer></Card.Footer>
		</Card.Root>
	</section>

	<footer class="py-8 bg-black text-white">
		<div class="container mx-auto px-4">
		  <div class="flex flex-wrap justify-between items-center mb-8">
			<div class="mb-6 md:mb-0 flex items-center space-x-2">
			  <img src="logo-bds.png" alt="BDS" class="w-8 h-8">
			  <span class="text-xl font-bold uppercase">BDS Cesi Nancy</span>
			</div>
			<div class="w-full md:w-auto flex justify-between space-x-12">
			  <div>
				<h2 class="text-sm font-bold mb-4 uppercase ml-4">Resources</h2>
				<ul>
				  <li><Button href="#" variant="link" class="text-white">Flowbite</Button></li>
				  <li><Button href="#" variant="link" class="text-white">Tailwind CSS</Button></li>
				</ul>
			  </div>
			  <div>
				<h2 class="text-sm font-bold mb-4 uppercase ml-4">suivez nous</h2>
				<ul>
				  <li><Button href="#" variant="link" class="text-white">Instagram</Button></li>
				  <li><Button href="#" variant="link" class="text-white">Discord</Button></li>
				  <li><Button href="#" variant="link" class="text-white">YouTube</Button></li>
				</ul>
			  </div>
			  <div>
				<h2 class="text-sm font-bold mb-4 uppercase ml-4">Légal</h2>
				<ul>
				  <li><Button href="#" variant="link" class="text-white">Politique de confidentialité</Button></li>
				  <li><Button href="#" variant="link" class="text-white">Termes et conditions d'utilisation</Button></li>
				</ul>
			  </div>
			</div>
		  </div>
		  <Separator class="w-full"/>
		  <div class="flex pt-4 justify-between">
			<p>© {new Date().getFullYear()} BDS Cesi Nancy Tous droits.</p>
			<div class="flex justify-center space-x-4">
			  <Button href="https://www.instagram.com/bds_cesi_nancy/" class="text-white" variant="ghost"><Instagram/></Button>
			  <Button href="https://www.discord.gg/tMNdRkJgDA" class="text-white" variant="ghost"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-discord" viewBox="0 0 16 16">
				<path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
			  </svg></Button>
			  <Button href="https://www.youtube.com/@BDSCESINANCY" class="text-white" variant="ghost"><Youtube/></Button>
			  <Button href="https://www.linkedin.com/company/bureau-des-sports-cesi-nancy" class="text-white" variant="ghost"><Linkedin/></Button>
			</div>
		  </div>
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