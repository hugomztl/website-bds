<!-- FIXME: améliorer le CRUD utilisateurs (mettre en place les actions désactiver compte, modifier etc) 
 se baser sur https://www.shadcn-svelte.com/docs/components/data-table 
 ya pas mal de fonctionnalité avec le composant qui seraient intéressante :
 - formattage des cellules
 - tri/filtres ✓
 - pagination ✓
 - champ de recherche
 - selection de ligne
 - actions (CRUD)
  -->

<script lang="ts">
	import { createTable, Render, Subscribe } from 'svelte-headless-table';
	import { addPagination, addSortBy } from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-svelte/icons';
	import type { User } from '$lib/models/User'; //FIXME: jsp pk il met une erreur ici quand j'importe le type

	export let data: User[];

	const table = createTable(readable(data), {
		page: addPagination(),
		sort: addSortBy()
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'fullName',
			header: 'Nom Complet'
		}),
		table.column({
			accessor: 'email',
			header: 'Email'
		}),
		table.column({
			accessor: 'promo',
			header: 'Promotion'
		}),
		table.column({
			accessor: 'admin',
			header: 'Administrateur',
			cell: ({ row }) => (row.original.admin ? 'Oui' : 'Non') //FIXME: je crois que c'est pas la bonne façon de faire
		}),
		table.column({
			accessor: 'license',
			header: 'Licence',
			cell: ({ row }) => (row.original.license ? 'Oui' : 'Non') //FIXME: je crois que c'est pas la bonne façon de faire
		}),
		table.column({
			accessor: 'dateInscription',
			header: "Date d'Inscription",
			cell: ({ row }) => new Date(row.original.dateInscription).toLocaleDateString('fr-FR') //FIXME: je crois que c'est pas la bonne façon de faire
		}),
		table.column({
			accessor: '_id',
			header: 'Identifiant',
			plugins: {
				sort: {
					disable: true
				}
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);
	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
</script>

<div>
	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs}>
										{#if cell.id != '_id'}
											<Button variant="ghost" on:click={props.sort.toggle}>
												<Render of={cell.render()} />
												<ArrowUpDown class={'ml-2 h-4 w-4'} />
											</Button>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										<Render of={cell.render()} />
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-center space-x-5 py-5">
		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}><ChevronLeft class="mr-1" />Précédent</Button
		>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}>Suivant<ChevronRight class="ml-1" /></Button
		>
	</div>
</div>
