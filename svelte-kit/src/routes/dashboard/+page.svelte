<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { BlogPostType } from '$lib/models/BlogPost.js';
	import Event from './Event.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Plus, FileChartColumn, Frown, SquareDashedMousePointer, CircleOff } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { sports } from '$lib/enums';
	import * as Select from '$lib/components/ui/select';
	import Footer from '$lib/components/footer.svelte';
	import Chart from '$lib/components/Chart.svelte';
	import BlogPost from '$lib/components/BlogPost.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import PendingClubs from '$lib/components/pendingClubs.svelte';
	import ClubCard from '$lib/components/ClubCard.svelte';
	import { Separator } from '$lib/components/ui/separator';

	export let data;

	$: posts = data.posts;

	$: events = data.events.filter((event) => event.startDate >= new Date());
	$: pastEvents = data.events.filter((event) => event.startDate < new Date());
	// pour le système de filtre plus tard
	$: freeEvents = events.filter((event) => event.price === 0);
	$: sportsEvents = events.filter((event) => event.tag === 'sport');

	function formatDate(d: Date) {
		const h = String(d.getHours()).padStart(2, '0'),
			m = String(d.getMinutes()).padStart(2, '0'),
			s = String(d.getSeconds()).padStart(2, '0');
		return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} à ${h}:${m}:${s}`;
	}

	// Données fictives pour les graphiques TODO: récupérer les données depuis la base de données pour faire des stats (https://github.com/SauravKanchan/svelte-chartjs)
	const barChartData = {
		labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'],
		datasets: [
			{
				label: 'Licenciés 2025',
				backgroundColor: '#3182ce',
				borderColor: '#3182ce',
				data: [5, 12, 21, 14, 15, 6, 9]
			}
		]
	};

	const lineChartData = {
		labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'],
		datasets: [
			{
				label: 'Revenus 2025',
				backgroundColor: '#00FF00',
				borderColor: '#00FF00',
				data: [5, 8, 7, 13, 10, 27, 40],
				fill: false
			}
		]
	};

	const pieChartData = {
		labels: ['A5', 'A4', 'A3', 'CPI A2', 'CPI A1', 'Autre'],
		datasets: [
			{
				label: 'Répartition des adhérants selons les promos',
				data: [20, 4, 15, 10, 25, 17],
				backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#AC64AD'],
				fill: false
			}
		]
	};

	const radarChartData = {
		labels: ['BFC', 'Football', 'Volley', 'Ping Pong', 'Escalade', 'Basket', 'Handball'],
		datasets: [
			{
				label: 'Répartition des adhérants selons les clubs',
				backgroundColor: '#f56565',
				borderColor: '#f56565',
				data: [20, 33, 15, 5, 7, 10, 9],
				fill: false
			}
		]
	};

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'bottom'
			}
		},
		scales: {
			x: {
				display: true,
				title: {
					display: true,
					text: 'Mois'
				}
			},
			y: {
				display: true,
				title: {
					display: true,
					text: 'Valeurs'
				}
			}
		}
	};
</script>

<div class="container mb-[5%] mt-[5%]">
	<Tabs.Root value="dashboard">
		<Tabs.List>
			<Tabs.Trigger value="dashboard">Apperçu</Tabs.Trigger>
			<Tabs.Trigger value="eventManage">Évènements</Tabs.Trigger>
			<Tabs.Trigger value="userManage">Utilisateurs</Tabs.Trigger>
			<Tabs.Trigger value="clubManage">Clubs</Tabs.Trigger>
			<Tabs.Trigger value="blogManage">Blogs</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="dashboard">
			<div class="my-5 flex items-center justify-between">
				<span class="font-Roboto font-bold uppercase">Dashboard</span>
				<!-- pour la prochaine version TODO: script qui génère un rapport excel -->
				<Button href="/error" variant="secondary"
					><FileChartColumn class="mr-1" />Générer un rapport</Button
				>
			</div>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<Card.Root class="h-96">
					<Card.Content class="h-full">
						<Chart type="bar" data={barChartData} options={chartOptions} />
					</Card.Content>
				</Card.Root>
				<Card.Root class="h-96">
					<Card.Content class="h-full">
						<Chart type="line" data={lineChartData} options={chartOptions} />
					</Card.Content>
				</Card.Root>
				<Card.Root class="flex h-96 justify-center">
					<Card.Content class="h-full">
						<Chart
							type="pie"
							data={pieChartData}
							options={{
								plugins: {
									legend: {
										position: 'bottom'
									}
								}
							}}
						/>
					</Card.Content>
				</Card.Root>
				<Card.Root class="flex h-96 justify-center">
					<Card.Content class="h-full">
						<Chart
							type="radar"
							data={radarChartData}
							options={{
								plugins: {
									legend: {
										position: 'bottom'
									}
								},
								scales: {
									r: {
										max: 40,
										min: 0,
										ticks: {
											stepSize: 5
										}
									}
								}
							}}
						/>
					</Card.Content>
				</Card.Root>
			</div>
		</Tabs.Content>
		<Tabs.Content value="eventManage">
			<div class="my-5 flex items-center justify-between">
				<span class="font-Roboto font-bold uppercase">Évènements en cours</span>

				<div class="flex space-x-5">
					<!-- TODO: pour futur version, mettre en place des filtres -->
					<Select.Root>
						<Select.Trigger class="w-[180px]">
							<Select.Value placeholder="Filtrer" />
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="sport">Tag : Sport</Select.Item>
							<Select.Item value="free">Gratuit</Select.Item>
							<Select.Item value="ended">Passés</Select.Item>
						</Select.Content>
					</Select.Root>
					<!-- pour la prochaine version TODO: script qui génère un rapport excel -->
					<Button href="/dashboard/events/create" variant="secondary">
						<Plus class="mr-1" />Nouvel évènement
					</Button>
				</div>
			</div>

			<ul class="list">
				{#each events as event}
					<Event {event} />
				{:else}
					Aucun évènement!{/each}
			</ul>

			<h2 class="h2 my-5">Évènements passés</h2>

			<ul class="list">
				{#each pastEvents as event}
					<Event {event} />
				{:else}
					Aucun évènement passé!{/each}
			</ul>
		</Tabs.Content>
		<Tabs.Content value="userManage">Gestion des utilisateurs ici</Tabs.Content>
		<Tabs.Content value="clubManage">
			<div class="my-5 flex items-center justify-between">
				<span class="font-Roboto font-bold uppercase">{data.pendingClubs.length} en attente</span>
				<!-- pour la prochaine version TODO: script qui génère un rapport excel -->
				<Button href="/clubs/create" variant="secondary">
					<Plus class="mr-1" />Nouveau club
				</Button>
			</div>
			{#if data.pendingClubs && data.pendingClubs.length > 0}
				<PendingClubs {data} />
			{:else}
				<div class="flex items-center justify-center">
					<div class="flex-col items-center justify-center text-center">
						<CircleOff class="text-muted-foreground mx-auto mb-5 h-auto w-[10vw]" />
						<span class="font-Roboto text-muted-foreground font-bold uppercase"
							>Aucune demande de création pour le moment</span
						>
					</div>
				</div>
			{/if}
			<Separator class="my-5" />
			<div class="my-5 flex items-center justify-between">
				<span class="font-Roboto font-bold uppercase">{data.clubs.length} club(s)</span>
			</div>
			{#each data.clubs as club}
				<div class="mt-5">
					<a href={`/clubs/${club._id}`}>
						<ClubCard {club} />
					</a>
				</div>
			{:else}
				<div class="flex items-center justify-center">
					<div class="flex-col items-center justify-center text-center">
						<Frown class="text-muted-foreground mx-auto mb-5 h-auto w-[10vw]" />
						<span class="font-Roboto text-muted-foreground font-bold uppercase"
							>Aucun club pour le moment</span
						>
					</div>
				</div>
			{/each}
		</Tabs.Content>
		<Tabs.Content value="blogManage">
			<div class="mb-5 flex items-center justify-center space-x-5">
				<Button href="/dashboard/blog/create" variant="outline">
					<Plus class="mr-1" />Nouveau post
				</Button>
			</div>

			<div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
				{#each posts as post}
					<BlogPost {post} />
				{/each}
			</div>
		</Tabs.Content>
	</Tabs.Root>
</div>

<Footer />
