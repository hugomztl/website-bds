<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Table from '$lib/components/ui/table';

	export let data;
</script>

<Table.Root>
	<Table.Caption>Fin</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[100px]">Club</Table.Head>
			<Table.Head>Description</Table.Head>
			<Table.Head class="text-right">Action</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each data.pendingClubs as club}
			<Table.Row>
				<Table.Cell class="font-medium">{club.name}</Table.Cell>
				<Table.Cell>{club.description}</Table.Cell>
				<Table.Cell class="text-right">
					<form method="POST" action="/clubs?/acceptClub" use:enhance>
						<input type="hidden" name="id" value={club._id} />
						<button class="btn variant-filled-success"> Accepter </button>
					</form>
					<form method="POST" action="/clubs?/rejectClub" use:enhance>
						<input type="hidden" name="id" value={club._id} />
						<button class="btn variant-outline-error text-error-600"> Supprimer la demande </button>
					</form>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
