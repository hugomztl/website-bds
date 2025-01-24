<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { BlogPostType } from '$lib/models/BlogPost.js';
	import Event from './Event.svelte';
	import * as Tabs from "$lib/components/ui/tabs";
	import { Plus} from 'lucide-svelte';
	import { Button } from "$lib/components/ui/button";



	export let data;

	$: posts = data.posts;
	$: events = data.events.filter((event) => event.startDate >= new Date());
	$: pastEvents = data.events.filter((event) => event.startDate < new Date());

	function formatDate(d: Date) {
		const h = String(d.getHours()).padStart(2, '0'),
			m = String(d.getMinutes()).padStart(2, '0'),
			s = String(d.getSeconds()).padStart(2, '0');
		return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} à ${h}:${m}:${s}`;
	}

	function deletePost(post: Pick<BlogPostType, 'title' | '_id'>) {
		if (!confirm(`Voulez-vous supprimer le post: ${post.title}`)) return;

		const data = new FormData();
		data.set('postId', post._id.toString());

		fetch('/dashboard/blog?/deletePost', { body: data, method: 'POST' }).then(() => {
			invalidate('dashboard:all');
		});
	}
</script>

<div class="container mt-[5%]">
	<Tabs.Root value="dashboard">
		<Tabs.List>
		  <Tabs.Trigger value="dashboard">Apperçu</Tabs.Trigger>
		  <Tabs.Trigger value="eventManage">Évènements</Tabs.Trigger>
		  <Tabs.Trigger value="userManage">Utilisateurs</Tabs.Trigger>
		  <Tabs.Trigger value="clubManage">Clubs</Tabs.Trigger>
		  <Tabs.Trigger value="blogManage">Blogs</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="dashboard">
		  Statistiques ici
		</Tabs.Content>
		<Tabs.Content value="eventManage">
				<div
					class="rounded-container-token bg-surface-400-500-token text-on-surface-token relative col-span-1 row-span-1 m-4 p-4 shadow-md"
				>
					<h2 class="h2">Évènements</h2>
			
					<Button href="/dashboard/events/create" variant="ghost">
						<Plus class="mr-1" />Nouvel évènement
					</Button>
			
					<ul class="list">
						{#each events as event}
							<Event {event}/>
						{:else}
							Aucun évènement!{/each}
					</ul>
			
					<h2 class="h2">Évènements passés</h2>
			
					<ul class="list">
						{#each pastEvents as event}
							<Event {event}/>
						{:else}
							Aucun évènement passé!{/each}
					</ul>
				</div>
		</Tabs.Content>
		<Tabs.Content value="userManage">Gestion des utilisateurs ici</Tabs.Content>
		<Tabs.Content value="clubManage">Gestion des clubs ici</Tabs.Content>
		<Tabs.Content value="blogManage">
			<div
			class="rounded-container-token bg-surface-400-500-token text-on-surface-token relative col-span-1 row-span-1 m-4 p-4 shadow-md"
		>
			<h2 class="h2 mb-4">Blog</h2>
	
			<a href="/dashboard/blog/create" class="btn variant-filled-primary">Rédiger un nouveau post</a>
	
			<div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
				{#each posts as blogPost}
					<div>
						<div
							class="rounded-container-token bg-surface-600-300-token flex max-h-48 flex-col overflow-clip text-ellipsis !rounded-b-none p-2 shadow-sm"
						>
							<h3>{blogPost.title}</h3>
							<p>Publié le {formatDate(blogPost.createdAt)}</p>
							<p>
								Par <a
									class="anchor text-primary-400-500-token"
									href="/profile/{blogPost.createdBy._id}">{blogPost.createdBy.fullName}</a
								>
							</p>
							<p class="blog-content overflow-y-auto overflow-x-hidden pr-4 text-justify">
								{blogPost.content}
							</p>
						</div>
						<div class="rounded-container-token btn-group variant-filled flex w-full !rounded-t-none">
							<a href="dashboard/blog/{blogPost._id}" class="btn flex-grow">Modifier</a>
							<button class="btn flex-grow" on:click={() => deletePost(blogPost)}>Supprimer</button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	
		</Tabs.Content>
	</Tabs.Root>	
</div>
