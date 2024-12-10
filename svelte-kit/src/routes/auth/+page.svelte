<script lang="ts">
	import { SignIn } from '@auth/sveltekit/components';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { signIn } from '@auth/sveltekit/client';
	import { goto } from '$app/navigation';

	let email = $page.form?.email || '';
	let password = '';
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

		<img src="/signin.png" alt="bds" class="absolute inset-0 h-full w-full object-cover" />
	</div>
	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
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
							<SignIn
								class="items-left flex w-full flex-col"
								provider="credentials"
								signInPage="auth?/signin"
							>
								<svelte:fragment slot="credentials">
									<Label for="email" class="my-2">Email</Label>
									<Input type="email" name="email" placeholder="Mail viacesi" bind:value={email} />
									<Label for="password" class="my-2">Mot de passe</Label>
									<Input
										type="password"
										name="password"
										placeholder="Mot de passe"
										bind:value={password}
									/>
								</svelte:fragment>

								<svelte:fragment slot="submitButton">
									<Button type="submit" class="my-2">Connexion</Button>
								</svelte:fragment>
							</SignIn>
						</Card.Content>
						<Card.Footer>
							<p class="text-muted-foreground px-8 text-center text-sm">
								En cliquant sur connexion, vous acceptez nos
								<a href="/terms" class="hover:text-primary underline underline-offset-4">
									Conditions d'utilisation
								</a>
								et
								<a href="/privacy" class="hover:text-primary underline underline-offset-4">
									Prolitique de confidentialité
								</a>
								.
							</p>
						</Card.Footer>
					</Card.Root>
				</Tabs.Content>
				<Tabs.Content value="register">
					<Card.Root>
						<Card.Header>
							<Card.Title>S'inscrire</Card.Title>
							<Card.Description>Créer mon compte BDS.</Card.Description>
						</Card.Header>
						<Card.Content>
							<form
								class="mt-6 flex w-[25%] flex-col items-center"
								action="?/register"
								method="POST"
								use:enhance={() => {
									return async ({ update, formData, result }) => {
										if (['error', 'failure'].includes(result.type)) return update();

										const signInResult = await signIn('credentials', {
											email: formData.get('email'),
											password: formData.get('password')
										});

										if (signInResult?.ok) {
											goto('/');
										} else {
											console.error("Une erreur s'est produite lors de la connexion.");
										}
									};
								}}
							>
								{#if $page.form?.taken}
									<p class="alert variant-filled-error mb-6 p-4 px-6">
										Cette adresse e-mail est déjà utilisée.
									</p>
								{/if}
								{#if $page.form?.invalid || $page.form?.missing}
									<p class="alert variant-filled-error mb-6 p-4 px-6">
										Entrez une adresse e-mail viacesi.
									</p>
								{/if}
								{#if $page.form?.password_no_match}
									<p class="alert variant-filled-error mb-6 p-4 px-6">
										Les mots de passe ne correspondent pas.
									</p>
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
								/>
								<input
									class="input variant-form-material border-surface-500-400-token my-2"
									type="password"
									name="password_confirm"
									placeholder="Confirmer le mot de passe"
								/>
								<button
									class="btn variant-form-material border-surface-500-400-token mt-2 px-10"
									type="submit">Créer un compte</button
								>
							</form>
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
		</div>
	</div>
</div>
