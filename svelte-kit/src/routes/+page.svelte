<script>
    import { Volume2, VolumeX } from 'lucide-svelte';
    let isMuted = true;

    // Ajout des variables manquantes
    let dateFilter = '';
    let prixFilter = '';
    let tagFilter = '';
    
    // Exemple de données d'événements (à remplacer par vos vraies données)
    let evenements = [
        { titre: 'Tournoi de football', description: 'Grand tournoi inter-écoles', date: '2023-06-15', prix: 5, tag: 'sport' },
        { titre: 'Soirée d\'intégration', description: 'Venez rencontrer vos camarades', date: '2023-09-01', prix: 0, tag: 'social' },
        // Ajoutez d'autres événements ici
    ];

    // Fonction pour filtrer les événements
    $: evenementsFiltres = evenements.filter(evt => {
        const dateMatch = !dateFilter || evt.date === dateFilter;
        const prixMatch = !prixFilter || (prixFilter === 'gratuit' && evt.prix === 0) || (prixFilter === 'payant' && evt.prix > 0);
        const tagMatch = !tagFilter || evt.tag === tagFilter;
        return dateMatch && prixMatch && tagMatch;
    });


    let partenaires = [
        { nom: 'FFSU', logo: '/logos/ffsu.png' },
        { nom: 'Jeun\'Est', logo: '/logos/jeun_est.png' },
        { nom: 'Race System', logo: '/logos/race_system.png' },
        { nom: 'Caisse d\'Épargne', logo: '/logos/caisse_epargne.png' },
    // Ajoutez d'autres partenaires selon vos besoins
    ];
</script>

<main class="flex flex-col min-h-screen bg-surface-50-900-token">
    <section class="relative h-screen w-full overflow-hidden">
        <video
            autoplay
            loop
            class="absolute inset-0 w-full h-full object-cover"
            bind:muted={isMuted}
        >
            <source src="motivation.mp4" type="video/mp4" />
            <track kind="captions" src="" srclang="fr" label="Français" />
            Votre navigateur ne supporte pas la vidéo HTML5.
        </video>
        
        <div class="absolute inset-0 bg-black/50"></div>
        
        <div class="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
            <h1 class="h1 text-5xl md:text-7xl font-bold mb-8 text-center">
                PRÊT À TE DÉPASSER ?
            </h1>
            <a href="/register" class="btn btn-xl border-2 border-none bg-transparent text-white hover:bg-primary-500 hover:text-black transition-colors duration-300">
                <span>Rejoins le BDS</span>
                <span>&rarr;</span>
            </a>
        </div>
        
        <button
            on:click={() => isMuted = !isMuted}
            class="absolute top-4 right-4 z-20 btn-icon"
        >
            {#if isMuted}
                <VolumeX size={24} color="red"/>
            {:else}
                <Volume2 size={24} color="white"/>
            {/if}
        </button>
    </section>

    <section class="container mx-auto my-16 px-4">
        <div class="grid md:grid-cols-2 gap-8">
            <div class="card p-6 variant-soft">
                <h2 class="h2 mb-4">NOTRE MISSION</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
            </div>
            <div class="card p-6 variant-soft">
                <h2 class="h2 mb-4">NOTRE MISSION</h2>
                <p>Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.</p>
            </div>
        </div>
    </section>

    <section class=" variant-soft py-16">
        <div class="container mx-auto px-4">
            <h2 class="h2 text-center mb-12">ÉVÉNEMENTS À VENIR</h2>
            
            <div class="mb-6 flex items-center justify-center space-x-4">
                <input type="date" class="input variant-filled-surface" bind:value={dateFilter} placeholder="Filtrer par date" />
                <select class="select variant-filled-surface" bind:value={prixFilter}>
                    <option value="">Tous les prix</option>
                    <option value="gratuit">Gratuit</option>
                    <option value="payant">Payant</option>
                </select>
                <select class="select variant-filled-surface" bind:value={tagFilter}>
                    <option value="">Tous les tags</option>
                    <option value="sport">Sport</option>
                    <option value="social">Social</option>
                    <option value="culture">Culture</option>
                </select>
            </div>

            <div class="space-y-6">
                {#each evenementsFiltres as evenement}
                    <div class="card p-6 variant-ringed-surface flex justify-between items-center">
                        <div>
                            <h3 class="h3 mb-2">{evenement.titre}</h3>
                            <p class="mb-2">{evenement.description}</p>
                            <p class="text-sm">Date : {evenement.date}</p>
                            <p class="text-sm">Prix : {evenement.prix === 0 ? 'Gratuit' : `${evenement.prix}€`}</p>
                            <p class="text-sm">Tag : {evenement.tag}</p>
                        </div>
                        <button class="btn variant-filled-primary">
                            <span>Participer</span>
                            <span>&rarr;</span>
                        </button>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <section class="bg-surface-100-800-token py-16">
        <div class="container mx-auto px-4">
            <h2 class="h2 text-center mb-12">NOS PARTENAIRES</h2>
            <div class="overflow-hidden">
                <div class="flex animate-marquee">
                    {#each [...partenaires, ...partenaires] as partenaire}
                        <img src={partenaire.logo} alt={partenaire.nom} class="h-20 mx-8 inline-block" />
                    {/each}
                </div>
            </div>
        </div>
    </section>

    <footer class="bg-surface-100-800-token py-8">
        <div class="container mx-auto px-4 text-center">
            <p class="text-surface-900-50-token">© {new Date().getFullYear()} BDS - Tous droits réservés
            </p>
        </div>
    </footer>
</main>



<style>
    /* Style complémentaire pour assurer le bon rendu de la vidéo */
    video {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }


    .overflow-hidden {
        display: flex;
        flex-direction: column;
    }

    .animate-marquee {
        animation: marquee 30s linear infinite;
        white-space: nowrap;
    }

    @keyframes marquee {
        0% {
            transform: translateX(0%);
        }
        100% {
            transform: translateX(-100%);
        }
    }
</style>
