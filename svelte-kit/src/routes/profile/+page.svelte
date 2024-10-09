<script lang="ts">
	import { page } from '$app/stores';

	export let data;
	const user = data.user;
</script>

<main class="flex h-full items-center justify-center">
	<div class="container flex flex-col items-center">
		<h1 class="h1 mt-4">Profil de <span class="font-bold underline">{user.fullName}</span></h1>

		<p class="mt-2"><b>Licencié:</b> {user.license ? 'Oui ✔' : 'Non ❌'}</p>

		<p class="mt-2"><b>Email:</b> {user.email}</p>
	</div>
</main>
