<script lang="ts">
	import { page } from '$app/stores';
	import { Badge } from "$lib/components/ui/badge";
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Shield, ShoppingCart, SquarePen } from 'lucide-svelte';
	import * as Avatar from "$lib/components/ui/avatar";
	import User from 'lucide-svelte/icons/user';

	export let data;
	$: user = data.user;
	$: sameUser = data.session?.user?.id === user._id.toString();
</script>

<main>
	<section class="container w-full mt-[5%]">
		<Card.Root>
			<Card.Header>
		
			</Card.Header>
			<Card.Content>
				<div class="flex items-center">
					<Avatar.Root class="size-40">
						<!-- TODO: Avatar utilisaeur -->
						<Avatar.Image src="" alt="User Avatar" />
						<Avatar.Fallback class="no-underline"
							><User class="text-black dark:text-white size-20" /></Avatar.Fallback
						>
					</Avatar.Root>
					<div class="ml-4">
						<h1 class="text-6xl">{user.fullName}</h1>
						{#if user.admin}
							<Badge class="bg-orange-500 mt-5">Admin<Shield class="w-4 ml-1"/></Badge>	
						{/if}
						
					</div>
					
				</div>
				<p>Inscrit le {user.dateInscription?.toLocaleDateString() ?? 'N/A'}</p>
			</Card.Content>
			<Card.Footer>
				{#if $page.data.session?.user?.isAdmin || user._id === $page.data.session?.user?.id}
				<a href={`/profile/${encodeURIComponent(user._id ?? '')}/edit`} class="edit-profile-button">
					<Button class="bg-blue-500">
						Modifier le profil
						<SquarePen class="ml-2"/>
					</Button>
				</a>
			{/if}
			</Card.Footer>
		</Card.Root>
	</section>
	
	<section class="container mt-[2%] flex justify-between">

		<Card.Root class="w-[49%]">
		
			<Card.Header>
			  <Card.Title>Status FFSU</Card.Title>
			  <Card.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</Card.Description>
			</Card.Header>
			<Card.Content>
				{user.license ? 'Licencié' : 'Non licencié'}
				
			</Card.Content>
			<Card.Footer>
				{#if !user.license && sameUser}
				<a href="/ffsu">
					<Button class="bg-green-500">
						Acheter ma licence FFSU
						<ShoppingCart class="ml-2"/>
					</Button>
				</a>
				{/if}
				{#if user.license && !user.licenseGenerated && sameUser}
				<div class="warning-banner">
				<svg
				xmlns="http://www.w3.org/2000/svg"
				class="warning-icon"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				>
				<path
					d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
				></path>
				<line x1="12" y1="9" x2="12" y2="13"></line>
				<line x1="12" y1="17" x2="12.01" y2="17"></line>
				</svg>
				<span class="warning-text"
				>Attention : Votre licence FFSU n'a pas encore été générée. Veuillez la générer dès que
				possible.</span
				>
				</div>
				<a href="/">
				<button
				class="btn flex transform items-center gap-2 rounded-md bg-blue-500 px-4 py-2 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-600"
				>
				Générer ma licence FFSU
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="inline-block"
					>
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
					<polyline points="7 10 12 15 17 10"></polyline>
					<line x1="12" y1="15" x2="12" y2="3"></line>
				</svg>
			</button>
			</a>
			{/if}
			</Card.Footer>
		</Card.Root>

		<Card.Root class="w-[49%]">
			<Card.Header>
			  <Card.Title>Informations du profile</Card.Title>
			  <Card.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</Card.Description>
			</Card.Header>
			<Card.Content>
			<p><b>Email:</b> {user.email}</p>
			<p><b>Discord:</b> {user.discord ?? '🙅 Pas de discord'}</p>
			<p><b>Promo:</b> {user.promo ?? '🙅 Pas de promo'}</p>
			</Card.Content>
		  </Card.Root>

	</section>
	
	<section class="container w-full mt-[2%]">
	<Card.Root>
		<Card.Header>
			<Card.Title>Mes clubs</Card.Title>
		</Card.Header>
		<Card.Content>
			
			
		</Card.Content>
		
	</Card.Root>
	
	</section>
	

	
</main>