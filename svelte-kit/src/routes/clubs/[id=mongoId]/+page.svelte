<script lang="ts">
	import { enhance } from '$app/forms';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let data;

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'top'
	};

	const licenseOk = data.club.requireLicense ? data.licensed : true;
	const canJoinClub = data?.session?.user?.isAdmin || (licenseOk && data.session);
</script>

<main id="app">
	<h1>{data.club.name}</h1>
	<p>{data.club.description}</p>

	{#if data.isOwner}
		<p>Tu es le propriétaire de ce club!</p>
	{:else if data.member?.pending === false}
		<p>Tu es dans ce club!</p>
	{:else if data.member?.pending === true}
		<p>Tu es en attente de validation.</p>
	{:else}
		<form method="POST" action="?/join" use:enhance>
			<button disabled={!canJoinClub} use:popup={popupHover}>Rejoindre le club</button>
			{#if !canJoinClub}
				{#if !data.session}
					<div class="card variant-filled-secondary p-4" data-popup="popupHover">
						<p>Vous devez être connecté pour rejoindre un club.</p>
						<div class="arrow variant-filled-secondary" />
					</div>

					<br />
					<span>Connecte-toi pour rejoindre le club</span>
				{:else if !licenseOk}
					<div class="card variant-filled-secondary p-4" data-popup="popupHover">
						<p>Vous devez être licensié pour rejoindre ce club.</p>
						<div class="arrow variant-filled-secondary" />
					</div>
				{/if}
			{/if}
		</form>
	{/if}
	{#if data.member}
		<form method="POST" action="?/leave" use:enhance>
			<button>Quitter le club</button>
		</form>
	{/if}

	<h2>Derniers posts du club</h2>
	{#each data.club.posts as post}
		<p>{post.title}</p>
	{:else}
		<p>Ce club n'a encore publié aucun post.</p>
	{/each}
</main>
