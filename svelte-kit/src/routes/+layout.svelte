<script lang="ts">
	import { SignOut } from '@auth/sveltekit/components';
	import '../app.postcss';
	import {
		AppShell,
		AppBar,
		LightSwitch,
		initializeStores,
		Modal,
		getModalStore,
		type ModalComponent
	} from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { Search } from 'lucide-svelte';
	import SearchModal from '$lib/components/SearchModal.svelte';

	initializeStores();
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	const modalRegistry: Record<string, ModalComponent> = {
		searchModal: { ref: SearchModal }
	};

	$: session = $page.data.session;
	const modalStore = getModalStore();

	onMount(() => {
		const searchEvent = (e: KeyboardEvent) => {
			if (e.key === 'k' && e.ctrlKey) {
				e.preventDefault();
				showSearchBar();
			}
		};
		document.addEventListener('keydown', searchEvent);

		return () => {
			document.removeEventListener('keydown', searchEvent);
		};
	});

	function showSearchBar() {
		modalStore.subscribe((modals) => {
			if (modals.length) return;

			modalStore.trigger({
				type: 'component',
				component: 'searchModal'
			});
		})();
	}
</script>

<Modal components={modalRegistry} />

<AppShell>
	<svelte:fragment slot="header">
		<AppBar class="shadow-xl">
			<svelte:fragment slot="lead">
				<div class="flex items-center gap-4">
					<button class="btn hover:variant-soft-primary ml-5 p-0">
						<a href="/"><img src="/logo-bds.png" class="w-20" alt="BDS" /></a>
					</button>
					{#if session?.user?.isAdmin}
						<a class="btn hover:variant-soft-primary variant-ghost-primary" href="/dashboard">
							Dashboard
						</a>
					{/if}
					<a class="btn hover:variant-soft-primary variant-ghost-primary" href="/blog">Blog</a>
				</div>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<div class="md:ml-4 md:inline">
					<button
						class="btn variant-soft hover:variant-soft-primary space-x-4"
						on:click={showSearchBar}
					>
						<Search />
						<span>Rechercher un membre ou un club</span>
						<small class="hidden md:inline-block">Ctrl+K</small>
					</button>
				</div>
				<LightSwitch class="mr-4" />
				{#if session}
					{@const user = session?.user}
					<div>
						<span>Bienvenue</span>
						<a href="/profile" class="anchor">{user?.name}</a>
						<br />
						<span class="text-black-900/50">{user?.email}</span>
					</div>
					<SignOut>
						<span slot="submitButton" class="btn variant-filled">Se déconnecter</span>
					</SignOut>
				{:else}
					<div class="">
						<a href="/signin" class="btn variant-filled">Se connecter</a>
						<a href="/register" class="btn variant-filled">Créer un compte</a>
					</div>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot></slot>
</AppShell>
