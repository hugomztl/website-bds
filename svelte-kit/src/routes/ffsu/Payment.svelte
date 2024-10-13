<script lang="ts">
	import { z } from 'zod';
	import { CircleAlert } from 'lucide-svelte';
	import type { SuperForm } from 'sveltekit-superforms';
	import type { zPendingLicense } from '$lib/models/PendingLicense';

	export let user: {
		email: string;
	};

	export let form: SuperForm<z.infer<typeof zPendingLicense>>;

	const { form: _form, enhance, submitting, errors, constraints } = form;

	let conditionsAcceptees = false;
</script>

<main>
	<h1>Formulaire de Paiement</h1>
	<form method="POST" use:enhance>
		<label>
			Email*:
			{#if $errors.email}
				<span class="error">{$errors.email}</span>
			{/if}
			<input class="input" type="email" name="email" value={user.email} readonly required />
		</label>

		<label>
			Nom de famille*:
			{#if $errors.nom}
				<span class="error">{$errors.nom}</span>
			{/if}
			<input
				class="input"
				type="text"
				name="nom"
				required
				aria-invalid={$errors.nom ? 'true' : undefined}
				bind:value={$_form.nom}
				{...$constraints.nom}
			/>
		</label>

		<label>
			Nom de naissance:
			{#if $errors.nom_naissance}
				<span class="error">{$errors.nom_naissance}</span>
			{/if}
			<input
				class="input"
				type="text"
				name="nom_naissance"
				aria-invalid={$errors.nom_naissance ? 'true' : undefined}
				bind:value={$_form.nom_naissance}
				{...$constraints.nom_naissance}
			/>
		</label>

		<label>
			Prénom*:
			{#if $errors.prenom}
				<span class="error">{$errors.prenom}</span>
			{/if}
			<input
				class="input"
				type="text"
				name="prenom"
				aria-invalid={$errors.prenom ? 'true' : undefined}
				bind:value={$_form.prenom}
				{...$constraints.prenom}
			/>
		</label>

		<label>
			Sexe*:
			{#if $errors.sexe}
				<span class="error">{$errors.sexe}</span>
			{/if}
			<div>
				<label>
					<input type="radio" name="sexe" value="M" required bind:group={$_form.sexe} />
					Masculin
				</label>
				<label>
					<input type="radio" name="sexe" value="F" required bind:group={$_form.sexe} />
					Féminin
				</label>
			</div>
		</label>

		<label>
			Date de naissance*:
			{#if $errors.datenaiss}
				<span class="error">{$errors.datenaiss}</span>
			{/if}
			<input
				class="input"
				type="date"
				name="datenaiss"
				aria-invalid={$errors.datenaiss ? 'true' : undefined}
				bind:value={$_form.datenaiss}
				{...$constraints.datenaiss}
			/>
		</label>

		<label>
			Pays de naissance*:
			{#if $errors.pays_naissance}
				<span class="error">{$errors.pays_naissance}</span>
			{/if}
			<input
				class="input"
				type="text"
				name="pays_naissance"
				required
				aria-invalid={$errors.pays_naissance ? 'true' : undefined}
				bind:value={$_form.pays_naissance}
				{...$constraints.pays_naissance}
			/>
		</label>

		<label>
			Département de naissance*:
			{#if $errors.dpt_naissance}
				<span class="error">{$errors.dpt_naissance}</span>
			{/if}
			<select
				name="dpt_naissance"
				required
				aria-invalid={$errors.dpt_naissance ? 'true' : undefined}
				bind:value={$_form.dpt_naissance}
				{...$constraints.dpt_naissance}
			>
				<option value="01">01 - Ain</option>
				<option value="02">02 - Aisne</option>
				<option value="03">03 - Allier</option>
				<option value="04">04 - Alpes de Haute Provence</option>
				<option value="05">05 - Hautes Alpes</option>
				<option value="06">06 - Alpes Maritimes</option>
				<option value="07">07 - Ardèche</option>
				<option value="08">08 - Ardennes</option>
				<option value="09">09 - Ariège</option>
				<option value="10">10 - Aube</option>
				<option value="11">11 - Aude</option>
				<option value="12">12 - Aveyron</option>
				<option value="13">13 - Bouches du Rhône</option>
				<option value="14">14 - Calvados</option>
				<option value="15">15 - Cantal</option>
				<option value="16">16 - Charente</option>
				<option value="17">17 - Charente Maritime</option>
				<option value="18">18 - Cher</option>
				<option value="19">19 - Corrèze</option>
				<option value="2A">2A - Corse du Sud</option>
				<option value="2B">2B - Haute Corse</option>
				<option value="21">21 - Côte d'Or</option>
				<option value="22">22 - Côtes d'Armor</option>
				<option value="23">23 - Creuse</option>
				<option value="24">24 - Dordogne</option>
				<option value="25">25 - Doubs</option>
				<option value="26">26 - Drôme</option>
				<option value="27">27 - Eure</option>
				<option value="28">28 - Eure et Loir</option>
				<option value="29">29 - Finistère</option>
				<option value="30">30 - Gard</option>
				<option value="31">31 - Haute Garonne</option>
				<option value="32">32 - Gers</option>
				<option value="33">33 - Gironde</option>
				<option value="34">34 - Hérault</option>
				<option value="35">35 - Ille et Vilaine</option>
				<option value="36">36 - Indre</option>
				<option value="37">37 - Indre et Loire</option>
				<option value="38">38 - Isère</option>
				<option value="39">39 - Jura</option>
				<option value="40">40 - Landes</option>
				<option value="41">41 - Loir et Cher</option>
				<option value="42">42 - Loire</option>
				<option value="43">43 - Haute Loire</option>
				<option value="44">44 - Loire Atlantique</option>
				<option value="45">45 - Loiret</option>
				<option value="46">46 - Lot</option>
				<option value="47">47 - Lot et Garonne</option>
				<option value="48">48 - Lozère</option>
				<option value="49">49 - Maine et Loire</option>
				<option value="50">50 - Manche</option>
				<option value="51">51 - Marne</option>
				<option value="52">52 - Haute Marne</option>
				<option value="53">53 - Mayenne</option>
				<option value="54">54 - Meurthe et Moselle</option>
				<option value="55">55 - Meuse</option>
				<option value="56">56 - Morbihan</option>
				<option value="57">57 - Moselle</option>
				<option value="58">58 - Nièvre</option>
				<option value="59">59 - Nord</option>
				<option value="60">60 - Oise</option>
				<option value="61">61 - Orne</option>
				<option value="62">62 - Pas de Calais</option>
				<option value="63">63 - Puy de Dôme</option>
				<option value="64">64 - Pyrénées Atlantiques</option>
				<option value="65">65 - Hautes Pyrénées</option>
				<option value="66">66 - Pyrénées Orientales</option>
				<option value="67">67 - Bas Rhin</option>
				<option value="68">68 - Haut Rhin</option>
				<option value="69">69 - Rhône-Alpes</option>
				<option value="70">70 - Haute Saône</option>
				<option value="71">71 - Saône et Loire</option>
				<option value="72">72 - Sarthe</option>
				<option value="73">73 - Savoie</option>
				<option value="74">74 - Haute Savoie</option>
				<option value="75">75 - Paris</option>
				<option value="76">76 - Seine Maritime</option>
				<option value="77">77 - Seine et Marne</option>
				<option value="78">78 - Yvelines</option>
				<option value="79">79 - Deux Sèvres</option>
				<option value="80">80 - Somme</option>
				<option value="81">81 - Tarn</option>
				<option value="82">82 - Tarn et Garonne</option>
				<option value="83">83 - Var</option>
				<option value="84">84 - Vaucluse</option>
				<option value="85">85 - Vendée</option>
				<option value="86">86 - Vienne</option>
				<option value="87">87 - Haute Vienne</option>
				<option value="88">88 - Vosges</option>
				<option value="89">89 - Yonne</option>
				<option value="90">90 - Territoire de Belfort</option>
				<option value="91">91 - Essonne</option>
				<option value="92">92 - Hauts de Seine</option>
				<option value="93">93 - Seine St Denis</option>
				<option value="94">94 - Val de Marne</option>
				<option value="95">95 - Val d'Oise</option>
				<option value="971">971 - Guadeloupe</option>
				<option value="972">972 - Martinique</option>
				<option value="973">973 - Guyane</option>
				<option value="974">974 - Réunion</option>
				<option value="975">975 - Saint Pierre et Miquelon</option>
				<option value="976">976 - Mayotte</option>
				<option value="0">01 - Autre</option>
			</select>
		</label>

		<label>
			Ville de naissance*:
			{#if $errors.ville_naissance}
				<span class="error">{$errors.ville_naissance}</span>
			{/if}
			<input
				class="input"
				type="text"
				name="ville_naissance"
				required
				aria-invalid={$errors.ville_naissance ? 'true' : undefined}
				bind:value={$_form.ville_naissance}
				{...$constraints.ville_naissance}
			/>
		</label>

		<label>
			Adresse 1*:
			{#if $errors.adresse1}
				<span class="error">{$errors.adresse1}</span>
			{/if}
			<input
				class="input"
				type="text"
				name="adresse1"
				required
				aria-invalid={$errors.adresse1 ? 'true' : undefined}
				bind:value={$_form.adresse1}
				{...$constraints.adresse1}
			/>
		</label>

		<label>
			Adresse 2:
			{#if $errors.adresse2}
				<span class="error">{$errors.adresse2}</span>
			{/if}
			<input
				class="input"
				type="text"
				name="adresse2"
				aria-invalid={$errors.adresse2 ? 'true' : undefined}
				bind:value={$_form.adresse2}
				{...$constraints.adresse2}
			/>
		</label>

		<label>
			Code postal*:
			{#if $errors.codepostal}
				<span class="error">{$errors.codepostal}</span>
			{/if}
			<input
				class="input"
				type="text"
				name="codepostal"
				required
				aria-invalid={$errors.codepostal ? 'true' : undefined}
				bind:value={$_form.codepostal}
				{...$constraints.codepostal}
			/>
		</label>

		<label>
			Ville*:
			{#if $errors.ville}
				<span class="error">{$errors.ville}</span>
			{/if}
			<input
				class="input"
				type="text"
				name="ville"
				required
				aria-invalid={$errors.ville ? 'true' : undefined}
				bind:value={$_form.ville}
				{...$constraints.ville}
			/>
		</label>

		<label>
			Téléphone:
			{#if $errors.telephone}
				<span class="error">{$errors.telephone}</span>
			{/if}
			<input
				class="input"
				type="tel"
				name="telephone"
				aria-invalid={$errors.telephone ? 'true' : undefined}
				bind:value={$_form.telephone}
				{...$constraints.telephone}
			/>
		</label>

		<label>
			Instagram:
			{#if $errors.instagram}
				<span class="error">{$errors.instagram}</span>
			{/if}
			<input
				class="input"
				type="text"
				name="instagram"
				aria-invalid={$errors.instagram ? 'true' : undefined}
				bind:value={$_form.instagram}
				{...$constraints.instagram}
			/>
		</label>

		<label>
			Discipline:
			{#if $errors.discipline}
				<span class="error">{$errors.discipline}</span>
			{/if}
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
		</label>

		<label>
			Autre fédération:
			{#if $errors.autrefede}
				<span class="error">{$errors.autrefede}</span>
			{/if}
			<input
				class="input"
				type="text"
				name="autrefede"
				aria-invalid={$errors.autrefede ? 'true' : undefined}
				bind:value={$_form.autrefede}
				{...$constraints.autrefede}
			/>
		</label>

		<label>
			Sport*:
			{#if $errors.sport}
				<span class="error">{$errors.sport}</span>
			{/if}
			<select
				name="sport"
				aria-invalid={$errors.sport ? 'true' : undefined}
				bind:value={$_form.sport}
				{...$constraints.sport}
			>
				<option value="Athlétisme - Courses hors stade">Athlétisme - Courses hors stade</option>
				<option value="Aviron (en ligne,longue distance, de mer, indoor)"
					>Aviron (en ligne,longue distance, de mer, indoor)</option
				>
				<option value="Babyfoot">Babyfoot</option>
				<option value="Badminton">Badminton</option>
				<option value="Baseball - Softball">Baseball - Softball</option>
				<option value="Basket - Basket 3x3">Basket - Basket 3x3</option>
				<option value="Biathlon">Biathlon</option>
				<option value="Bowling">Bowling</option>
				<option value="Boxe éducative Assaut">Boxe éducative Assaut</option>
				<option value="Boxe(s) Combat, plein contact (Anglaise, Kick Boxing K1 rules, Savate BF)">
					Boxe(s) Combat, plein contact (Anglaise, Kick Boxing K1 rules, Savate BF)</option
				>
				<option value="Bridge">Bridge</option>
				<option value="Canoë-kayak">Canoë-kayak</option>
				<option value="Cheerleading">Cheerleading</option>
				<option value="Course d'orientation">Course d'orientation</option>
				<option value="Cyclisme - VTT - BMX">Cyclisme - VTT - BMX</option>
				<option value="Danse (toutes formes)">Danse (toutes formes)</option>
				<option value="E-sport">E-sport</option>
				<option value="Echecs">Echecs</option>
				<option value="Equitation">Equitation</option>
				<option value="Escalade">Escalade</option>
				<option value="Escrime">Escrime</option>
				<option value="Fitness">Fitness</option>
				<option value="Fléchettes">Fléchettes</option>
				<option value="Football - Futsal">Football - Futsal</option>
				<option value="Football américain">Football américain</option>
				<option value="Force Athlétique">Force Athlétique</option>
				<option value="Golf">Golf</option>
				<option value="Gymnastiques : Artistique, GR, Team Gym, Trampoline, Parkour Gym">
					Gymnastiques : Artistique, GR, Team Gym, Trampoline, Parkour Gym</option
				>
				<option value="Haltérophilie - Musculation">Haltérophilie - Musculation</option>
				<option value="Handball - Beach Handball">Handball - Beach Handball</option>
				<option value="Hockey">Hockey</option>
				<option value="Judo - Ju-Jitsu - Ne Waza">Judo - Ju-Jitsu - Ne Waza</option>
				<option value="Karaté">Karaté</option>
				<option value="Karting">Karting</option>
				<option value="Kick Boxing - Muay-Thaï Light et Pré combat"
					>Kick Boxing - Muay-Thaï Light et Pré combat</option
				>
				<option value="Lutte - Sambo sportif - Beach Wrestling"
					>Lutte - Sambo sportif - Beach Wrestling</option
				>
				<option value="Nage avec palmes">Nage avec palmes</option>
				<option value="Natation - Natation synchronisée - Natation en eau libre"
					>Natation - Natation synchronisée - Natation en eau libre</option
				>
				<option value="Pancrace assaut">Pancrace assaut</option>
				<option value="Patinage artistique et de vitesse"
					>Patinage artistique et de vitesse
				</option>
				<option value="Pelote basque">Pelote basque</option>
				<option value="Pentathlon">Pentathlon</option>
				<option value="Pétanque">Pétanque</option>
				<option value="Roller hockey">Roller hockey</option>
				<option value="Rugby(s) (XV, X, 7, XIII)">Rugby(s) (XV, X, 7, XIII)</option>
				<option value="Sauvetage sportif">Sauvetage sportif</option>
				<option value="Savate Boxe Française en assaut">Savate Boxe Française en assaut</option>
				<option value="Skateboard - Trottinette">Skateboard - Trottinette</option>
				<option value="Ski - Snowboard (toutes formes)">Ski - Snowboard (toutes formes)</option>
				<option value="Squash">Squash</option>
				<option value="Surf - Stand Up Paddle">Surf - Stand Up Paddle</option>
				<option value="Taekwondo">Taekwondo</option>
				<option value="Tennis - Padel - Beach Tennis">Tennis - Padel - Beach Tennis</option>
				<option value="Tennis de table">Tennis de table</option>
				<option value="Tir à l'arc">Tir à l'arc</option>
				<option value="Tir sportif">Tir sportif</option>
				<option
					value="Triathlon et Disciplines enchainées : [Bike &amp; Run, Duathlon, Raids multisports, Swimrun]"
				>
					Triathlon et Disciplines enchainées : [Bike &amp; Run, Duathlon, Raids multisports,
					Swimrun]</option
				>
				<option value="Ultimate - Beach Ultimate">Ultimate - Beach Ultimate</option>
				<option value="Voile - Kite Surf">Voile - Kite Surf</option>
				<option value="Volley - Beach Volley">Volley - Beach Volley</option>
				<option value="Water-polo">Water-polo</option>
			</select>
		</label>

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
				<option value="26">Gymnastiques : Artistique, GR, Team Gym, Trampoline, Parkour Gym</option>
				<option value="27">Haltérophilie - Musculation</option>
				<option value="28">Handball - Beach Handball</option>
				<option value="29">Hockey</option>
				<option value="30">Judo - Ju-Jitsu - Ne Waza</option>
				<option value="31">Karaté</option>
				<option value="33">Kick Boxing- Muay-Thaï Light et Pré combat</option>
				<option value="34">Lutte - Sambo sportif - Beach Wrestling</option>
				<option value="35">Nage avec palmes</option>
				<option value="36">Natation - Natation synchronisée - Natation en eau libre</option>
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
					>Triathlon et Disciplines enchainées : [Bike &amp; Run, Duathlon,Raids multisports,
					Swimrun]</option
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
				<option value="26">Gymnastiques : Artistique, GR, Team Gym, Trampoline, Parkour Gym</option>
				<option value="27">Haltérophilie - Musculation</option>
				<option value="28">Handball - Beach Handball</option>
				<option value="29">Hockey</option>
				<option value="30">Judo - Ju-Jitsu - Ne Waza</option>
				<option value="31">Karaté</option>
				<option value="33">Kick Boxing- Muay-Thaï Light et Pré combat</option>
				<option value="34">Lutte - Sambo sportif - Beach Wrestling</option>
				<option value="35">Nage avec palmes</option>
				<option value="36">Natation - Natation synchronisée - Natation en eau libre</option>
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
					>Triathlon et Disciplines enchainées : [Bike &amp; Run, Duathlon,Raids multisports,
					Swimrun]</option
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
				<option value="26">Gymnastiques : Artistique, GR, Team Gym, Trampoline, Parkour Gym</option>
				<option value="27">Haltérophilie - Musculation</option>
				<option value="28">Handball - Beach Handball</option>
				<option value="29">Hockey</option>
				<option value="30">Judo - Ju-Jitsu - Ne Waza</option>
				<option value="31">Karaté</option>
				<option value="33">Kick Boxing- Muay-Thaï Light et Pré combat</option>
				<option value="34">Lutte - Sambo sportif - Beach Wrestling</option>
				<option value="35">Nage avec palmes</option>
				<option value="36">Natation - Natation synchronisée - Natation en eau libre</option>
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
					>Triathlon et Disciplines enchainées : [Bike &amp; Run, Duathlon,Raids multisports,
					Swimrun]</option
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
				<option value="26">Gymnastiques : Artistique, GR, Team Gym, Trampoline, Parkour Gym</option>
				<option value="27">Haltérophilie - Musculation</option>
				<option value="28">Handball - Beach Handball</option>
				<option value="29">Hockey</option>
				<option value="30">Judo - Ju-Jitsu - Ne Waza</option>
				<option value="31">Karaté</option>
				<option value="33">Kick Boxing- Muay-Thaï Light et Pré combat</option>
				<option value="34">Lutte - Sambo sportif - Beach Wrestling</option>
				<option value="35">Nage avec palmes</option>
				<option value="36">Natation - Natation synchronisée - Natation en eau libre</option>
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
					>Triathlon et Disciplines enchainées : [Bike &amp; Run, Duathlon,Raids multisports,
					Swimrun]</option
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
				<option value="26">Gymnastiques : Artistique, GR, Team Gym, Trampoline, Parkour Gym</option>
				<option value="27">Haltérophilie - Musculation</option>
				<option value="28">Handball - Beach Handball</option>
				<option value="29">Hockey</option>
				<option value="30">Judo - Ju-Jitsu - Ne Waza</option>
				<option value="31">Karaté</option>
				<option value="33">Kick Boxing- Muay-Thaï Light et Pré combat</option>
				<option value="34">Lutte - Sambo sportif - Beach Wrestling</option>
				<option value="35">Nage avec palmes</option>
				<option value="36">Natation - Natation synchronisée - Natation en eau libre</option>
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
					>Triathlon et Disciplines enchainées : [Bike &amp; Run, Duathlon,Raids multisports,
					Swimrun]</option
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
			Je souhaite pratiquer une activité à contraintes particulières (Boxe(s) combat plein contact, Tir
			sportif, Biathlon, Karting, Pentathlon, Taekwondo combat) et atteste avoir présenté un certificat
			médical de non-contre-indication à la pratique des sports de compétition de moins d'un an
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

		<hr class="my-4" />

		<label>
			<input type="checkbox" name="autorisation" bind:checked={$_form.autorisation} />
			Droit à l'image : Le soussigné autorise l'A.S., la Fédération et ses organes déconcentrés à utiliser
			son image sur tout support destiné à la promotion des activités de l'A.S. et de la Fédération,
			à l'exclusion de toute utilisation à titre commercial. Cette autorisation est donnée à titre gracieux
			pour une durée de 5 ans et pour l'international.
		</label>

		<label>
			<input type="checkbox" bind:checked={conditionsAcceptees} />
			Loi Informatique & Libertés (Loi du 6 janvier 1978) : Le soussigné est informé du fait que des
			données à caractère personnel le concernant seront collectées et traitées informatiquement par
			l'A.S. ainsi que par la FF Sport U et ses organes déconcentrés. Ces données seront stockées sur
			les serveurs informatiques de la Fédération et pourront être publiées sur le site internet de la
			FF Sport U et de ses organes déconcentrés (résultats sportifs). Le soussigné est informé de son
			droit d'accès, de communication et de rectification, en cas d'inexactitude avérée, sur les données
			le concernant, ainsi que de son droit de s'opposer au traitement et/ou à la publication de ses
			données pour des motifs légitimes. À cet effet, il suffit d'adresser un courrier électronique à
			l'adresse suivante : federation@sport-u.com. Par ailleurs, ces données peuvent être transmises
			à des partenaires commerciaux. Le soussigné autorise
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
			<img class="helloasso m-auto" src="/payer-avec-helloasso.svg" alt="Payer avec helloasso" />
		</button>
	</form>
</main>

<style lang="postcss">
	button[disabled] > .helloasso {
		filter: grayscale(50%);
		opacity: 0.5;
		cursor: not-allowed;
	}

	button[disabled].loading > .helloasso {
		cursor: progress;
	}

	.error {
		@apply my-1 block text-red-500;
	}

	main {
		max-width: 600px;
		margin: auto;
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 8px;
	}
	label {
		display: block;
		margin-bottom: 0.5rem;
	}
	input[type='text'],
	select {
		width: 100%;
		padding: 0.5rem;
		margin-bottom: 1rem;
	}
	select {
		width: 100%;
		padding: 0.5rem;
		margin-bottom: 1rem;
	}
</style>
