<!-- FIXME: améliorer le CRUD utilisateurs (mettre en place les actions désactiver compte, modifier etc) 
 se baser sur https://www.shadcn-svelte.com/docs/components/data-table 
 ya pas mal de fonctionnalité avec le composant qui seraient intéressante :
 - formattage des cellules
 - tri/filtres ✓
 - pagination ✓
 - champ de recherche ✓
 - selection de ligne
 - actions (CRUD)
  -->

<script lang="ts">
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import {
		addPagination,
		addSortBy,
		addTableFilter,
		addSelectedRows
	} from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { ArrowUpDown, ChevronLeft, ChevronRight, UserSearch } from 'lucide-svelte/icons';
	import type { UserType } from '$lib/models/User';
	import DataTableCheckbox from './DataTableCheckbox.svelte';

	export let data: UserType[];
	export let userCount: number;

	const table = createTable(readable(data), {
		page: addPagination(),
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		}),
		select: addSelectedRows()
	});

	const columns = table.createColumns([
		table.column({
			accessor: '_id',
			header: (_, { pluginStates }) => {
				const { allPageRowsSelected } = pluginStates.select;
				return createRender(DataTableCheckbox, {
					checked: allPageRowsSelected,
					mongoId: 'Identifiant'
				});
			},
			cell: ({ row }, { pluginStates }) => {
				const { getRowState } = pluginStates.select;
				const { isSelected } = getRowState(row);

				return createRender(DataTableCheckbox, {
					checked: isSelected,
					mongoId: row.original._id
				});
			},
			plugins: {
				sort: {
					disable: true
				}
			}
		}),
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
			cell: ({ row }) => (row.original.admin ? 'Oui' : 'Non'), //FIXME: je crois que c'est pas la bonne façon de faire
			plugins: {
				sort: {
					disable: true
				}
			}
		}),
		table.column({
			accessor: 'license',
			header: 'Licence',
			cell: ({ row }) => (row.original.license ? 'Oui' : 'Non'), //FIXME: je crois que c'est pas la bonne façon de faire
			plugins: {
				sort: {
					disable: true
				}
			}
		}),
		table.column({
			accessor: 'dateInscription',
			header: "Date d'Inscription",
			cell: ({ row }) => new Date(row.original.dateInscription).toLocaleDateString('fr-FR') //FIXME: je crois que c'est pas la bonne façon de faire
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns, rows } =
		table.createViewModel(columns);
	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
	const { selectedDataIds } = pluginStates.select;
</script>

<div class="my-5 flex items-center justify-between">
	<span class="font-Roboto font-bold uppercase">{userCount} utilisateurs</span>
	<div class="relative w-full max-w-56">
		<UserSearch class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500" />
		<Input
			type="text"
			placeholder="Rechercher id, nom, email..."
			class="pl-10"
			bind:value={$filterValue}
		/>
	</div>
</div>

<div>
	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs} class="[&:has([role=checkbox])]:pl-3">
										{#if cell.id != '_id' && cell.id != 'admin' && cell.id != 'license'}
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
						<Table.Row {...rowAttrs} data-state={$selectedDataIds[row.id] && 'selected'}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										{#if cell.id === '_id'}
											<div class="-ml-1 flex">
												<Render of={cell.render()} />
											</div>
										{:else}
											<div class="ml-4 flex">
												<Render of={cell.render()} />
											</div>
										{/if}
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-between space-y-5">
		<div class="text-muted-foreground text-sm">
			{Object.keys($selectedDataIds).length} sur{' '}
			{$rows.length} ligne(s) selectionées
		</div>
		<div class="flex justify-between space-x-5">
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
</div>
