<script lang="ts" context="module">
	import { writable } from 'svelte/store';

	export let commandOpen = writable(false);
</script>

<script lang="ts">
	import '../app.postcss';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import * as Command from '$lib/components/ui/command/index.js';
	import { Separator } from '$lib/components/ui/separator';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import { toggleMode, ModeWatcher } from 'mode-watcher';
	import { ReceiptText, Calendar, Users } from 'lucide-svelte';
	import CreditCard from 'lucide-svelte/icons/credit-card';
	import Settings from 'lucide-svelte/icons/settings';
	import User from 'lucide-svelte/icons/user';
	import { LogOut, ShieldCheck } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';
	import { Shadow } from 'svelte-loading-spinners';
	import type { ClubType } from '$lib/models/Club';
	import type { UserType } from '$lib/models/User';

	$: session = $page.data.session;

	let shortcut = 'Ctrl+';
	let searchInput = '';

	let searchLoading = false;
	let clubs: ClubType[] = [];
	let users: UserType[] = [];

	let searchText = '';
	let debouceTimer: NodeJS.Timeout;

	async function search() {
		const result = await fetch('/api/search?q=' + encodeURIComponent(searchText));

		if (result.status !== 200) return;

		const json = await result.json();

		users = json.users;
		clubs = json.clubs;
		searchLoading = false;
	}

	function debouncedSearch() {
		searchLoading = true;
		users = [];
		clubs = [];

		clearTimeout(debouceTimer);
		debouceTimer = setTimeout(search, 300);
	}

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

		// Ajouter un listener pour les raccourcis clavier
		function handleKeydown(e: KeyboardEvent) {
			const key = e.key.toLowerCase();
			const ctrl = e.metaKey || e.ctrlKey;

			if (!ctrl) return;

			if (key === 'k') {
				e.preventDefault();
				$commandOpen = !$commandOpen;
			}
			if (key === 'p') {
				goto('/profile');
				e.preventDefault();
				$commandOpen = false;
			}
			if (key === 'l') {
				goto('/license');
				e.preventDefault();
				$commandOpen = false;
			}
			if (key === 'r') {
				goto('/settings');
				e.preventDefault();
				$commandOpen = false;
			}
			if (key === 'e') {
				if (session?.user) {
					signOut();
				} else {
					goto('/signin');
				}

				e.preventDefault();
				$commandOpen = false;
			}
		}

		document.addEventListener('keydown', handleKeydown);

		// Nettoyage lors du démontage du composant
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});

</script>

<ModeWatcher />
<!-- bg-white/70 shadow-xl backdrop-blur-md dark:border-gray-800 dark:bg-black/10 -->
<nav
	class="fixed top-0 z-50 w-[100vw] shadow-xl bg-background/95 supports-[backdrop-filter]:bg-background/60 backdrop-blur"
