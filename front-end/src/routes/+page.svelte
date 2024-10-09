<script>
    import Payment from './Payment.svelte'; // Assurez-vous que le chemin est correct
</script>

<main id="app">
    <div>
        <img src="logo-bds.png" alt="Logo BDS" draggable="false" />
    </div>

    <h1>Bientôt, le site du BDS ici 🗿</h1>
    
    <Payment />
</main>

<style>
    :global(*) {
        user-select: none;
    }

    img {
        width: 20rem;
    }
</style>