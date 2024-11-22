<script lang="ts">
	import '../app.postcss';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import * as Command from '$lib/components/ui/command/index.js';
	import { Separator } from '$lib/components/ui/separator';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import { toggleMode, ModeWatcher } from 'mode-watcher';
	import Calendar from 'lucide-svelte/icons/calendar';
	import Search from 'lucide-svelte/icons/search';
	import CreditCard from 'lucide-svelte/icons/credit-card';
	import Settings from 'lucide-svelte/icons/settings';
	import User from 'lucide-svelte/icons/user';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let isAuthenticated = false; // Simuler l'état d'authentification
	let open = false;

	onMount(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				open = !open;
			}
		}

		document.addEventListener('keydown', handleKeydown);

		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<ModeWatcher />
<nav
	class="sticky top-0 z-50 border-b border-gray-200 bg-opacity-75 backdrop-blur-lg dark:border-gray-800"
>
	<Command.Dialog bind:open>
		<Command.Input placeholder="Rechercher un membre, un club..." />
		<Command.List>
			<Command.Empty>Aucun résultat.</Command.Empty>
			<Command.Group heading="Suggestions">
				<Command.Item onSelect={() => goto('/profile')}>
					<Calendar class="mr-2 h-4 w-4" />
					<span>Évènements</span>
				</Command.Item>
			</Command.Group>
			<Command.Separator />
			<Command.Group heading="Paramètres">
				<Command.Item onSelect={() => goto('/profile')}>
					<User class="mr-2 h-4 w-4" />
					<span>Mon profile</span>
					<Command.Shortcut>⌘P</Command.Shortcut>
				</Command.Item>
				<Command.Item>
					<CreditCard class="mr-2 h-4 w-4" />
					<span>Ma licence</span>
					<Command.Shortcut>⌘B</Command.Shortcut>
				</Command.Item>
				<Command.Item>
					<Settings class="mr-2 h-4 w-4" />
					<span>Réglages</span>
					<Command.Shortcut>⌘S</Command.Shortcut>
				</Command.Item>
			</Command.Group>
		</Command.List>
	</Command.Dialog>

	<div class="container mx-auto flex h-16 items-center justify-between px-4">
		<!-- Logo et navigation -->
		<div class="flex items-center space-x-4">
			<a href="/" class="text-xl font-bold">Logo</a>
			<div class="hidden space-x-4 md:flex">
				<Button href="/about" variant="ghost">About</Button>
				<Button href="/services" variant="ghost">Services</Button>
				<Button href="/contact" variant="ghost">Contact</Button>
			</div>
		</div>

		<!-- Barre de recherche -->
		<div class="w-full flex-1 md:w-auto md:flex-none">
			<Button
				on:click={() => open = !open}
				type="button"
				class="focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground text-muted-foreground relative inline-flex h-9 w-full items-center justify-start whitespace-nowrap rounded-md border px-4 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 sm:pr-12 md:w-40 lg:w-64"
				data-button-root=""	
				><span class="hidden lg:inline-flex" data-svelte-h="svelte-1y8n1ih"
					>Recherche...</span
				> <span class="inline-flex lg:hidden" data-svelte-h="svelte-1fzukxx">Search...</span>
				<kbd
					class="bg-muted pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex"
					data-svelte-h="svelte-1cdrngm"><span class="text-xs">⌘</span>K</kbd
				></Button
			>
		</div>
		<!-- <div class="flex-grow items-center mx-4">
		<Button variant="outline" on:click={() => open = !open} class="flex justify-between">
			<Search/>
			Recherche
			<kbd
			class="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100">
			<span class="text-xs">ctrl</span>
			</kbd>
			+
			<kbd
			class="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100">
			<span class="text-xs">K</span>
			</kbd>
		</Button>	
	  </div> -->

		<!-- Actions utilisateur -->
		<div class="flex items-center space-x-4">
			{#if isAuthenticated}
				<div class="flex items-center space-x-2">
					<Avatar.Root>
						<Avatar.Image src="https://picsum.photos/seed/picsum/200/300" alt="User Avatar" />
						<Avatar.Fallback>U</Avatar.Fallback>
					</Avatar.Root>
					<span class="hidden font-medium md:block">Username</span>
				</div>
			{:else}
				<Button on:click={() => console.log('Redirect to login')} variant="default"
					>Se connecter</Button
				>
			{/if}

			<Separator orientation="vertical" class="h-6" />

			<!-- Toggle Mode -->
			<Button on:click={toggleMode} variant="outline" size="icon">
				<Sun class="h-5 w-5 dark:hidden" />
				<Moon class="hidden h-5 w-5 dark:block" />
			</Button>
		</div>
	</div>
</nav>
<slot />
