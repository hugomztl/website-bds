<script lang="ts">
	export let data;
	const user = data.user;
</script>

<main id="app">
	<h1>Profil de <span class="user-name">{user.fullName}</span></h1>

	<p><b>Licencié:</b> {user.license ? 'Oui ✔' : 'Non ❌'}</p>

	<p><b>Email:</b> {user.email}</p>
</main>

<style>
	h1 {
		font-size: 1.5rem;
		font-weight: 400;
	}

	.user-name {
		font-weight: 600;
		text-decoration: underline;
	}
</style>
