<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import type { Writable } from 'svelte/store';

	export let checked: Writable<boolean>;
	export let mongoId: Writable<string>;
</script>

<div class="flex items-center space-x-2">
	<Checkbox bind:checked={$checked} id="id" />
	<Label for="id">{mongoId}</Label>
</div>
