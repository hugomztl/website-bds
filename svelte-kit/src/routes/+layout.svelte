<script>
	import { SignOut } from '@auth/sveltekit/components';
	import '../app.postcss';
	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	$: session = $page.data.session;
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar class="shadow-xl">
			<svelte:fragment slot="lead">
				<button class="btn hover:variant-soft-primary p-0 ml-5">
					<a href="/"><img src="logo-bds.png" class="w-20" alt="BDS" /></a>
				</button>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<LightSwitch class="mr-4" />
				{#if session}
					{@const user = session?.user}
					<div>
						<span>Bienvenue</span>
						<a href="/profile" class="anchor">{user?.name}</a>
						<br />
						<span class="text-black-900/50">{user?.email}</span>
					</div>
					<SignOut>
						<span slot="submitButton" class="btn variant-filled">Se déconnecter</span>
					</SignOut>
				{:else}
					<div class="">
						<a href="/signin" class="btn variant-filled">Se connecter</a>
						<a href="/register" class="btn variant-filled">Créer un compte</a>
					</div>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot></slot>
</AppShell>
