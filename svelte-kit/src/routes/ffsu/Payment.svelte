<script lang="ts">
	import { z } from 'zod';
	import { CalendarIcon, CircleAlert } from 'lucide-svelte';
	import type { SuperForm } from 'sveltekit-superforms';
	import type { zPendingLicense } from '$lib/models/PendingLicense';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import * as Popover from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { ChevronsUpDown, Check } from 'lucide-svelte';
	import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
	import * as Command from '$lib/components/ui/command/index.js';
	import countriesData from '$lib/data/countries.json';
	import { tick } from 'svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import departementsData from '$lib/data/departements.json';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import { Separator } from '$lib/components/ui/separator';
	import { cn } from '$lib/utils';
	import Calendrier from './Calendrier.svelte';

	let api: CarouselAPI;
	let current = 0;
	let count = 0;

	// FIXME: Bind la date à la valeur en string du formulaire avec le formattage correct
	let dateNaissDate: DateValue | undefined = undefined;

	$: if (api) {
		count = api.scrollSnapList().length;
		current = api.selectedScrollSnap() + 1;

		api.on('select', () => {
			current = api.selectedScrollSnap() + 1;
		});
	}

	export let user: {
		email: string;
		fullName: string;
	};

	const [prenom, nom] = user.fullName.split(' ');

	export let form: SuperForm<z.infer<typeof zPendingLicense>>;

	const { form: _form, enhance, submitting, errors, constraints } = form;

	let conditionsAcceptees = false;

	// Formatter pour afficher la date en format long
	const df = new DateFormatter('fr-FR', {
		dateStyle: 'long'
	});

	// Transformation des données en une liste d'objets
	const countries = Object.entries(countriesData).map(([code, name]) => ({
		value: code,
		label: name
	}));

	const departements = Object.entries(departementsData).map(([code, name]) => ({
		value: code,
		label: name as keyof typeof departementsData
	}));

	let open = false;
	let openDpt = false;
	let selectedCountry = '';

	// Fonction pour fermer le popover et remettre le focus sur le bouton déclencheur
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		openDpt = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<div class="border-none">
	<h2 class="text-4xl font-bold">Formulaire de paiement</h2>
	<Separator class="my-4" />
	<span class="text-muted-foreground"
		>{current === 1
			? '1 - Informations de base'
			: current === 2
				? '2 - Informations complémentaires'
				: current === 3
					? '3 - Informations sportives'
					: '4 - Finalisation'}</span
	>
	<!-- TODO: checker si tous les nouveaux inputs fonctionnent bien avec l'ancien backend -->
	<form method="POST" use:enhance class="mt-4">
		<div>
			<Carousel.Root bind:api class="w-full">
				<Carousel.Content>
					<Carousel.Item>
						<Card.Root class="h-full">
							<Card.Content class="grid grid-cols-4 gap-4">
								<div class="flex w-full max-w-sm flex-col gap-1.5">
									<Label for="email-2">Email*</Label>
									{#if $errors.email}
										<span class="error">{$errors.email}</span>
									{/if}
									<Input
										class="input"
										type="email"
										name="email"
										id="email-2"
										value={user.email}
										disabled
										required
									/>
								</div>

								<div class="flex w-full max-w-sm flex-col gap-1.5">
									<Label for="email-2">Nom de famille*</Label>
									{#if $errors.nom}
										<span class="error">{$errors.nom}</span>
									{/if}
									<Input
										class="input"
										type="text"
										name="nom"
										value={nom}
										required
										aria-invalid={$errors.nom ? 'true' : undefined}
										{...$constraints.nom}
										disabled
									/>
								</div>

								<div class="flex w-full max-w-sm flex-col gap-1.5">
									<Label for="email-2">Nom de naissance</Label>
									{#if $errors.nom_naissance}
										<span class="error">{$errors.nom_naissance}</span>
									{/if}
									<Input
										class="input"
										type="text"
										name="nom_naissance"
										aria-invalid={$errors.nom_naissance ? 'true' : undefined}
										bind:value={$_form.nom_naissance}
										{...$constraints.nom_naissance}
									/>
								</div>

								<div class="flex w-full max-w-sm flex-col gap-1.5">
									<Label for="email-2">Prénom*</Label>
									{#if $errors.prenom}
										<span class="error">{$errors.prenom}</span>
									{/if}
									<Input
										class="input"
										type="text"
										name="prenom"
										value={prenom}
										aria-invalid={$errors.prenom ? 'true' : undefined}
										{...$constraints.prenom}
										disabled
									/>
								</div>

								<div class="flex w-full max-w-sm flex-col gap-1.5">
									<Label for="sexe">Sexe*</Label>
									{#if $errors.sexe}
										<span class="error">{$errors.sexe}</span>
									{/if}
									<RadioGroup.Root bind:value={$_form.sexe} required>
										<div class="flex items-center space-x-2">
											<RadioGroup.Item value="M" id="masculin" />
											<Label for="masculin">Masculin</Label>
										</div>
										<div class="flex items-center space-x-2">
											<RadioGroup.Item value="F" id="feminin" />
											<Label for="feminin">Féminin</Label>
										</div>
										<RadioGroup.Input name="sexe" />
									</RadioGroup.Root>
								</div>

								<div class="flex w-full max-w-sm flex-col gap-1.5">
									<Label for="ville_naissance">Ville de naissance*</Label>
									{#if $errors.ville_naissance}
										<span class="error">{$errors.ville_naissance}</span>
									{/if}
									<Input
										class="input"
										type="text"
										name="ville_naissance"
										aria-invalid={$errors.ville_naissance ? 'true' : undefined}
										bind:value={$_form.ville_naissance}
										{...$constraints.ville_naissance}
									/>
								</div>

								<div class="flex w-full max-w-sm flex-col gap-1.5">
									<Label for="adresse1">Adresse 1*</Label>
									{#if $errors.adresse1}
										<span class="error">{$errors.adresse1}</span>
									{/if}
									<Input
										class="input"
										type="text"
										name="adresse1"
										required
										aria-invalid={$errors.adresse1 ? 'true' : undefined}
										bind:value={$_form.adresse1}
										{...$constraints.adresse1}
									/>
								</div>

								<div class="flex w-full max-w-sm flex-col gap-1.5">
									<Label for="adresse2">Adresse 2</Label>
									{#if $errors.adresse2}
										<span class="error">{$errors.adresse2}</span>
									{/if}
									<Input
										class="input"
										type="text"
										name="adresse2"
										aria-invalid={$errors.adresse2 ? 'true' : undefined}
										bind:value={$_form.adresse2}
										{...$constraints.adresse2}
									/>
								</div>

								<div class="flex w-full max-w-sm flex-col gap-1.5">
									<Label for="codepostal">Code postal*</Label>
									{#if $errors.codepostal}
										<span class="error">{$errors.codepostal}</span>
									{/if}
									<Input
										class="input"
										type="text"
										name="codepostal"
										required
										aria-invalid={$errors.codepostal ? 'true' : undefined}
										bind:value={$_form.codepostal}
										{...$constraints.codepostal}
									/>
								</div>

								<div class="flex w-full max-w-sm flex-col gap-1.5">
									<Label for="ville">Ville*</Label>
									{#if $errors.ville}
										<span class="error">{$errors.ville}</span>
									{/if}
									<Input
										class="input"
										type="text"
										name="ville"
										required
										aria-invalid={$errors.ville ? 'true' : undefined}
										bind:value={$_form.ville}
										{...$constraints.ville}
									/>
								</div>
							</Card.Content>
						</Card.Root>
					</Carousel.Item>

					<Carousel.Item>
						<Card.Root class="h-full">
							<Card.Content class="grid grid-cols-4 gap-4">
								<div class="flex w-full max-w-sm flex-col gap-1.5">
									<Label for="datenaiss">Date de naissance*</Label>
									{#if $errors.datenaiss}
										<span class="error">{$errors.datenaiss}</span>
									{/if}
									<Popover.Root>
										<Popover.Trigger asChild let:builder>
											<Button
												variant="outline"
												class={cn(
													'w-[280px] justify-start text-left font-normal',
													!dateNaissDate && 'text-muted-foreground'
												)}
												builders={[builder]}
											>
												<CalendarIcon class="mr-2 h-4 w-4" />
												{dateNaissDate
													? df.format(dateNaissDate.toDate(getLocalTimeZone()))
													: 'Choisir une date'}
											</Button>
										</Popover.Trigger>
										<Popover.Content class="w-auto p-0">
											<Calendrier bind:value={dateNaissDate} />
										</Popover.Content>
									</Popover.Root>
								</div>

								<div class="flex w-full max-w-sm flex-col gap-1.5">
									<Label for="pays_naissance">Pays de naissance*</Label>
									{#if $errors.pays_naissance}
										<span class="text-sm text-red-500">{$errors.pays_naissance}</span>
									{/if}
									<Popover.Root bind:open let:ids>
										<Popover.Trigger asChild let:builder>
											<Button
												builders={[builder]}
												variant="outline"
												role="combobox"
												aria-expanded={open}
												class="w-full justify-between"
												id={ids.trigger}
											>
												{selectedCountry || 'Sélectionnez un pays...'}
												<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</Popover.Trigger>
										<Popover.Content class="p-0">
											<Command.Root>
												<Command.Input placeholder="Rechercher un pays..." class="h-9" />
												<Command.Empty>Aucun pays trouvé.</Command.Empty>
												<Command.Group>
													{#each countries as country}
														<Command.Item
															value={country.label}
															onSelect={(currentValue) => {
																selectedCountry =
																	countries.find((c) => c.label === currentValue)?.label || '';
																$_form.pays_naissance = selectedCountry;
																closeAndFocusTrigger(ids.trigger);
															}}
														>
															<span
																class="mr-2 flex h-4 w-4 items-center {selectedCountry ===
																country.label
																	? ''
																	: 'text-transparent'}"
															>
																<Check class="self-center" />
															</span>
															{country.label}
														</Command.Item>
													{/each}
												</Command.Group>
											</Command.Root>
										</Popover.Content>
									</Popover.Root>
								</div>

								<div class="flex w-full max-w-sm flex-col gap-1.5">
									<Label for="dpt_naissance">Département de naissance*</Label>
									{#if $errors.dpt_naissance}
										<span class="text-sm text-red-500">{$errors.dpt_naissance}</span>
									{/if}
									<Popover.Root bind:open={openDpt} let:ids>
										<Popover.Trigger asChild let:builder>
											<Button
												builders={[builder]}
												variant="outline"
												role="combobox"
												aria-expanded={openDpt}
												class="w-full justify-between"
												id={ids.trigger}
											>
												{$_form.dpt_naissance || 'Sélectionnez un département...'}
												<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</Popover.Trigger>
										<Popover.Content class="p-0">
											<Command.Root>
												<Command.Input placeholder="Rechercher un département..." class="h-9" />
												<Command.Empty>Aucun département trouvé.</Command.Empty>
												<Command.Group>
													{#each departements as dpt}
														<Command.Item
															value={dpt.label}
															onSelect={(currentValue) => {
																const dpt = departements.find(
																	(d) => d.label === currentValue
																)?.label;
																if (dpt) {
																	$_form.dpt_naissance = dpt;
																}
																closeAndFocusTrigger(ids.trigger);
															}}
														>
															<span
																class="mr-2 flex h-4 w-4 items-center {$_form.dpt_naissance ===
																dpt.label
																	? ''
																	: 'text-transparent'}"
															>
																<Check class="self-center" />
															</span>
															{dpt.label}
														</Command.Item>
													{/each}
												</Command.Group>
											</Command.Root>
										</Popover.Content>
									</Popover.Root>
								</div>

								<div class="flex w-full max-w-sm flex-col gap-1.5">
									<Label for="telephone">Téléphone</Label>
									{#if $errors.telephone}
										<span class="error">{$errors.telephone}</span>
									{/if}
									<Input
										class="input"
										type="tel"
										name="telephone"
										aria-invalid={$errors.telephone ? 'true' : undefined}
										bind:value={$_form.telephone}
										{...$constraints.telephone}
									/>
								</div>

								<div class="flex w-full max-w-sm flex-col gap-1.5">
									<Label for="instagram">Instagram</Label>
									{#if $errors.instagram}
										<span class="error">{$errors.instagram}</span>
									{/if}
									<Input
										class="input"
										type="text"
										name="instagram"
										aria-invalid={$errors.instagram ? 'true' : undefined}
										bind:value={$_form.instagram}
										{...$constraints.instagram}
									/>
								</div>

								<div class="flex w-full max-w-sm flex-col gap-1.5">
									<Label for="discipline">Domaine d'études*</Label>
									{#if $errors.discipline}
										<span class="error">{$errors.discipline}</span>
									{/if}
									<Input
										class="input"
										type="text"
										name="discipline"
										value="Ingénierie"
										aria-invalid={$errors.discipline ? 'true' : undefined}
										{...$constraints.discipline}
										disabled
									/>
								</div>
								<!-- <label>
						Discipline:
						
						<select
							name="discipline"
							aria-invalid={$errors.discipline ? 'true' : undefined}
							bind:value={$_form.discipline}
							{...$constraints.discipline}
						>
							<option value="1">Droit / Sciences Po.</option>
							<option value="2">Science Eco./Gestion</option>
							<option value="3">Lettres</option>
							<option value="4">Commerce</option>
							<option value="5">Sciences</option>
							<option value="6">Métiers du Sport</option>
							<option value="7">Langues</option>
							<option value="8">Médecine / Santé</option>
							<option value="9">Enseignement</option>
							<option value="10">Ingénierie</option>
							<option value="11">Dirigeant</option>
							<option value="12">Technique</option>
							<option value="13">Architecture</option>
							<option value="14">Communication</option>
							<option value="15">Animation</option>
							<option value="16">Sciences Humaines</option>
							<option value="17">Arts</option>
							<option value="18">Audiovisuel</option>
							<option value="19">Défense</option>
						</select>
					</label> -->
							</Card.Content>
						</Card.Root>
					</Carousel.Item>

					<Carousel.Item>
						<Card.Root class="h-full">
							<Card.Content class="grid grid-cols-4 gap-4">
								<div class="flex w-full max-w-sm flex-col gap-1.5">
									<Label for="autrefede">Autre fédération (sigle)</Label>
									{#if $errors.autrefede}
										<span class="error">{$errors.autrefede}</span>
									{/if}
									<Input
										class="input"
										type="text"
										name="autrefede"
										placeholder="Ex: FFF"
										aria-invalid={$errors.autrefede ? 'true' : undefined}
										{...$constraints.autrefede}
									/>
								</div>

								<div class="flex w-full max-w-sm flex-col gap-1.5">
									<Label for="sport">Sport principal*</Label>
									{#if $errors.sport}
										<span class="error">{$errors.sport}</span>
									{/if}
									<Select.Root bind:selected={$_form.sport} name="sport">
										<Select.Trigger class="w-full">
											<Select.Value placeholder="Sélectionnez un sport..." />
										</Select.Trigger>
										<Select.Content>
											<ScrollArea class="h-44">
												<Select.Group>
													<Select.Item value="Athlétisme - Courses hors stade"
														>Athlétisme - Courses hors stade</Select.Item
													>
													<Select.Item value="Aviron (en ligne,longue distance, de mer, indoor)"
														>Aviron (en ligne,longue distance, de mer, indoor)</Select.Item
													>
													<Select.Item value="Babyfoot">Babyfoot</Select.Item>
													<Select.Item value="Badminton">Badminton</Select.Item>
													<Select.Item value="Baseball - Softball">Baseball - Softball</Select.Item>
													<Select.Item value="Basket - Basket 3x3">Basket - Basket 3x3</Select.Item>
													<Select.Item value="Biathlon">Biathlon</Select.Item>
													<Select.Item value="Bowling">Bowling</Select.Item>
													<Select.Item value="Boxe éducative Assaut"
														>Boxe éducative Assaut</Select.Item
													>
													<Select.Item
														value="Boxe(s) Combat, plein contact (Anglaise, Kick Boxing K1 rules, Savate BF)"
														>Boxe(s) Combat, plein contact (Anglaise, Kick Boxing K1 rules, Savate
														BF)</Select.Item
													>
													<Select.Item value="Bridge">Bridge</Select.Item>
													<Select.Item value="Canoë-kayak">Canoë-kayak</Select.Item>
													<Select.Item value="Cheerleading">Cheerleading</Select.Item>
													<Select.Item value="Course d'orientation"
														>Course d'orientation</Select.Item
													>
													<Select.Item value="Cyclisme - VTT - BMX"
														>Cyclisme - VTT - BMX</Select.Item
													>
													<Select.Item value="Danse (toutes formes)"
														>Danse (toutes formes)</Select.Item
													>
													<Select.Item value="E-sport">E-sport</Select.Item>
													<Select.Item value="Echecs">Echecs</Select.Item>
													<Select.Item value="Equitation">Equitation</Select.Item>
													<Select.Item value="Escalade">Escalade</Select.Item>
													<Select.Item value="Escrime">Escrime</Select.Item>
													<Select.Item value="Fitness">Fitness</Select.Item>
													<Select.Item value="Fléchettes">Fléchettes</Select.Item>
													<Select.Item value="Football - Futsal">Football - Futsal</Select.Item>
													<Select.Item value="Football américain">Football américain</Select.Item>
													<Select.Item value="Force Athlétique">Force Athlétique</Select.Item>
													<Select.Item value="Golf">Golf</Select.Item>
													<Select.Item
														value="Gymnastiques : Artistique, GR, Team Gym, Trampoline, Parkour Gym"
														>Gymnastiques : Artistique, GR, Team Gym, Trampoline, Parkour Gym</Select.Item
													>
													<Select.Item value="Haltérophilie - Musculation"
														>Haltérophilie - Musculation</Select.Item
													>
													<Select.Item value="Handball - Beach Handball"
														>Handball - Beach Handball</Select.Item
													>
													<Select.Item value="Hockey">Hockey</Select.Item>
													<Select.Item value="Judo - Ju-Jitsu - Ne Waza"
														>Judo - Ju-Jitsu - Ne Waza</Select.Item
													>
													<Select.Item value="Karaté">Karaté</Select.Item>
													<Select.Item value="Karting">Karting</Select.Item>
													<Select.Item value="Kick Boxing - Muay-Thaï Light et Pré combat"
														>Kick Boxing - Muay-Thaï Light et Pré combat</Select.Item
													>
													<Select.Item value="Lutte - Sambo sportif - Beach Wrestling"
														>Lutte - Sambo sportif - Beach Wrestling</Select.Item
													>
													<Select.Item value="Nage avec palmes">Nage avec palmes</Select.Item>
													<Select.Item
														value="Natation - Natation synchronisée - Natation en eau libre"
														>Natation - Natation synchronisée - Natation en eau libre</Select.Item
													>
													<Select.Item value="Pancrace assaut">Pancrace assaut</Select.Item>
													<Select.Item value="Patinage artistique et de vitesse"
														>Patinage artistique et de vitesse</Select.Item
													>
													<Select.Item value="Pelote basque">Pelote basque</Select.Item>
													<Select.Item value="Pentathlon">Pentathlon</Select.Item>
													<Select.Item value="Pétanque">Pétanque</Select.Item>
													<Select.Item value="Roller hockey">Roller hockey</Select.Item>
													<Select.Item value="Rugby(s) (XV, X, 7, XIII)"
														>Rugby(s) (XV, X, 7, XIII)</Select.Item
													>
													<Select.Item value="Sauvetage sportif">Sauvetage sportif</Select.Item>
													<Select.Item value="Savate Boxe Française en assaut"
														>Savate Boxe Française en assaut</Select.Item
													>
													<Select.Item value="Skateboard - Trottinette"
														>Skateboard - Trottinette</Select.Item
													>
													<Select.Item value="Ski - Snowboard (toutes formes)"
														>Ski - Snowboard (toutes formes)</Select.Item
													>
													<Select.Item value="Squash">Squash</Select.Item>
													<Select.Item value="Surf - Stand Up Paddle"
														>Surf - Stand Up Paddle</Select.Item
													>
													<Select.Item value="Taekwondo">Taekwondo</Select.Item>
													<Select.Item value="Tennis - Padel - Beach Tennis"
														>Tennis - Padel - Beach Tennis</Select.Item
													>
													<Select.Item value="Tennis de table">Tennis de table</Select.Item>
													<Select.Item value="Tir à l'arc">Tir à l'arc</Select.Item>
													<Select.Item value="Tir sportif">Tir sportif</Select.Item>
													<Select.Item
														value="Triathlon et Disciplines enchainées : [Bike & Run, Duathlon, Raids multisports, Swimrun]"
														>Triathlon et Disciplines enchainées : [Bike & Run, Duathlon, Raids
														multisports, Swimrun]</Select.Item
													>
													<Select.Item value="Ultimate - Beach Ultimate"
														>Ultimate - Beach Ultimate</Select.Item
													>
													<Select.Item value="Voile - Kite Surf">Voile - Kite Surf</Select.Item>
													<Select.Item value="Volley - Beach Volley"
														>Volley - Beach Volley</Select.Item
													>
													<Select.Item value="Water-polo">Water-polo</Select.Item>
												</Select.Group>
											</ScrollArea>
										</Select.Content>
									</Select.Root>
								</div>

								<div>
									Activités sans contrainte particulière:
									<select
										name="cmnonrisque1"
										aria-invalid={$errors.cmnonrisque1 ? 'true' : undefined}
										bind:value={$_form.cmnonrisque1}
										{...$constraints.cmnonrisque1}
									>
										<option value="1">Aucune</option>
										<option value="59"> Multisports</option>
										<option value="2">Athlétisme - Courses hors stade</option>
										<option value="3">Aviron (en ligne,longue distance, de mer, indoor)</option>
										<option value="4">Badminton</option>
										<option value="5">Baseball - Softball</option>
										<option value="6">Basket - Basket 3x3</option>
										<option value="8">Bowling</option>
										<option value="9">Boxe éducative Assaut</option>
										<option value="11">Bridge</option>
										<option value="12">Canoë-kayak</option>
										<option value="13">Cheerleading</option>
										<option value="14">Course d'orientation</option>
										<option value="15">Cyclisme - VTT - BMX</option>
										<option value="16">Danse (toutes formes)</option>
										<option value="60">E-sport</option>
										<option value="17">Echecs</option>
										<option value="18">Equitation</option>
										<option value="19">Escalade</option>
										<option value="20">Escrime</option>
										<option value="21">Fitness</option>
										<option value="62">Fléchettes</option>
										<option value="22">Football - Futsal</option>
										<option value="23">Football américain</option>
										<option value="24">Force Athlétique</option>
										<option value="25">Golf</option>
										<option value="26"
											>Gymnastiques : Artistique, GR, Team Gym, Trampoline, Parkour Gym</option
										>
										<option value="27">Haltérophilie - Musculation</option>
										<option value="28">Handball - Beach Handball</option>
										<option value="29">Hockey</option>
										<option value="30">Judo - Ju-Jitsu - Ne Waza</option>
										<option value="31">Karaté</option>
										<option value="33">Kick Boxing- Muay-Thaï Light et Pré combat</option>
										<option value="34">Lutte - Sambo sportif - Beach Wrestling</option>
										<option value="35">Nage avec palmes</option>
										<option value="36"
											>Natation - Natation synchronisée - Natation en eau libre</option
										>
										<option value="61">Pancrace assaut</option>
										<option value="37">Patinage artistique et de vitesse</option>
										<option value="38">Pelote basque</option>
										<option value="40">Pétanque</option>
										<option value="41">Roller hockey</option>
										<option value="64">Rugby sans contact</option>
										<option value="42">Rugby(s) (XV, X, 7, XIII)</option>
										<option value="43">Sauvetage sportif</option>
										<option value="44">Savate Boxe Française en assaut</option>
										<option value="45">Skateboard - Trottinette</option>
										<option value="46">Ski - Snowboard (toutes formes)</option>
										<option value="47">Squash</option>
										<option value="48">Surf - Stand Up Paddle</option>
										<option value="49">Taekwondo</option>
										<option value="51">Tennis - Padel - Beach Tennis</option>
										<option value="50">Tennis de table</option>
										<option value="52">Tir à l'arc</option>
										<option value="54"
											>Triathlon et Disciplines enchainées : [Bike &amp; Run, Duathlon,Raids
											multisports, Swimrun]</option
										>
										<option value="55">Ultimate - Beach Ultimate</option>
										<option value="56">Voile - Kite Surf</option>
										<option value="57">Volley - Beach Volley</option>
										<option value="58">Water-polo</option>
									</select>
									{#if $errors.cmnonrisque1}
										<span class="error">{$errors.cmnonrisque1}</span>
									{/if}
									<select
										name="cmnonrisque2"
										required
										aria-invalid={$errors.cmnonrisque2 ? 'true' : undefined}
										bind:value={$_form.cmnonrisque2}
										{...$constraints.cmnonrisque2}
									>
										<option value="1">Aucune</option>
										<option value="59"> Multisports</option>
										<option value="2">Athlétisme - Courses hors stade</option>
										<option value="3">Aviron (en ligne,longue distance, de mer, indoor)</option>
										<option value="4">Badminton</option>
										<option value="5">Baseball - Softball</option>
										<option value="6">Basket - Basket 3x3</option>
										<option value="8">Bowling</option>
										<option value="9">Boxe éducative Assaut</option>
										<option value="11">Bridge</option>
										<option value="12">Canoë-kayak</option>
										<option value="13">Cheerleading</option>
										<option value="14">Course d'orientation</option>
										<option value="15">Cyclisme - VTT - BMX</option>
										<option value="16">Danse (toutes formes)</option>
										<option value="60">E-sport</option>
										<option value="17">Echecs</option>
										<option value="18">Equitation</option>
										<option value="19">Escalade</option>
										<option value="20">Escrime</option>
										<option value="21">Fitness</option>
										<option value="62">Fléchettes</option>
										<option value="22">Football - Futsal</option>
										<option value="23">Football américain</option>
										<option value="24">Force Athlétique</option>
										<option value="25">Golf</option>
										<option value="26"
											>Gymnastiques : Artistique, GR, Team Gym, Trampoline, Parkour Gym</option
										>
										<option value="27">Haltérophilie - Musculation</option>
										<option value="28">Handball - Beach Handball</option>
										<option value="29">Hockey</option>
										<option value="30">Judo - Ju-Jitsu - Ne Waza</option>
										<option value="31">Karaté</option>
										<option value="33">Kick Boxing- Muay-Thaï Light et Pré combat</option>
										<option value="34">Lutte - Sambo sportif - Beach Wrestling</option>
										<option value="35">Nage avec palmes</option>
										<option value="36"
											>Natation - Natation synchronisée - Natation en eau libre</option
										>
										<option value="61">Pancrace assaut</option>
										<option value="37">Patinage artistique et de vitesse</option>
										<option value="38">Pelote basque</option>
										<option value="40">Pétanque</option>
										<option value="41">Roller hockey</option>
										<option value="64">Rugby sans contact</option>
										<option value="42">Rugby(s) (XV, X, 7, XIII)</option>
										<option value="43">Sauvetage sportif</option>
										<option value="44">Savate Boxe Française en assaut</option>
										<option value="45">Skateboard - Trottinette</option>
										<option value="46">Ski - Snowboard (toutes formes)</option>
										<option value="47">Squash</option>
										<option value="48">Surf - Stand Up Paddle</option>
										<option value="49">Taekwondo</option>
										<option value="51">Tennis - Padel - Beach Tennis</option>
										<option value="50">Tennis de table</option>
										<option value="52">Tir à l'arc</option>
										<option value="54"
											>Triathlon et Disciplines enchainées : [Bike &amp; Run, Duathlon,Raids
											multisports, Swimrun]</option
										>
										<option value="55">Ultimate - Beach Ultimate</option>
										<option value="56">Voile - Kite Surf</option>
										<option value="57">Volley - Beach Volley</option>
										<option value="58">Water-polo</option>
									</select>
									{#if $errors.cmnonrisque2}
										<span class="error">{$errors.cmnonrisque2}</span>
									{/if}

									<select
										name="cmnonrisque3"
										required
										aria-invalid={$errors.cmnonrisque3 ? 'true' : undefined}
										bind:value={$_form.cmnonrisque3}
										{...$constraints.cmnonrisque3}
									>
										<option value="1">Aucune</option>
										<option value="59"> Multisports</option>
										<option value="2">Athlétisme - Courses hors stade</option>
										<option value="3">Aviron (en ligne,longue distance, de mer, indoor)</option>
										<option value="4">Badminton</option>
										<option value="5">Baseball - Softball</option>
										<option value="6">Basket - Basket 3x3</option>
										<option value="8">Bowling</option>
										<option value="9">Boxe éducative Assaut</option>
										<option value="11">Bridge</option>
										<option value="12">Canoë-kayak</option>
										<option value="13">Cheerleading</option>
										<option value="14">Course d'orientation</option>
										<option value="15">Cyclisme - VTT - BMX</option>
										<option value="16">Danse (toutes formes)</option>
										<option value="60">E-sport</option>
										<option value="17">Echecs</option>
										<option value="18">Equitation</option>
										<option value="19">Escalade</option>
										<option value="20">Escrime</option>
										<option value="21">Fitness</option>
										<option value="62">Fléchettes</option>
										<option value="22">Football - Futsal</option>
										<option value="23">Football américain</option>
										<option value="24">Force Athlétique</option>
										<option value="25">Golf</option>
										<option value="26"
											>Gymnastiques : Artistique, GR, Team Gym, Trampoline, Parkour Gym</option
										>
										<option value="27">Haltérophilie - Musculation</option>
										<option value="28">Handball - Beach Handball</option>
										<option value="29">Hockey</option>
										<option value="30">Judo - Ju-Jitsu - Ne Waza</option>
										<option value="31">Karaté</option>
										<option value="33">Kick Boxing- Muay-Thaï Light et Pré combat</option>
										<option value="34">Lutte - Sambo sportif - Beach Wrestling</option>
										<option value="35">Nage avec palmes</option>
										<option value="36"
											>Natation - Natation synchronisée - Natation en eau libre</option
										>
										<option value="61">Pancrace assaut</option>
										<option value="37">Patinage artistique et de vitesse</option>
										<option value="38">Pelote basque</option>
										<option value="40">Pétanque</option>
										<option value="41">Roller hockey</option>
										<option value="64">Rugby sans contact</option>
										<option value="42">Rugby(s) (XV, X, 7, XIII)</option>
										<option value="43">Sauvetage sportif</option>
										<option value="44">Savate Boxe Française en assaut</option>
										<option value="45">Skateboard - Trottinette</option>
										<option value="46">Ski - Snowboard (toutes formes)</option>
										<option value="47">Squash</option>
										<option value="48">Surf - Stand Up Paddle</option>
										<option value="49">Taekwondo</option>
										<option value="51">Tennis - Padel - Beach Tennis</option>
										<option value="50">Tennis de table</option>
										<option value="52">Tir à l'arc</option>
										<option value="54"
											>Triathlon et Disciplines enchainées : [Bike &amp; Run, Duathlon,Raids
											multisports, Swimrun]</option
										>
										<option value="55">Ultimate - Beach Ultimate</option>
										<option value="56">Voile - Kite Surf</option>
										<option value="57">Volley - Beach Volley</option>
										<option value="58">Water-polo</option>
									</select>
									{#if $errors.cmnonrisque3}
										<span class="error">{$errors.cmnonrisque3}</span>
									{/if}

									<select
										name="cmnonrisque4"
										required
										aria-invalid={$errors.cmnonrisque4 ? 'true' : undefined}
										bind:value={$_form.cmnonrisque4}
										{...$constraints.cmnonrisque4}
									>
										<option value="1">Aucune</option>
										<option value="59"> Multisports</option>
										<option value="2">Athlétisme - Courses hors stade</option>
										<option value="3">Aviron (en ligne,longue distance, de mer, indoor)</option>
										<option value="4">Badminton</option>
										<option value="5">Baseball - Softball</option>
										<option value="6">Basket - Basket 3x3</option>
										<option value="8">Bowling</option>
										<option value="9">Boxe éducative Assaut</option>
										<option value="11">Bridge</option>
										<option value="12">Canoë-kayak</option>
										<option value="13">Cheerleading</option>
										<option value="14">Course d'orientation</option>
										<option value="15">Cyclisme - VTT - BMX</option>
										<option value="16">Danse (toutes formes)</option>
										<option value="60">E-sport</option>
										<option value="17">Echecs</option>
										<option value="18">Equitation</option>
										<option value="19">Escalade</option>
										<option value="20">Escrime</option>
										<option value="21">Fitness</option>
										<option value="62">Fléchettes</option>
										<option value="22">Football - Futsal</option>
										<option value="23">Football américain</option>
										<option value="24">Force Athlétique</option>
										<option value="25">Golf</option>
										<option value="26"
											>Gymnastiques : Artistique, GR, Team Gym, Trampoline, Parkour Gym</option
										>
										<option value="27">Haltérophilie - Musculation</option>
										<option value="28">Handball - Beach Handball</option>
										<option value="29">Hockey</option>
										<option value="30">Judo - Ju-Jitsu - Ne Waza</option>
										<option value="31">Karaté</option>
										<option value="33">Kick Boxing- Muay-Thaï Light et Pré combat</option>
										<option value="34">Lutte - Sambo sportif - Beach Wrestling</option>
										<option value="35">Nage avec palmes</option>
										<option value="36"
											>Natation - Natation synchronisée - Natation en eau libre</option
										>
										<option value="61">Pancrace assaut</option>
										<option value="37">Patinage artistique et de vitesse</option>
										<option value="38">Pelote basque</option>
										<option value="40">Pétanque</option>
										<option value="41">Roller hockey</option>
										<option value="64">Rugby sans contact</option>
										<option value="42">Rugby(s) (XV, X, 7, XIII)</option>
										<option value="43">Sauvetage sportif</option>
										<option value="44">Savate Boxe Française en assaut</option>
										<option value="45">Skateboard - Trottinette</option>
										<option value="46">Ski - Snowboard (toutes formes)</option>
										<option value="47">Squash</option>
										<option value="48">Surf - Stand Up Paddle</option>
										<option value="49">Taekwondo</option>
										<option value="51">Tennis - Padel - Beach Tennis</option>
										<option value="50">Tennis de table</option>
										<option value="52">Tir à l'arc</option>
										<option value="54"
											>Triathlon et Disciplines enchainées : [Bike &amp; Run, Duathlon,Raids
											multisports, Swimrun]</option
										>
										<option value="55">Ultimate - Beach Ultimate</option>
										<option value="56">Voile - Kite Surf</option>
										<option value="57">Volley - Beach Volley</option>
										<option value="58">Water-polo</option>
									</select>
									{#if $errors.cmnonrisque4}
										<span class="error">{$errors.cmnonrisque4}</span>
									{/if}

									<select
										name="cmnonrisque5"
										required
										aria-invalid={$errors.cmnonrisque5 ? 'true' : undefined}
										bind:value={$_form.cmnonrisque5}
										{...$constraints.cmnonrisque5}
									>
										<option value="1">Aucune</option>
										<option value="59"> Multisports</option>
										<option value="2">Athlétisme - Courses hors stade</option>
										<option value="3">Aviron (en ligne,longue distance, de mer, indoor)</option>
										<option value="4">Badminton</option>
										<option value="5">Baseball - Softball</option>
										<option value="6">Basket - Basket 3x3</option>
										<option value="8">Bowling</option>
										<option value="9">Boxe éducative Assaut</option>
										<option value="11">Bridge</option>
										<option value="12">Canoë-kayak</option>
										<option value="13">Cheerleading</option>
										<option value="14">Course d'orientation</option>
										<option value="15">Cyclisme - VTT - BMX</option>
										<option value="16">Danse (toutes formes)</option>
										<option value="60">E-sport</option>
										<option value="17">Echecs</option>
										<option value="18">Equitation</option>
										<option value="19">Escalade</option>
										<option value="20">Escrime</option>
										<option value="21">Fitness</option>
										<option value="62">Fléchettes</option>
										<option value="22">Football - Futsal</option>
										<option value="23">Football américain</option>
										<option value="24">Force Athlétique</option>
										<option value="25">Golf</option>
										<option value="26"
											>Gymnastiques : Artistique, GR, Team Gym, Trampoline, Parkour Gym</option
										>
										<option value="27">Haltérophilie - Musculation</option>
										<option value="28">Handball - Beach Handball</option>
										<option value="29">Hockey</option>
										<option value="30">Judo - Ju-Jitsu - Ne Waza</option>
										<option value="31">Karaté</option>
										<option value="33">Kick Boxing- Muay-Thaï Light et Pré combat</option>
										<option value="34">Lutte - Sambo sportif - Beach Wrestling</option>
										<option value="35">Nage avec palmes</option>
										<option value="36"
											>Natation - Natation synchronisée - Natation en eau libre</option
										>
										<option value="61">Pancrace assaut</option>
										<option value="37">Patinage artistique et de vitesse</option>
										<option value="38">Pelote basque</option>
										<option value="40">Pétanque</option>
										<option value="41">Roller hockey</option>
										<option value="64">Rugby sans contact</option>
										<option value="42">Rugby(s) (XV, X, 7, XIII)</option>
										<option value="43">Sauvetage sportif</option>
										<option value="44">Savate Boxe Française en assaut</option>
										<option value="45">Skateboard - Trottinette</option>
										<option value="46">Ski - Snowboard (toutes formes)</option>
										<option value="47">Squash</option>
										<option value="48">Surf - Stand Up Paddle</option>
										<option value="49">Taekwondo</option>
										<option value="51">Tennis - Padel - Beach Tennis</option>
										<option value="50">Tennis de table</option>
										<option value="52">Tir à l'arc</option>
										<option value="54"
											>Triathlon et Disciplines enchainées : [Bike &amp; Run, Duathlon,Raids
											multisports, Swimrun]</option
										>
										<option value="55">Ultimate - Beach Ultimate</option>
										<option value="56">Voile - Kite Surf</option>
										<option value="57">Volley - Beach Volley</option>
										<option value="58">Water-polo</option>
									</select>
									{#if $errors.cmnonrisque5}
										<span class="error">{$errors.cmnonrisque5}</span>
									{/if}
								</div>

								<label>
									<input
										type="checkbox"
										name="checkbox_fiche_indiv_3"
										bind:checked={$_form.checkbox_fiche_indiv_3}
										{...$constraints.checkbox_fiche_indiv_3}
									/>
									Je souhaite pratiquer une activité à contraintes particulières (Boxe(s) combat plein
									contact, Tir sportif, Biathlon, Karting, Pentathlon, Taekwondo combat) et atteste avoir
									présenté un certificat médical de non-contre-indication à la pratique des sports de
									compétition de moins d'un an
								</label>

								{#if $_form.checkbox_fiche_indiv_3}
									<div>
										Activités à contraintes particulières

										<select
											name="cmrisque1"
											required
											aria-invalid={$errors.cmrisque1 ? 'true' : undefined}
											bind:value={$_form.cmrisque1}
											{...$constraints.cmrisque1}
										>
											<option value="1">Aucune</option>
											<option value="7">Biathlon</option>
											<option value="10"
												>Boxe(s) Combat, plein contact (Anglaise, Kick Boxing K1 rules, SavateBF)</option
											>
											<option value="32">Karting</option>
											<option value="39">Pentathlon</option>
											<option value="63">Taekwondo combat</option>
											<option value="53">Tir sportif</option>
										</select>

										<select
											name="cmrisque2"
											required
											aria-invalid={$errors.cmrisque2 ? 'true' : undefined}
											bind:value={$_form.cmrisque2}
											{...$constraints.cmrisque2}
										>
											<option value="1">Aucune</option>
											<option value="7">Biathlon</option>
											<option value="10"
												>Boxe(s) Combat, plein contact (Anglaise, Kick Boxing K1 rules, SavateBF)</option
											>
											<option value="32">Karting</option>
											<option value="39">Pentathlon</option>
											<option value="63">Taekwondo combat</option>
											<option value="53">Tir sportif</option>
										</select>

										<select
											name="cmrisque3"
											required
											aria-invalid={$errors.cmrisque3 ? 'true' : undefined}
											bind:value={$_form.cmrisque3}
											{...$constraints.cmrisque3}
										>
											<option value="1">Aucune</option>
											<option value="7">Biathlon</option>
											<option value="10"
												>Boxe(s) Combat, plein contact (Anglaise, Kick Boxing K1 rules, SavateBF)</option
											>
											<option value="32">Karting</option>
											<option value="39">Pentathlon</option>
											<option value="63">Taekwondo combat</option>
											<option value="53">Tir sportif</option>
										</select>

										<select
											name="cmrisque4"
											required
											aria-invalid={$errors.cmrisque4 ? 'true' : undefined}
											bind:value={$_form.cmrisque4}
											{...$constraints.cmrisque4}
										>
											<option value="1">Aucune</option>
											<option value="7">Biathlon</option>
											<option value="10"
												>Boxe(s) Combat, plein contact (Anglaise, Kick Boxing K1 rules, SavateBF)</option
											>
											<option value="32">Karting</option>
											<option value="39">Pentathlon</option>
											<option value="63">Taekwondo combat</option>
											<option value="53">Tir sportif</option>
										</select>

										<select
											name="cmrisque5"
											required
											aria-invalid={$errors.cmrisque5 ? 'true' : undefined}
											bind:value={$_form.cmrisque5}
											{...$constraints.cmrisque5}
										>
											<option value="1">Aucune</option>
											<option value="7">Biathlon</option>
											<option value="10"
												>Boxe(s) Combat, plein contact (Anglaise, Kick Boxing K1 rules, SavateBF)</option
											>
											<option value="32">Karting</option>
											<option value="39">Pentathlon</option>
											<option value="63">Taekwondo combat</option>
											<option value="53">Tir sportif</option>
										</select>
									</div>
								{/if}
							</Card.Content>
						</Card.Root>
					</Carousel.Item>

					<Carousel.Item>
						<Card.Root class="h-full">
							<Card.Content class="grid grid-cols-4 gap-4">
								<label>
									<input type="checkbox" name="autorisation" bind:checked={$_form.autorisation} />
									Droit à l'image : Le soussigné autorise l'A.S., la Fédération et ses organes déconcentrés
									à utiliser son image sur tout support destiné à la promotion des activités de l'A.S.
									et de la Fédération, à l'exclusion de toute utilisation à titre commercial. Cette autorisation
									est donnée à titre gracieux pour une durée de 5 ans et pour l'international.
								</label>

								<label>
									<input type="checkbox" bind:checked={conditionsAcceptees} />
									Loi Informatique & Libertés (Loi du 6 janvier 1978) : Le soussigné est informé du fait
									que des données à caractère personnel le concernant seront collectées et traitées informatiquement
									par l'A.S. ainsi que par la FF Sport U et ses organes déconcentrés. Ces données seront
									stockées sur les serveurs informatiques de la Fédération et pourront être publiées
									sur le site internet de la FF Sport U et de ses organes déconcentrés (résultats sportifs).
									Le soussigné est informé de son droit d'accès, de communication et de rectification,
									en cas d'inexactitude avérée, sur les données le concernant, ainsi que de son droit
									de s'opposer au traitement et/ou à la publication de ses données pour des motifs légitimes.
									À cet effet, il suffit d'adresser un courrier électronique à l'adresse suivante : federation@sport-u.com.
									Par ailleurs, ces données peuvent être transmises à des partenaires commerciaux. Le
									soussigné autorise
								</label>

								{#if !conditionsAcceptees}
									<div class="variant-ghost-warning container p-4">
										<CircleAlert style="display: inline-block;" />
										Vous devez accepter les conditions pour procéder au paiement.
									</div>
								{/if}

								<br />

								<button
									class="m-auto block bg-transparent"
									class:loading={$submitting}
									type="submit"
									disabled={$submitting || !conditionsAcceptees}
								>
									<img
										class="helloasso m-auto"
										src="/payer-avec-helloasso.svg"
										alt="Payer avec helloasso"
									/>
								</button>
							</Card.Content>
						</Card.Root>
					</Carousel.Item>
				</Carousel.Content>
				<Carousel.Previous />
				<Carousel.Next />
			</Carousel.Root>
			<div class="text-muted-foreground py-2 text-center text-sm">
				Étape {current} sur {count}
			</div>
		</div>
	</form>
</div>
