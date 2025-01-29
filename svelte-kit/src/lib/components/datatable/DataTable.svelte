<!-- FIXME: améliorer le CRUD utilisateurs (mettre en place les actions désactiver compte, modifier etc) 
 se baser sur https://www.shadcn-svelte.com/docs/components/data-table 
 ya pas mal de fonctionnalité avec le composant qui seraient intéressante :
 - formattage des cellules
 - tri/filtres
 - pagination
 - champ de recherche
 - selection de ligne
 - actions (CRUD)
  -->

<script lang="ts">
	import { createTable, Render, Subscribe } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import type { User } from '$lib/models/User'; //FIXME: jsp pk il met une erreur ici quand j'importe le type

	export let data: User[];

	const table = createTable(readable(data));

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
			header: 'Identifiant'
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<div class="rounded-md border">
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
					<Table.Row>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
								<Table.Head {...attrs}>
									<Render of={cell.render()} />
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
