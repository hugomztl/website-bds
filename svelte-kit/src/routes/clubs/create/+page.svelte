<script lang="ts">
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';

	export let data;

	const { form, enhance, errors, constraints } = superForm(data.form);

	$: selectedOwner = $form.owner
		? {
				label: data.users.find((user) => user._id === $form.owner)?.email,
				value: $form.owner
			}
		: undefined;
</script>

<main class="container m-auto mt-[5%]">
	<h1>Créer un club</h1>

	<SuperDebug data={$form} />

	<form method="POST" use:enhance>
		<Input
			type="text"
			placeholder="name"
			name="name"
			aria-invalid={$errors.name ? 'true' : undefined}
			bind:value={$form.name}
			{...$constraints.name}
		/>
		<Input
			type="text"
			placeholder="description"
			name="description"
			aria-invalid={$errors.description ? 'true' : undefined}
			bind:value={$form.description}
			{...$constraints.description}
		/>
		<Label>
			Nécessite une license FFSU
			<input
				type="checkbox"
				name="requireLicense"
				aria-invalid={$errors.requireLicense ? 'true' : undefined}
				bind:checked={$form.requireLicense}
				{...$constraints.requireLicense}
			/>
		</Label>

		{#if data.session?.user?.isAdmin}
			<Label>
				<span>Président</span>
				<Select.Root
					name="owner"
					selected={selectedOwner}
					onSelectedChange={(v) => {
						v && ($form.owner = v.value);
					}}
				>
					<Select.Trigger class="w-[180px]">
						<Select.Value placeholder="Président" />
					</Select.Trigger>
					<Select.Content>
						{#each data.users as user}
							<Select.Item value={user._id}>{user.email}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</Label>
		{/if}

		<Button type="submit">Créer un club</Button>
	</form>
</main>
