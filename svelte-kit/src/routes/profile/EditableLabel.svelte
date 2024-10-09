<script lang="ts">
	import type { Writable } from 'svelte/store';

	export let editable = true;
	export let value: Writable<string>;
	let innerValue = $value;

	let isEditing = false;
	let contentSpan: HTMLSpanElement;

	function focus() {
		isEditing = true;
	}

	function blur() {
		cancel();
	}

	function keydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			validate();
			(event.currentTarget as HTMLElement)?.blur();
		}

		if (event.key === 'Escape') {
			cancel();
			(event.currentTarget as HTMLElement)?.blur();
		}
	}

	function validate() {
		value.set(innerValue);
		isEditing = false;
	}

	function cancel() {
		innerValue = $value;
		isEditing = false;
	}
</script>

<span class="editable-label-wrapper">
	{#if editable}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<span
			contenteditable
			on:focus={focus}
			on:blur={blur}
			on:keydown={keydown}
			bind:this={contentSpan}
			bind:innerHTML={innerValue}
		>
			{innerValue}
		</span>
		{#if $value.length === 0 && !isEditing}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span contenteditable="false" on:click={() => contentSpan.focus()}
				>Entrez une valeur pour discord.</span
			>
		{/if}
		{#if isEditing}
			<div class="buttons">
				<button on:click={validate}>✔️</button>
				<button on:click={cancel}>❌</button>
			</div>
		{/if}
	{:else}
		<span>{innerValue}</span>
	{/if}
</span>

<style>
	.editable-label-wrapper {
		position: relative;
	}

	span[contenteditable] {
		cursor: pointer;
	}

	div.buttons {
		display: flex;
		position: absolute;
		bottom: -50%;
		left: 100%;
		gap: 0.5em;
		padding: 0;
	}
</style>
