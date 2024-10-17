<script lang="ts">
	import { enhance } from '$app/forms';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { Check, Clock, X } from 'lucide-svelte';

	export let data;

	function canManageClub(club: (typeof data.clubs)[number]) {
		return data.session?.user?.isAdmin || club.owner?._id === data.session?.user?.id;
	}
</script>

<main class="container m-auto">
	<h1>Clubs:</h1>

	{#if data.session?.user}
		<a href="/clubs/create">Créer un club</a>
	{/if}

	{#if data.session?.user?.isAdmin}
		<h2>Clubs en attente</h2>

		{#if data.pendingClubs && data.pendingClubs.length > 0}
			<Accordion>
				<AccordionItem>
					<svelte:fragment slot="lead"><Clock /></svelte:fragment>
					<svelte:fragment slot="summary">
						[{data.pendingClubs.length}] club(s) en attente
					</svelte:fragment>
					<svelte:fragment slot="content">
						{#each data.pendingClubs as club}
							<div class="container">
								<p><b>{club.name}</b></p>
								<p>{club.description}</p>

								<div class="btn-group">
									<form method="POST" action="?/acceptClub" use:enhance>
										<input type="hidden" name="id" value={club._id} />
										<button class="btn variant-filled-success">
											<Check />
											Accepter
										</button>
									</form>
									<form method="POST" action="?/rejectClub" use:enhance>
										<input type="hidden" name="id" value={club._id} />
										<button class="btn variant-outline-error text-error-600">
											<X />
											Refuser
										</button>
									</form>
								</div>
							</div>
						{/each}
					</svelte:fragment>
				</AccordionItem>
			</Accordion>
		{:else}
			<p class="text-gray-500">Aucun club en attente pour le moment</p>
		{/if}
	{:else if data.pendingClubs && data.pendingClubs.length > 0}
		<h2>Mes clubs en attente</h2>

		<Accordion>
			<AccordionItem>
				<svelte:fragment slot="lead"><Clock /></svelte:fragment>
				<svelte:fragment slot="summary">
					[{data.pendingClubs.length}] club(s) en attente
				</svelte:fragment>
				<svelte:fragment slot="content">
					{#each data.pendingClubs as club}
						<div class="container">
							<p><b>{club.name}</b></p>
							<p>{club.description}</p>

							<form method="POST" action="?/cancelRequest" use:enhance>
								<input type="hidden" name="id" value={club._id} />
								<button class="btn variant-outline-error text-error-600">
									<X />
									Supprimer la demande
								</button>
							</form>
						</div>
					{/each}
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	{/if}

	{#each data.clubs as club}
		<a href={`/clubs/${club._id}`}>
			<div class="club">
				{#if canManageClub(club)}
					<div class="club-header">
						<a href={`/clubs/${club._id}/manage`}>
							<svg
								class="pen-icon"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width="24"
								height="24"
							>
								<path fill="none" d="M0 0h24v24H0z" />
								<path
									d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
								/>
							</svg>
						</a>
					</div>
				{/if}
				<h2>{club.name}</h2>
				<p>{club.description}</p>
				{#if club.owner}
					<p>Président: {club.owner.fullName}</p>
				{:else}
					<p>Actuellement sans président</p>
				{/if}
			</div>
		</a>
	{:else}
		<h2>Aucun club pour le moment</h2>
	{/each}
</main>

<style>
	.club {
		border: 1px solid #ccc;
		padding: 1rem;
		margin: 1rem 0;
	}

	h2 {
		margin: 0;
	}

	.club-header {
		display: flex;
		justify-content: end;
		align-items: center;
	}

	a {
		text-decoration: none;
		color: inherit;
	}
</style>
