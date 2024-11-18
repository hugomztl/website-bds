<script lang="ts">
	import { Volume2, VolumeX } from 'lucide-svelte';
	import Marquee from './Marquee.svelte';
	import { browser } from '$app/environment';
	import Calendar from '@event-calendar/core';
	import DayGrid from '@event-calendar/day-grid';
	import TimeGrid from '@event-calendar/time-grid';
	import List from '@event-calendar/list';
	import '@event-calendar/core/index.css';
	import { getModalStore } from '@skeletonlabs/skeleton';

	export let data;

	let modalStore = getModalStore();

	let isMuted = true;

	// Ajout des variables manquantes
	let dateFilter = '';
	let prixFilter = '';
	let tagFilter = '';

	// Exemple de données d'événements (à remplacer par vos vraies données)
	let evenements = data.events;

	let partenaires = [
		{ nom: 'FFSU', logo: '/logos/ffsu.png' },
		{ nom: "Jeun'Est", logo: '/logos/jeun_est.png' },
		{ nom: 'Race System', logo: '/logos/race_system.png' },
		{ nom: "Caisse d'Épargne", logo: '/logos/caisse_epargne.png' }
		// Ajoutez d'autres partenaires selon vos besoins
	];

	let plugins: Calendar.Plugin[] = [DayGrid, TimeGrid, List];
	$: options = {
		view: 'dayGridMonth',
		headerToolbar: {
			start: 'prev,next today',
			center: 'title',
			end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
		},
		firstDay: 1,
		events: evenements.map((evt) => ({
			id: evt._id.toString(),
			start: evt.startDate,
			end: evt.endDate,
			title: evt.title
		})),
		eventClick(info) {
			const event = evenements.find((evt) => evt._id.toString() === info.event.id);

			if (!event) return;

			modalStore.trigger({
				title: event.title,
				body: event.description,
				type: 'alert',
				buttonTextCancel: 'Fermer'
			});
		},
		buttonText: {
			close: 'Fermer',
			dayGridMonth: 'mois',
			listDay: 'liste',
			listMonth: 'liste',
			listWeek: 'liste',
			listYear: 'liste',
			resourceTimeGridDay: 'ressources',
			resourceTimeGridWeek: 'ressources',
			resourceTimelineDay: 'timeline',
			resourceTimelineMonth: 'timeline',
			resourceTimelineWeek: 'timeline',
			timeGridDay: 'jour',
			timeGridWeek: 'semaine',
			today: "aujourd'hui"
		}
	} satisfies Calendar.Options;
</script>

<main class="bg-surface-50-900-token flex min-h-screen flex-col">
	<section class="relative h-screen w-full overflow-hidden">
		<video autoplay loop class="absolute inset-0 h-full w-full object-cover" bind:muted={isMuted}>
			<source src="motivation.mp4" type="video/mp4" />
			<track kind="captions" src="" srclang="fr" label="Français" />
			Votre navigateur ne supporte pas la vidéo HTML5.
		</video>

		<div class="absolute inset-0 bg-black/50"></div>

		<div class="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
			<h1 class="h1 mb-8 text-center text-5xl font-bold md:text-7xl">PRÊT À TE DÉPASSER ?</h1>
			<a
				href="/register"
				class="btn btn-xl hover:bg-primary-500 border-2 border-none bg-transparent text-white transition-colors duration-300 hover:text-black"
			>
				<span>Rejoins le BDS</span>
				<span>&rarr;</span>
			</a>
		</div>

		<button on:click={() => (isMuted = !isMuted)} class="btn-icon absolute right-4 top-4 z-20">
			{#if isMuted}
				<VolumeX size={24} color="red" />
			{:else}
				<Volume2 size={24} color="white" />
			{/if}
		</button>
	</section>

	<section class="container mx-auto my-16 px-4">
		<div class="grid gap-8 md:grid-cols-2">
			<div class="card variant-soft p-6">
				<h2 class="h2 mb-4">NOTRE MISSION</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
			</div>
			<div class="card variant-soft p-6">
				<h2 class="h2 mb-4">NOTRE MISSION</h2>
				<p>Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.</p>
			</div>
		</div>
	</section>

	<section class=" variant-soft py-16">
		<div class="container mx-auto px-4">
			<h2 class="h2 mb-12 text-center">ÉVÉNEMENTS À VENIR</h2>

			<div>
				<!-- Ne marche pas en SSR 😥 -->
				{#if browser}
					<Calendar {options} {plugins} />
				{/if}
			</div>
		</div>
	</section>

	<section class="bg-surface-100-800-token py-16">
		<div class="container mx-auto px-4">
			<h2 class="h2 mb-12 text-center">NOS PARTENAIRES</h2>
			<div class="overflow-hidden">
				<Marquee {partenaires} scrollSpeedSec={partenaires.length * 2} />
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
