<script lang="ts">
	export let data;
	let user = data.session?.user;
</script>

<main id="app">
	{#if user}
		<h1>Profil de <span class="user-name">{user.name}</span></h1>
		<img src={user.image} alt="" />

		<p><b>Licencié:</b> {user.license ? 'Oui ✔' : 'Non ❌'}</p>

		<p><b>Email:</b> {user.email}</p>
	{/if}
</main>

<style>
	img {
		width: 6rem;
		height: 6rem;
		border-radius: 50%;
		box-shadow:
			0 0 10px rgba(0, 0, 0, 0.3),
			0 0 20px rgba(0, 0, 0, 0.2),
			0 0 30px rgba(0, 0, 0, 0.1);
		transition: box-shadow 0.3s ease;
	}

	h1 {
		font-size: 1.5rem;
		font-weight: 400;
	}

	.user-name {
		font-weight: 600;
		text-decoration: underline;
	}
</style>
