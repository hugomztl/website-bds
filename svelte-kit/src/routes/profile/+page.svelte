<script lang="ts">
	export let data;
	const user = data.user;
</script>

<main id="app">
	<h1 style="margin-bottom: 0;">Profil de <span class="user-name">{user.fullName}</span></h1>
	<p style="margin-top: 0;">Inscrit le {user.dateInscription?.toLocaleDateString() ?? 'N/A'}</p>

	{#if user.admin}
		<div class="admin-badge">
			<span class="admin-text">Admin</span>
			<svg class="admin-icon" viewBox="0 0 24 24" width="24" height="24" fill="white">
				<path
					d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"
				/>
			</svg>
		</div>
	{/if}

	<p><b>Licencié:</b> {user.license ? 'Oui ✔' : 'Non ❌'}</p>

	<p><b>Email:</b> {user.email}</p>

	<p><b>Discord:</b> {user.discord ?? '🙅 Pas de discord'}</p>
	<p><b>Promo:</b> {user.promo ?? '🙅 Pas de promo'}</p>
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

	.admin-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: linear-gradient(45deg, #ff8c00, #ffa500, #ffd700);
		color: #fff;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
	}
</style>
