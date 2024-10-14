<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { Search, User, Users } from 'lucide-svelte';
	import type { SvelteComponent } from 'svelte';

	export let parent: SvelteComponent;

	let clubs: { _id: string; name: string; description: string }[] = [];
	let users: { _id: string; fullName: string; email: string }[] = [];

	let searchText = '';
	let debouceTimer: NodeJS.Timeout;

	async function search() {
		const result = await fetch('/api/search?q=' + encodeURIComponent(searchText));

		if (result.status !== 200) return;

		const json = await result.json();

		users = json.users;
		clubs = json.clubs;
	}

	function debouncedSearch() {
		clearTimeout(debouceTimer);
		debouceTimer = setTimeout(search, 300);
	}

	search();

	onNavigate(parent.onClose);
</script>

<div
	class="modal-search card bg-surface-100/60 dark:bg-surface-500/30 mb-auto mt-8 w-full max-w-[800px] overflow-hidden shadow-xl backdrop-blur-lg"
>
	<header class="bg-surface-300-600-token flex items-center shadow-md">
		<Search class="ml-4 text-xl" />
		<input
			class="m-2 ml-4 w-full border-0 bg-transparent text-lg ring-0 focus:ring-0"
			type="search"
			placeholder="Rechercher..."
			bind:value={searchText}
			on:input={debouncedSearch}
		/>
	</header>
	<nav class="list-nav hide-scrollbar max-h-[480px] overflow-x-auto" tabindex="-1">
		<div class="p-4 text-sm font-bold">Membres</div>
		<ul>
			{#each users as user}
				<li class="text-lg">
					<a
						class="hover:variant-soft focus:!variant-filled-primary justify-between !rounded-none outline-0"
						href="/profile/{user._id}"
					>
						<div class="flex items-center gap-4">
							<User />
							<span class="flex-auto font-bold opacity-75">{user.fullName}</span>
						</div>
					</a>
				</li>
			{/each}
		</ul>

		<div class="p-4 text-sm font-bold">Clubs</div>
		<ul>
			{#each clubs as club}
				<li class="text-lg">
					<a
						class="hover:variant-soft focus:!variant-filled-primary justify-between !rounded-none outline-0"
						href="/clubs/{club._id}"
					>
						<div class="flex items-center gap-4">
							<Users />
							<span class="flex-auto font-bold opacity-75">{club.name}</span>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
	<footer
		class="modal-search-footer bg-surface-300-600-token hidden items-center gap-2 p-4 text-xs font-bold md:flex"
	>
		<div><kbd class="kbd">Esc</kbd> to close</div>
		<div><kbd class="kbd">Tab</kbd> to navigate</div>
		<div><kbd class="kbd">Enter</kbd> to select</div>
	</footer>
</div>
