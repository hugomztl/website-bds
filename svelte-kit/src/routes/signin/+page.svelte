<script lang="ts">
	import { page } from '$app/stores';
	import { SignIn } from '@auth/sveltekit/components';
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";

	let email = $page.form?.email || '';
	let password = '';
</script>

<main class="flex h-full flex-col items-center justify-center">
	<h1 class="h1">Se connecter</h1>
	<span>ou <a class="anchor" href="/register">créer un compte</a></span>
	<SignIn class="mt-6 flex w-[25%] flex-col items-center" provider="credentials">
		<svelte:fragment slot="credentials">
			{#if $page.form?.error}
				<p class="alert variant-filled-error mb-6 p-4 px-6">{$page.form.error}</p>
			{/if}
			<input
				class="input variant-form-material border-surface-500-400-token my-2"
				type="email"
				name="email"
				placeholder="Mail viacesi"
				bind:value={email}
			/>
			<input
				class="input variant-form-material border-surface-500-400-token my-2"
				type="password"
				name="password"
				placeholder="Mot de passe"
				bind:value={password}
			/>
		</svelte:fragment>

		<svelte:fragment slot="submitButton">
			<button
				class="btn variant-form-material border-surface-500-400-token mt-2 px-10"
				type="submit">Se connecter
			</button>
		</svelte:fragment>
	</SignIn>

	<Tabs.Root value="account" class="w-[400px]">
		<Tabs.List class="grid w-full grid-cols-2">
		  <Tabs.Trigger value="signin">Se connecter</Tabs.Trigger>
		  <Tabs.Trigger value="register">S'inscrire</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="signin">
		  <Card.Root>
			<Card.Header>
			  <Card.Title>Se connecter</Card.Title>
			  <Card.Description>
				Make changes to your account here. Click save when you're done.
			  </Card.Description>
			</Card.Header>
			<Card.Content class="space-y-2">
			  <div class="space-y-1">
				<Label for="name">Name</Label>
				<Input id="name" value="Pedro Duarte" />
			  </div>
			  <div class="space-y-1">
				<Label for="username">Username</Label>
				<Input id="username" value="@peduarte" />
			  </div>
			</Card.Content>
			<Card.Footer>
			  <Button>Connexion</Button>
			</Card.Footer>
		  </Card.Root>
		</Tabs.Content>
		<Tabs.Content value="register">
		  <Card.Root>
			<Card.Header>
			  <Card.Title>Password</Card.Title>
			  <Card.Description>
				Change your password here. After saving, you'll be logged out.
			  </Card.Description>
			</Card.Header>
			<Card.Content class="space-y-2">
			  <div class="space-y-1">
				<Label for="current">Current password</Label>
				<Input id="current" type="password" />
			  </div>
			  <div class="space-y-1">
				<Label for="new">New password</Label>
				<Input id="new" type="password" />
			  </div>
			</Card.Content>
			<Card.Footer>
			  <Button>Save password</Button>
			</Card.Footer>
		  </Card.Root>
		</Tabs.Content>
	  </Tabs.Root>

</main>
