<!-- <script lang="ts">
	import { page } from '$app/stores';
	import { SignIn } from '@auth/sveltekit/components';
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import CircleAlert from "lucide-svelte/icons/circle-alert";
	import * as Alert from "$lib/components/ui/alert/index.js";

	let email = $page.form?.email || '';
	let password = '';
</script>

<main class="flex h-full flex-col items-center justify-center">
	<h1 class="h1">Se connecter</h1>
	<span>ou <a class="anchor" href="/register">créer un compte</a></span>
	<SignIn class="mt-6 flex w-[25%] flex-col items-center" provider="credentials">
		<svelte:fragment slot="credentials">
			{#if $page.form?.error}
				<Alert.Root variant="destructive">
					<CircleAlert class="h-4 w-4" />
					<Alert.Title>Erreur</Alert.Title>
					<Alert.Description
					>{$page.form.error}</Alert.Description
					>
			  	</Alert.Root>
				<p class="alert variant-filled-error mb-6 p-4 px-6"></p>
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

</main> -->
<script lang="ts">
	import { SignIn } from '@auth/sveltekit/components';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { page } from '$app/stores';
	import { Checkbox } from '$lib/components/ui/checkbox';

	let email = $page.form?.email || '';
	let password = '';
	let checked = false;
</script>

<div
	class="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<div class="bg-muted relative hidden h-full w-full lg:flex">
		<!-- <div
			class="absolute inset-0 bg-cover"
			style="
				background-image:
					url(/signin.jpg);"
		/> -->

		<img src="/signin.jpg" alt="bds" class="absolute inset-0 h-full w-full object-cover" />
	</div>
	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<img src="logo-bds.png" alt="bds" class="mx-auto h-24 w-24" />

			<Tabs.Root value="signin" class="w-[400px]">
				<Tabs.List class="grid w-full grid-cols-2">
					<Tabs.Trigger value="signin">Se connecter</Tabs.Trigger>
					<Tabs.Trigger value="register">S'inscrire</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="signin">
					<Card.Root>
						<Card.Header>
							<Card.Title>Se connecter</Card.Title>
							<Card.Description>Connectez vous à votre compte BDS.</Card.Description>
						</Card.Header>
						<Card.Content>
							<SignIn class="items-left flex w-full flex-col" provider="credentials">
								<svelte:fragment slot="credentials">
									<Label for="email" class="mb-2">Email</Label>
									<Input type="email" name="email" placeholder="Mail @viacesi" bind:value={email} />
									<Label for="password" class="mb-2 mt-5">Mot de passe</Label>
									<Input
										type="password"
										name="password"
										placeholder="Mot de passe"
										bind:value={password}
									/>

									<!-- TODO: gérer le stockage du token dans la session en fonction de la checkbox -->
									<!-- <Tooltip.Root>
										<Tooltip.Trigger>
										<div class="flex items-center justify-center space-x-2 mt-4">
											<Checkbox id="session" bind:checked aria-labelledby="session-label" />
											<Label
											id="session-label"
											for="session"
											class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
											>
											Se souvenir de moi
											</Label>
										</div>
										</Tooltip.Trigger>
										<Tooltip.Content>
										  <p>Vous connecte automatiquement lors de vos prochaines visites</p>
										</Tooltip.Content>
									</Tooltip.Root> -->
								</svelte:fragment>

								<svelte:fragment slot="submitButton">
									<Button type="submit" class="mt-10">Connexion</Button>
								</svelte:fragment>
							</SignIn>
						</Card.Content>
					</Card.Root>
				</Tabs.Content>
				<Tabs.Content value="register">
					<Card.Root>
						<Card.Header>
							<Card.Title>S'inscrire</Card.Title>
							<Card.Description>Créer mon compte BDS.</Card.Description>
						</Card.Header>
						<Card.Content>
							<!-- TODO: ici formulaire de register -->
						</Card.Content>
						<Card.Footer>
							<Button>Save password</Button>
						</Card.Footer>
					</Card.Root>
				</Tabs.Content>

				{#if $page.form?.error}
					<Alert.Root class="mt-[5%]" variant="destructive">
						<CircleAlert class="h-4 w-4" />
						<Alert.Title>Erreur</Alert.Title>
						<Alert.Description>{$page.form.error}</Alert.Description>
					</Alert.Root>
				{/if}
			</Tabs.Root>

			<p class="text-muted-foreground px-8 text-center text-sm">
				En utilisant le site web du BDS, vous acceptez nos
				<a href="/terms" class="hover:text-primary underline underline-offset-4">
					Conditions d'utilisation
				</a>
				et
				<a href="/privacy" class="hover:text-primary underline underline-offset-4">
					Politique de confidentialité
				</a>
				.
			</p>
		</div>
	</div>
</div>