>
	<Command.Dialog bind:open={$commandOpen}>
		<Command.Input
			placeholder="Rechercher un membre, un club …"
			bind:value={searchInput}
			on:input={debouncedSearch}
		/>
		{#if !searchLoading}
			<Command.Empty>Aucun résultat.</Command.Empty>
		{/if}
		<Command.List>
			<Command.Group heading="Suggestions">
				<Command.Item>
					<Calendar class="mr-2 h-4 w-4" />
					<span>Évènements</span>
				</Command.Item>
				<Command.Item>
					<ReceiptText class="mr-2 h-4 w-4" />
					<span>Posts</span>
				</Command.Item>
				<Command.Item>
					<Users class="mr-2 h-4 w-4" />
					<span>Clubs</span>
				</Command.Item>
			</Command.Group>

			<Command.Separator />

			<Command.Group heading="Paramètres">
				<Command.Item
					onSelect={() => {
						goto('/profile');
						$commandOpen = false;
					}}
				>
					<User class="mr-2 h-4 w-4" />
					<span>Mon profile</span>
					<Command.Shortcut>{shortcut}P</Command.Shortcut>
				</Command.Item>
				<Command.Item
					onSelect={() => {
						goto('/license');
						$commandOpen = false;
					}}
				>
					<CreditCard class="mr-2 h-4 w-4" />
					<span>Ma licence</span>
					<Command.Shortcut>{shortcut}L</Command.Shortcut>
				</Command.Item>
				<Command.Item
					onSelect={() => {
						goto('/settings');
						$commandOpen = false;
					}}
				>
					<Settings class="mr-2 h-4 w-4" />
					<span>Réglages</span>
					<Command.Shortcut>{shortcut}R</Command.Shortcut>
				</Command.Item>
			</Command.Group>

			{#if searchInput !== ''}
				<Command.Separator />

				<Command.Group alwaysRender={searchLoading} heading="Utilisateurs">
					{#if searchLoading}
						<Command.Loading>
							<div class="my-5 flex justify-center">
								<Shadow color="darkgray" size="1" unit="rem" />
							</div>
						</Command.Loading>
					{/if}

					{#each users as user}
						<Command.Item>
							<!-- TODO: Avatar utilisateur -->
							<User class="mr-2 h-4 w-4" />
							<span>{user.fullName}</span>
						</Command.Item>
					{/each}
				</Command.Group>

				<Command.Separator />

				<Command.Group alwaysRender={searchLoading} heading="Clubs">
					{#if searchLoading}
						<Command.Loading>
							<div class="my-5 flex justify-center">
								<Shadow color="darkgray" size="1" unit="rem" />
							</div>
						</Command.Loading>
					{/if}

					{#each clubs as club}
						<Command.Item>
							<!-- TODO: Icône club -->
							<Users class="mr-2 h-4 w-4" />
							<span>{club.name}</span>
						</Command.Item>
					{/each}
				</Command.Group>
			{/if}
		</Command.List>
	</Command.Dialog>

	<div class="container mx-auto flex h-16 items-center justify-between px-4">
		<!-- Logo et navigation -->
		<div class="flex items-center space-x-4">
			<a href="/" class="flex items-center">
				<img src="/logo-bds.png" alt="logo BDS" class="h-16 w-auto" />
			</a>

			<div class="hidden items-center space-x-4 md:flex ">
				<Button href="/blog" variant="link">Blog</Button>
				<Separator orientation="vertical" class="h-6 bg-black dark:bg-white" />
				<Button href="/services" variant="link">Activités</Button>
				<Separator orientation="vertical" class="h-6 bg-black dark:bg-white" />
				<Button href="/contact" variant="link">Contact</Button>
				{#if session?.user && session.user.isAdmin}
				<Separator orientation="vertical" class="h-6 bg-black dark:bg-white" />
				<Button href="/dashboard" variant="link"><ShieldCheck class="mr-1 w-5"/>Administrateur</Button>
				{/if}
			</div>
		</div>

		<div class="flex items-center space-x-4">
			<div class="w-full flex-1 md:w-auto md:flex-none">
				<Button
					on:click={() => ($commandOpen = !$commandOpen)}
					type="button"
					class="focus-visible:ring-ring bg-background hover:bg-accent hover:text-accent-foreground text-muted-foreground relative inline-flex h-9 w-full items-center justify-start whitespace-nowrap rounded-md border px-4 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 sm:pr-12 md:w-40 lg:w-64 dark:border-white dark:bg-transparent dark:backdrop-blur-md"
					data-button-root=""
					><span class="hidden lg:inline-flex">Recherche …</span>
					<span class="inline-flex lg:hidden">Rechercher …</span>
					<kbd
						class="bg-muted pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex"
						data-svelte-h="svelte-1cdrngm"><span class="text-xs">{shortcut}</span>K</kbd
					></Button
				>
			</div>

			<Separator orientation="vertical" class="h-6 bg-black dark:bg-white" />

			{#if session?.user}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button
							variant="link"
							builders={[builder]}
							class="flex cursor-pointer items-center space-x-2"
						>
							<Avatar.Root>
								<!-- TODO: Avatar utilisaeur -->
								<Avatar.Image src="" alt="User Avatar" />
								<Avatar.Fallback class="no-underline"
									><User class="text-black dark:text-white" /></Avatar.Fallback
								>
							</Avatar.Root>
							<span class="hidden font-medium md:block">{session.user.name}</span>
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="w-56">
						<DropdownMenu.Item on:click={() => goto('/profile')}>
							<User class="mr-2 h-4 w-4" />
							<span>Mon profile</span>
							<DropdownMenu.Shortcut>{shortcut}P</DropdownMenu.Shortcut>
						</DropdownMenu.Item>
						<DropdownMenu.Item on:click={() => goto('/license')}>
							<CreditCard class="mr-2 h-4 w-4" />
							<span>Ma licence</span>
							<DropdownMenu.Shortcut>{shortcut}L</DropdownMenu.Shortcut>
						</DropdownMenu.Item>
						<DropdownMenu.Item on:click={() => goto('/settings')}>
							<Settings class="mr-2 h-4 w-4" />
							<span>Réglages</span>
							<DropdownMenu.Shortcut>{shortcut}R</DropdownMenu.Shortcut>
						</DropdownMenu.Item>
						<DropdownMenu.Item on:click={() => signOut()}>
							<LogOut class="mr-2 h-4 w-4" />
							<span>Se déconnecter</span>
							<DropdownMenu.Shortcut>{shortcut}E</DropdownMenu.Shortcut>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{:else}
				<Button on:click={() => goto('/signin')} variant="link"
					>Se connecter</Button
				>
			{/if}

			<Separator orientation="vertical" class="h-6 bg-black dark:bg-white" />

			<!-- Toggle Mode -->
			<Button
				on:click={toggleMode}
				variant="ghost"
				size="icon"
				class="hover:text-black dark:hover:bg-white"
			>
				<Sun class="h-5 w-5 dark:hidden" />
				<Moon class="hidden h-5 w-5 dark:block" />
			</Button>
		</div>
	</div>
</nav>

<slot />
