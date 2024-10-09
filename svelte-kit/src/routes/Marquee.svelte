<script lang="ts">
	export let partenaires: { nom: string; logo: string }[];
	export let scrollSpeedSec = 5;
</script>

<div class="stock-ticker" style="--scroll-speed: {scrollSpeedSec}s">
	<ul>
		{#each partenaires as partenaire}
			<li><img src={partenaire.logo} alt={partenaire.nom} /></li>
		{/each}
	</ul>

	<ul aria-hidden="true">
		{#each partenaires as partenaire}
			<li><img src={partenaire.logo} alt={partenaire.nom} /></li>
		{/each}
	</ul>
</div>

<style lang="postcss">
	img {
		height: 5rem;
	}

	.stock-ticker {
		font-size: 15px;
		padding-block: 8px;
		border-block: 1px solid;
		overflow: hidden;
		user-select: none;

		--gap: 5rem;
		display: flex;
		gap: var(--gap);
	}

	.stock-ticker ul {
		list-style: none;
		flex-shrink: 0;
		min-width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--gap);

		animation: scroll var(--scroll-speed) linear infinite;
	}

	.stock-ticker:hover ul {
		animation-play-state: paused;
	}

	@keyframes scroll {
		to {
			transform: translateX(calc(-100% - var(--gap)));
		}
	}
</style>
