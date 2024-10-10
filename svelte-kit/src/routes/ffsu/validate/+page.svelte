<script lang="ts">
	export let data;
</script>

<main>
	{#if data.error}
		<p class="variant-filled-error">{data.error}</p>
	{:else}
		<p class="variant-filled-success">Paiement réussi!</p>
	{/if}
</main>
