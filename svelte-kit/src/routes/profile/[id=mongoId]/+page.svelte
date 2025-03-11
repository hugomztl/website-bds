<script lang="ts">
	import { page } from '$app/stores';
	import { Badge } from '$lib/components/ui/badge';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import {
		ChevronRight,
		Plus,
		ShieldCheck,
		ShoppingCart,
		SquarePen,
		Users,
		Crown,
		Ellipsis,
		LogOut,
		TriangleAlert,
		Info,
		Check,
		UserCheck
	} from 'lucide-svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import User from 'lucide-svelte/icons/user';
	import * as Table from '$lib/components/ui/table';
	import * as Popover from '$lib/components/ui/popover';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Separator } from '$lib/components/ui/separator';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Progress } from '$lib/components/ui/progress';
	import { resolveRoute } from '$app/paths';
	import Footer from '$lib/components/footer.svelte';
	import { invalidateAll } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms';
	import { promos, sports } from '$lib/enums';
	import { toast } from 'svelte-sonner';

	export let data;
	$: user = data.user;
	$: sameUser = data.session?.user?.id === user._id.toString();
	$: trySession = 1;
	$: profilCompletion = 55; //TODO: calculer le pourcentage de complétion du profil dynamiquement en fonction des champs définis ou non dans la bdd

	$: clubs = data.clubs;

	let sheetOpen = false;

	const _superForm = superForm(data.form);
	const { form, enhance } = _superForm;

	function formSubmit() {
		// Ferme la fenêtre d'édition lors de l'enregistrement
		sheetOpen = false;
		toast.success('Profil mis à jour!');
	}
</script>

