<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate, invalidateAll } from '$app/navigation';

	export let data;

	const clubs = data.clubs;
</script>

<main id="app">
	<a href="/clubs/manage/create">Créer un club</a>

	<table>
		<thead>
			<tr>
				<th>Nom</th>
				<th>Description</th>
				<th>Président</th>
				<th>Publications</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
			{#each clubs as club}
				<tr>
					<td>{club.name}</td>
					<td>{club.description}</td>
					<td>{club.owner?.fullName}</td>
					<td>{club.posts.length}</td>
					<td>
						<a href={`/clubs/manage/${encodeURIComponent(club._id.toString())}`}>Editer</a>
						-
						<form
							method="POST"
							action={`/clubs/manage/${encodeURIComponent(club._id.toString())}?/delete`}
							use:enhance
						>
							<button>Supprimer</button>
						</form>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
	}

	table,
	th,
	td {
		border: 1px solid black;
		padding: 0.5rem;
	}
</style>
