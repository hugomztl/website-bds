<script>
    import { page } from '$app/stores';
    import { Separator } from "$lib/components/ui/separator";
    import Footer from '$lib/components/footer.svelte';
</script>

<svelte:head>
    <title>Termes et Conditions d'Utilisation - BDS</title>
    <meta name="description" content="Termes et Conditions d'Utilisation du BDS" />
</svelte:head>

<div class="container mt-[5%] font-roboto">

    <h1 class="text-4xl font-bold text-center mb-4">Termes et Conditions d'Utilisation</h1>

    <section>
        <h2 class="text-2xl font-bold mb-4">1. Objectif et Accès au Site</h2>
        <p class="text-lg text-justify">
            Le site web du Bureau Des Sports (BDS) - CESI Nancy a pour objectif de centraliser toutes les démarches liées aux affaires courantes du BDS, 
            telles que la création de clubs, le paiement des licences, l'adhésion aux clubs et la participation aux événements. 
            Bien que le site soit accessible à tout public, la création d'un compte est réservée aux étudiants disposant d'une adresse email <strong>@viacesi.fr</strong>.
        </p>
        
    </section>

    <Separator class="my-2"/>

    <section>
        <h2 class="text-2xl font-bold mb-4">2. Création et Gestion des Comptes</h2>
        <p class="text-lg text-justify">
            Les utilisateurs peuvent modifier ou supprimer n'importe quelle information associée à leur compte, 
            à l'exception des informations de base nécessaires : email, nom, prénom et promotion CESI. 
            Tout compte créé avec une adresse email non validée dans un délai de 2 semaines sera automatiquement supprimé.
        </p>
    </section>

    <Separator class="my-2"/>

    <section>
        <h2 class="text-2xl font-bold mb-4">3. Responsabilité et Signalement des Dysfonctionnements</h2>
        <p class="text-lg text-justify">
            En cas d'erreur ou de dysfonctionnement non prévu par une maintenance, les utilisateurs sont invités à signaler tout problème 
            à l'adresse suivante : <a href="mailto:contact@bds-cesi-nancy.fr">contact@bds-cesi-nancy.fr</a>. 
            Le BDS est responsable des informations fournies pour les événements qu'il organise, mais chaque président est responsable des informations liées à son club.
        </p>
    </section>

    <Separator class="my-2"/>

    <section>
        <h2 class="text-2xl font-bold mb-4">4. Conditions d'Utilisation</h2>
        <p class="text-lg text-justify">
            En créant un compte, les utilisateurs doivent accepter les Termes et Conditions d'Utilisation ainsi que la Politique de Confidentialité. 
            Il est strictement interdit de diffuser du contenu inapproprié via les canaux de diffusion mis à disposition par le site web ou d'utiliser 
            l'image du site à des fins inappropriées. Toute infraction pourra entraîner des sanctions disciplinaires directement dans le parcours académique CESI.
        </p>
    </section>

    <Separator class="my-2"/>

    <section>
        <h2 class="text-2xl font-bold mb-4">5. Paiements et Remboursements</h2>
        <p class="text-lg text-justify">
            Les paiements pour les licences s'effectuent via les moyens de paiement offerts par HelloAsso. 
            Les utilisateurs disposent d'un délai de rétractation de 2 semaines suivant l'achat pour demander un remboursement.
        </p>
    </section>

    <Separator class="my-2"/>

    <section>
        <h2 class="text-2xl font-bold mb-4">6. Propriété Intellectuelle</h2>
        <p class="text-lg text-justify">
            Tous les droits relatifs à l'exploitation du site web, y compris les logos, textes et images, sont la propriété exclusive 
            de l'association Bureau Des Sports (BDS) - CESI Nancy. Les descriptions des clubs et leur contenu sont la propriété des présidents des clubs respectifs.
        </p>
    </section>

    <Separator class="my-2"/>

    <section>
        <h2 class="text-2xl font-bold mb-4">7. Modification des Termes et Résiliation</h2>
        <p class="text-lg text-justify">
            Les Termes et Conditions d'Utilisation ne peuvent pas être modifiés. Un compte utilisateur peut être suspendu ou supprimé 
            en cas de non-respect des règles, telles que la diffusion de contenu inapproprié, les insultes, l'incitation à la haine ou le harcèlement.
        </p>
    </section>

    <Separator class="my-2"/>

    <section>
        <h2 class="text-2xl font-bold mb-4">8. Contact</h2>
        <p class="text-lg text-justify">
            Pour toute question ou litige concernant ces Termes et Conditions, veuillez nous contacter à : 
            <a href="mailto:contact@bds-cesi-nancy.fr">contact@bds-cesi-nancy.fr</a>.
        </p>
    </section>

    <footer class="text-sm text-gray-600 my-5 text-center">
        <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
    </footer>
</div>

<Footer />
<!-- FIXME: quand on charge le footer depuis la page /legal/terms il cherche le logo du bds dans /legal/logo-bds.png au lieu de chercher dans le dossier static (voir composant footer) -->