<main class="scrollbar-hide">
	<section class="container mt-[5%] w-full">
		<Card.Root class="border-none shadow-none">
			<Card.Header></Card.Header>
			<Card.Content>
				<div class="flex items-center">
					<Avatar.Root class="size-40">
						<!-- TODO: Avatar utilisaeur -->
						<Avatar.Image src="" alt="User Avatar" />
						<Avatar.Fallback class="no-underline"
							><User class="size-20 text-black dark:text-white" /></Avatar.Fallback
						>
					</Avatar.Root>
					<div class="ml-4">
						<h1 class="text-6xl">{user.fullName}</h1>
						{#if user.admin}
							<Badge class="mt-5 bg-blue-500"><ShieldCheck class="mr-1 w-5" />Admin</Badge>
						{/if}
					</div>
				</div>
			</Card.Content>
			<Separator class="my-2" />
			<Card.Footer class="justify-between">
				<p>Inscrit le {user.dateInscription?.toLocaleDateString() ?? 'N/A'}</p>
				{#if $page.data.session?.user?.isAdmin || user._id === $page.data.session?.user?.id}
					<a
						href={`/profile/${encodeURIComponent(user._id ?? '')}/edit`}
						class="text-blue-500 underline"
					>
						page edit (debug)
					</a>
					<Sheet.Root bind:open={sheetOpen}>
						<Sheet.Trigger asChild let:builder>
							<Button builders={[builder]} variant="ghost">
								<SquarePen class="mr-1" />
								Modifier
							</Button>
						</Sheet.Trigger>
						<Sheet.Content side="right">
							<Sheet.Header>
								<Sheet.Title>Modifier le profil</Sheet.Title>
								<Sheet.Description>
									Changez les informations de votre profil ici. Cliquez sur "Sauvegarder" pour
									valider les modifications ou appuyez sur la croix pour annuler.
								</Sheet.Description>
							</Sheet.Header>
							<form
								method="POST"
								action="?/editProfile"
								use:enhance
								class="mt-[5%]"
								on:submit={formSubmit}
							>
								<div>
									<label for="fullName">Nom complet:</label>
									<input
										type="text"
										id="fullName"
										name="fullName"
										bind:value={$form.fullName}
										required
									/>
								</div>

								<div>
									<label for="promo">Promo:</label>
									<select id="promo" name="promo" bind:value={$form.promo}>
										<option value="">Sélectionner une promo</option>
										{#each promos as promo}
											<option value={promo}>{promo}</option>
										{/each}
									</select>
								</div>

								<div>
									<p>Sports:</p>
									{#each sports as sport}
										<label>
											<input
												type="checkbox"
												name="sports"
												value={sport}
												bind:group={$form.sports}
												checked={$form.sports?.includes(sport)}
											/>
											{sport}
										</label>
									{/each}
								</div>

								<div>
									<label for="discord">Discord:</label>
									<input type="text" id="discord" name="discord" bind:value={$form.discord} />
								</div>

								<Button type="submit">Enregistrer les modifications</Button>
							</form>
						</Sheet.Content>
					</Sheet.Root>
				{/if}
			</Card.Footer>
		</Card.Root>
	</section>

	<section class="container mt-[2%] flex justify-between space-x-5">
		{#if profilCompletion != 100}
			<Card.Root class="w-1/3">
				<Card.Header>
					<Card.Title>Complétez votre profil</Card.Title>
					<Card.Description
						>{profilCompletion > 75
							? 'Vous y êtes presque !'
							: 'Dites-nous en un peu plus sur vous'}</Card.Description
					>
				</Card.Header>
				<Card.Content>
					<p class="text-6xl font-bold">{profilCompletion}<span class="text-3xl">%</span></p>
					<Progress value={profilCompletion} class="mt-2" />
				</Card.Content>
				<Card.Footer class="flex justify-center">
					<Button>
						<UserCheck class="mr-1" />
						Finaliser
					</Button>
				</Card.Footer>
			</Card.Root>
		{/if}
		<Card.Root class="w-1/3">
			<Card.Header>
				<Card.Title>Status FFSU</Card.Title>
				<Card.Description
					>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</Card.Description
				>
			</Card.Header>
			<Card.Content>
				{user.license ? 'Licencié' : 'Non licencié'}
			</Card.Content>
			<Card.Footer class="flex justify-center">
				{#if !user.license && sameUser}
					<a href="/ffsu">
						<Button class="bottom-0 bg-green-500">
							<ShoppingCart class="mr-1" />
							Acheter ma licence
						</Button>
					</a>
				{/if}
				{#if user.license && !user.licenseGenerated && sameUser}
					<div class="warning-banner">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="warning-icon"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path
								d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
							></path>
							<line x1="12" y1="9" x2="12" y2="13"></line>
							<line x1="12" y1="17" x2="12.01" y2="17"></line>
						</svg>
						<span class="warning-text"
							>Attention : Votre licence FFSU n'a pas encore été générée. Veuillez la générer dès
							que possible.</span
						>
					</div>
					<a href="/">
						<button
							class="btn flex transform items-center gap-2 rounded-md bg-blue-500 px-4 py-2 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-600"
						>
							Générer ma licence FFSU
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="inline-block"
							>
								<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
								<polyline points="7 10 12 15 17 10"></polyline>
								<line x1="12" y1="15" x2="12" y2="3"></line>
							</svg>
						</button>
					</a>
				{/if}
			</Card.Footer>
		</Card.Root>

		<Card.Root class="w-1/3">
			<Card.Header>
				<Card.Title>Informations du profil</Card.Title>
				<Card.Description
					>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</Card.Description
				>
			</Card.Header>
			<Card.Content>
				<p><b>Email :</b> {user.email}</p>
				<Separator />
				{#if user.promo}
					<p><b>Promotion :</b> {user.promo}</p>
				{/if}
				<Separator />
				{#if user.discord}
					<p><b>Discord :</b> {user.discord}</p>
				{/if}
			</Card.Content>
		</Card.Root>
	</section>

	<section class="container mt-[2%] w-full">
		<Card.Root>
			<Card.Header>
				<Card.Title>Mes clubs</Card.Title>
			</Card.Header>
			<Card.Content>
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head class="w-[20%]">Club</Table.Head>
							<Table.Head class="w-[20%]">Rejoint le</Table.Head>
							<Table.Head class="w-[20%]">Statut</Table.Head>
							<Table.Head class="w-[20%]">Licence FFSU requise</Table.Head>
							<Table.Head class="w-[20%]"></Table.Head>
						</Table.Row>
					</Table.Header>
				</Table.Root>
				<ScrollArea class="h-44">
					<Table.Root class="h-44">
						<Table.Body>
							{#each clubs as club}
								<Table.Row>
									<Table.Cell class="w-[20%] font-medium">{club.name}</Table.Cell>
									<Table.Cell class="w-[20%]"
										>{club.members.find((member) => member._id.toString() === user._id)?.joinedAt ??
											'Inconnu'}</Table.Cell
									>
									<Table.Cell class="w-[20%]">
										<div class="flex items-center">
											{#if club.owner?._id?.toString() === user._id}
												<Crown class="mr-1" />
												Président
											{:else}
												<Users class="mr-1" />
												Membre
											{/if}
										</div>
									</Table.Cell>
									<Table.Cell class="w-[20%]">
										{#if club.requireLicense && !user.license && trySession === 0}
											<Tooltip.Root>
												<Tooltip.Trigger>
													<Badge class="bg-red-500"><TriangleAlert class="mr-1 w-5" />Oui</Badge>
												</Tooltip.Trigger>
												<Tooltip.Content>
													<p>Vous avez épuisé vos séances d'essais pour ce club</p>
												</Tooltip.Content>
											</Tooltip.Root>
										{:else if club.requireLicense && !user.license && trySession != 0}
											<Tooltip.Root>
												<Tooltip.Trigger>
													<Badge class="bg-orange-500"><Info class="mr-1 w-5" />Oui</Badge>
												</Tooltip.Trigger>
												<Tooltip.Content>
													<p>Il vous reste {trySession} séance(s) d'essais pour ce club</p>
												</Tooltip.Content>
											</Tooltip.Root>
										{:else}
											<Badge class="bg-green-500"
												><Check class="mr-1 w-5" />{club.requireLicense ? 'Oui' : 'Non'}</Badge
											>
										{/if}
									</Table.Cell>
									<Table.Cell class="text-right">
										<Popover.Root portal={null}>
											<Popover.Trigger><Ellipsis /></Popover.Trigger>
											<Popover.Content class="flex w-auto space-x-2">
												<Tooltip.Root>
													<Tooltip.Trigger asChild let:builder>
														<AlertDialog.Root>
															<AlertDialog.Trigger>
																<Button builders={[builder]} variant="destructive" tabindex={-1}>
																	<LogOut />
																</Button>
															</AlertDialog.Trigger>
															<AlertDialog.Content>
																<AlertDialog.Header>
																	<AlertDialog.Title>Êtes-vous sûr ?</AlertDialog.Title>
																	<AlertDialog.Description>
																		Vous vous apprêtez à quitter le club <b>{club.name}</b>. Pour
																		rejoindre à nouveau ce club, vous devrez réeffectuer la demande
																		sur la page du club.
																	</AlertDialog.Description>
																</AlertDialog.Header>
																<AlertDialog.Footer>
																	<AlertDialog.Cancel>Annuler</AlertDialog.Cancel>
																	<AlertDialog.Action
																		class="bg-red-500"
																		on:click={async () => {
																			const formData = new FormData();
																			formData.append('_id', club._id.toString());
																			await fetch(`/clubs/${club._id}?/leave`, {
																				method: 'POST',
																				body: formData
																			});
																			await invalidateAll();
																		}}>Quitter</AlertDialog.Action
																	>
																</AlertDialog.Footer>
															</AlertDialog.Content>
														</AlertDialog.Root>
													</Tooltip.Trigger>
													<Tooltip.Content>
														<p>Quitter le club</p>
													</Tooltip.Content>
												</Tooltip.Root>

												<Tooltip.Root>
													<Tooltip.Trigger asChild let:builder>
														<Button
															builders={[builder]}
															variant="outline"
															href={resolveRoute('/clubs/[id]', { id: club._id.toString() })}
															tabindex={-1}
														>
															<ChevronRight />
														</Button>
													</Tooltip.Trigger>
													<Tooltip.Content>
														<p>Consulter la page du club</p>
													</Tooltip.Content>
												</Tooltip.Root>
											</Popover.Content>
										</Popover.Root>
									</Table.Cell>
								</Table.Row>
							{/each}
						</Table.Body>
					</Table.Root>
				</ScrollArea>
			</Card.Content>
			<Card.Footer class="flex justify-center">
				<Button variant="ghost" href="/clubs">
					<Plus class="mr-1" />
					Rejoindre un nouveau club
				</Button>
			</Card.Footer>
		</Card.Root>
	</section>
</main>

<Footer />
