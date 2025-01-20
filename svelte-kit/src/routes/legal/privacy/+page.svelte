<script>
    import { page } from '$app/stores';
    import { Separator } from "$lib/components/ui/separator";
    import Footer from '$lib/components/footer.svelte';
</script>

<svelte:head>
    <title>Politique de confidentialité - BDS</title>
    <meta name="description" content="Politique de confidentialité de BDS" />
</svelte:head>

<div class="container mt-[5%] font-roboto">
    <h1 class="text-4xl font-bold text-center mb-4">Politique de Confidentialité</h1>

    <p class="text-lg text-justify">
      Bienvenue sur le site du <strong>Bureau des Sports (BDS) du CESI Nancy</strong>. La protection de vos données personnelles est une priorité pour nous. Cette politique de confidentialité explique comment nous collectons, utilisons, protégeons et partageons vos données personnelles lorsque vous utilisez notre site web.
    </p>
    
    <Separator class="my-2"/>

    <section class="">
      <h2 class="text-2xl font-bold mb-4">1. Qui sommes-nous ?</h2>
      <p class="text-lg text-justify">
        Le BDS du CESI Nancy est une association étudiante visant à centraliser toutes les démarches liées aux activités sportives et associatives, telles que la création de clubs, l’adhésion, le paiement des licences et la participation aux événements sportifs.
      </p>
    </section>

    <Separator class="my-2"/>

    <section class="">
      <h2 class="text-2xl font-bold mb-4">2. Données personnelles collectées</h2>
      <ul class="list-disc list-inside text-lg">
        <li><strong>Adresse email :</strong> Utilisation obligatoire d’un email @viacesi.fr pour créer un compte. Si votre email n’est pas vérifié dans un délai de deux semaines, votre compte sera automatiquement supprimé.</li>
        <li><strong>Nom et prénom :</strong> Utilisés pour identifier les membres.</li>
        <li><strong>Promotion CESI :</strong> Pour faciliter l’organisation interne et les statistiques.</li>
        <li><strong>Pseudo Discord :</strong> Optionnel, pour connecter les membres au serveur communautaire.</li>
        <li><strong>Informations médicales :</strong> Nécessaires pour l’obtention des licences sportives, conformément aux exigences des fédérations.</li>
        <li><strong>Autres informations facultatives :</strong> Fournies au bon vouloir de l’utilisateur pour compléter son profil.</li>
      </ul>
    </section>

    <Separator class="my-2"/>

    <section class="">
      <h2 class="text-2xl font-bold mb-4">3. Objectifs de la collecte</h2>
      <p class="text-lg text-justify">
        Les données collectées sont utilisées pour :
      </p>
      <ul class="list-disc list-inside text-lg">
        <li>Gérer les comptes utilisateurs (adhésion, création de clubs, licences).</li>
        <li>Réaliser des statistiques internes pour le BDS et pour le CESI.</li>
        <li>Faciliter l’organisation des événements et la gestion des clubs.</li>
      </ul>
    </section>

    <Separator class="my-2"/>

    <section class="">
      <h2 class="text-2xl font-bold mb-4">4. Sécurité et stockage des données</h2>
      <p class="text-lg text-justify">
        Vos données personnelles sont stockées sur un serveur sécurisé hébergé par <strong>Hostinger</strong>. Les mesures suivantes sont mises en place pour protéger vos informations :
      </p>
      <ul class="list-disc list-inside text-lg">
        <li>Hashage des mots de passe, conforme aux normes RGPD.</li>
        <li>Base de données sécurisée, avec contrôle d’accès strict.</li>
        <li>Protection des informations sensibles (e.g. informations médicales).</li>
      </ul>
    </section>

    <Separator class="my-2"/>

    <section class="">
      <h2 class="text-2xl font-bold mb-4">5. Partage des données</h2>
      <p class="text-lg text-justify">
        Vos données ne sont pas vendues ni partagées à des tiers externes. Les statistiques réalisées à partir des données collectées peuvent être transmises au CESI pour des fins administratives ou d’amélioration des services.
      </p>
    </section>

    <Separator class="my-2"/>

    <section class="">
      <h2 class="text-2xl font-bold mb-4">6. Conservation des données</h2>
      <p class="text-lg text-justify">
        Les données personnelles sont conservées uniquement pour la durée nécessaire à leur utilisation, conformément à la réglementation RGPD. Si vous souhaitez supprimer vos données, veuillez consulter vos droits ci-dessous.
      </p>
    </section>

    <Separator class="my-2"/>

    <section class="">
      <h2 class="text-2xl font-bold mb-4">7. Vos droits</h2>
      <p class="text-lg text-justify">
        Conformément à la réglementation RGPD, vous disposez des droits suivants :
      </p>
      <ul class="list-disc list-inside text-lg">
        <li><strong>Accès à vos données :</strong> Demandez une copie des données vous concernant.</li>
        <li><strong>Modification :</strong> Rectifiez vos informations si elles sont inexactes ou incomplètes.</li>
        <li><strong>Suppression :</strong> Supprimez votre compte et toutes les données associées via votre espace personnel ou en nous contactant.</li>
        <li><strong>Portabilité :</strong> Demandez une copie de vos données dans un format lisible.</li>
      </ul>
      <p class="text-lg text-justify">
        Pour exercer ces droits, contactez-nous à <strong>contact@bds-cesi-nancy.fr</strong>.
      </p>
    </section>

    <Separator class="my-2"/>

    <section class="">
      <h2 class="text-2xl font-bold mb-4">8. Cookies et stockage local</h2>
      <p class="text-lg text-justify">
        Nous n’utilisons pas de cookies. Toutefois, nous utilisons le <strong>localStorage</strong> pour stocker le token de connexion nécessaire à l’accès sécurisé à votre compte.
      </p>
    </section>

    <Separator class="my-2"/>

    <section class="">
      <h2 class="text-2xl font-bold mb-4">9. Contact</h2>
      <p class="text-lg text-justify">
        Pour toute question relative à vos données personnelles ou à cette politique de confidentialité, vous pouvez nous contacter à <strong>contact@bds-cesi-nancy.fr</strong>.
      </p>
    </section>

    <Separator class="my-2"/>

    <section class="">
      <h2 class="text-2xl font-bold mb-4">10. Mise à jour de cette politique</h2>
      <p class="text-lg text-justify">
        Cette politique de confidentialité peut être modifiée pour refléter les évolutions légales ou techniques. Nous vous encourageons à consulter cette page régulièrement.
      </p>
    </section>

    <footer class="text-sm text-gray-600 my-5 text-center">
        <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
    </footer>
</div>

<Footer />
<!-- FIXME: quand on charge le footer depuis la page /legal/privacy il cherche le logo du bds dans /legal/logo-bds.png au lieu de chercher dans le dossier static (voir composant footer) -->