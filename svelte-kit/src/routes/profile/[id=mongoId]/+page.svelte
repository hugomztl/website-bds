<script lang="ts">
	import { page } from '$app/stores';

	export let data;
	$: user = data.user;
	$: sameUser = data.session?.user?.id === user._id.toString();
</script>

<main id="app">
	<h1 style="margin-bottom: 0;">Profil de <span class="user-name">{user.fullName}</span></h1>
	<p style="margin-top: 0;">Inscrit le {user.dateInscription?.toLocaleDateString() ?? 'N/A'}</p>

	{#if $page.data.session?.user?.isAdmin || user._id === $page.data.session?.user?.id}
		<a href={`/profile/${encodeURIComponent(user._id ?? '')}/edit`} class="edit-profile-button">
			<button>
				Modifier le profil
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
					<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
				</svg>
			</button>
		</a>
	{/if}

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
	{#if !user.license && sameUser}
		<a href="/ffsu">
			<button
				class="btn flex transform items-center gap-2 rounded-md bg-blue-500 px-4 py-2 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-600"
			>
				Acheter ma licence FFSU
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="inline-block"
				>
					<circle cx="9" cy="21" r="1"></circle>
					<circle cx="20" cy="21" r="1"></circle>
					<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
				</svg>
			</button>
		</a>
	{/if}
	{#if user.license && !user.licenseGenerated && sameUser}
		<div class="warning-banner">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="warning-icon"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path
					d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
				></path>
				<line x1="12" y1="9" x2="12" y2="13"></line>
				<line x1="12" y1="17" x2="12.01" y2="17"></line>
			</svg>
			<span class="warning-text"
				>Attention : Votre licence FFSU n'a pas encore été générée. Veuillez la générer dès que
				possible.</span
			>
		</div>
		<a href="/">
			<button
				class="btn flex transform items-center gap-2 rounded-md bg-blue-500 px-4 py-2 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-600"
			>
				Générer ma licence FFSU
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="inline-block"
				>
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
					<polyline points="7 10 12 15 17 10"></polyline>
					<line x1="12" y1="15" x2="12" y2="3"></line>
				</svg>
			</button>
		</a>
	{/if}

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

	.edit-profile-button {
		display: inline-block;
		margin-bottom: 1rem;
		text-decoration: none;
	}

	.edit-profile-button button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background-color: #4caf50;
		color: white;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 1rem;
		transition: background-color 0.3s ease;
	}

	.edit-profile-button button:hover {
		background-color: #45a049;
	}

	.warning-banner {
		display: flex;
		align-items: center;
		background-color: #ffa500;
		color: #ffffff;
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
		margin-bottom: 1rem;
	}

	.warning-icon {
		width: 24px;
		height: 24px;
		margin-right: 0.75rem;
	}

	.warning-text {
		font-weight: 500;
	}
</style>
