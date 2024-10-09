<script lang="ts">
	export let partenaires: { nom: string; logo: string }[];
	export let scrollSpeedSec = 5;
	export let scrollSpeedPx: number | undefined = undefined;

	let marqueeWidth = 1;
	let wrapperWidth = 1;

	$: scrollSpeed = scrollSpeedPx !== undefined ? wrapperWidth / scrollSpeedPx : scrollSpeedSec;
	// Max 10 pour pas tout péter 🙂
	$: totalAmount = Math.min(Math.ceil(marqueeWidth / (wrapperWidth || 1)) + 1, 10);
</script>

<div class="marquee h-20" style="--scroll-speed: {scrollSpeed}s;" bind:clientWidth={marqueeWidth}>
	<div class="marquee-scroller" style="width: {wrapperWidth}px;">
		{#each Array(totalAmount) as _}
			<div class="wrapper" bind:clientWidth={wrapperWidth}>
				{#each partenaires as partenaire}
					<img src={partenaire.logo} alt={partenaire.nom} class="mx-8 inline-block h-20" />
				{/each}
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.marquee {
		box-sizing: content-box;
		overflow: hidden;
		position: relative;
		display: block ruby;
	}

	.marquee-scroller {
		--initial-pos: 0%;
		--final-pos: -100%;
		white-space: nowrap;
		height: 100%;
		-moz-transform: translateX(var(--initial-pos));
		-webkit-transform: translateX(var(--initial-pos));
		transform: translateX(var(--initial-pos));
		-moz-animation: scroll-left var(--scroll-speed) linear infinite;
		-webkit-animation: scroll-left var(--scroll-speed) linear infinite;
		animation: scroll-left var(--scroll-speed) linear infinite;
	}

	.wrapper {
		display: inline-flex;
		width: max-content;
	}

	@-moz-keyframes scroll-left {
		0% {
			-moz-transform: translateX(var(--initial-pos));
		}
		100% {
			-moz-transform: translateX(var(--final-pos));
		}
	}

	@-webkit-keyframes scroll-left {
		0% {
			-webkit-transform: translateX(var(--initial-pos));
		}
		100% {
			-webkit-transform: translateX(var(--final-pos));
		}
	}

	@keyframes scroll-left {
		0% {
			-moz-transform: translateX(var(--initial-pos));
			-webkit-transform: translateX(var(--initial-pos));
			transform: translateX(var(--initial-pos));
		}
		100% {
			-moz-transform: translateX(var(--final-pos));
			-webkit-transform: translateX(var(--final-pos));
			transform: translateX(var(--final-pos));
		}
	}
</style>
