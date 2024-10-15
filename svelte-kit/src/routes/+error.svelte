<script lang="ts">
	import { page } from '$app/stores';
	import { onMount, onDestroy } from 'svelte';

	let gameCanvas: HTMLCanvasElement | null = null;
	let ctx: CanvasRenderingContext2D | null = null;
	let birdY = 150;
	let birdDY = 0;
	let gravity = 0.2;
	let isGameOver = false;
	let isGameStarted = false;
	let pipeWidth = 50;
	let pipeGap = 150;
	let pipes: { x: number, y: number }[] = [];
	let birdRadius = 10;
	let score = 0;
	let jumpStrength = -4.5;
	let pipeSpeed = 2;

	const minPipeSpacing = 200;
	const maxPipeOffset = 50;

	// Image de "looser.gif" qui s'affichera lorsque le joueur perd
	let looserImageVisible = false;

	// Tableau réactif pour le leaderboard
	let leaderboard = [
		{ position: 1, username: 'Player1', score: 50 },
		{ position: 2, username: 'Player2', score: 40 },
		{ position: 3, username: 'Player3', score: 30 },
		{ position: 4, username: 'Player4', score: 20 },
		{ position: 5, username: 'Player5', score: 10 }
	];

	let currentPosition = leaderboard.length + 1; // Position actuelle du joueur dans le leaderboard

	// Fonction pour démarrer le jeu
	function startGame() {
		isGameStarted = true;
		isGameOver = false;
		birdY = 150;
		birdDY = 0;
		pipes = [];
		score = 0;
		looserImageVisible = false; // Cacher le gif quand on commence une nouvelle partie

		for (let i = 0; i < 3; i++) {
			let pipeX = 300 + i * minPipeSpacing;
			let pipeY = Math.random() * 200 + 100;
			pipes.push({ x: pipeX, y: pipeY });
		}

		handleJump();

		requestAnimationFrame(update);
	}

	// Fonction pour mettre à jour le leaderboard à la fin de la partie
	function updateLeaderboard() {
		// Cherche si le joueur est déjà dans le leaderboard
		let playerIndex = leaderboard.findIndex(player => player.username === 'You');

		if (playerIndex === -1) {
			// Si le joueur n'existe pas, ajoute-le au leaderboard
			leaderboard.push({ position: leaderboard.length + 1, username: 'You', score });
		} else {
			// Si le joueur existe, mets à jour son score avec le score le plus élevé
			leaderboard[playerIndex].score = Math.max(leaderboard[playerIndex].score, score);
		}

		// Trie le leaderboard par score décroissant
		leaderboard.sort((a, b) => b.score - a.score);

		// Met à jour la position de chaque joueur
		for (let i = 0; i < leaderboard.length; i++) {
			leaderboard[i].position = i + 1;
		}

		// Trouve la position actuelle du joueur
		currentPosition = leaderboard.findIndex(player => player.username === 'You') + 1;
	}

	// Fonction de mise à jour du jeu
	function update() {
		if (!ctx || isGameOver) return;

		// Dessine le fond bleu
		ctx.fillStyle = 'skyblue';
		ctx.fillRect(0, 0, gameCanvas!.width, gameCanvas!.height);

		// Logique de l'oiseau
		birdDY += gravity;
		birdY += birdDY;

		// Vérifie si l'oiseau touche le sol ou dépasse l'écran
		if (birdY + birdRadius >= gameCanvas!.height || birdY - birdRadius <= 0) {
			isGameOver = true;
			looserImageVisible = true; // Affiche le gif quand le joueur perd
			updateLeaderboard(); // Met à jour le leaderboard quand le jeu est terminé
		}

		// Dessine l'oiseau
		ctx.beginPath();
		ctx.arc(50, birdY, birdRadius, 0, Math.PI * 2);
		ctx.fillStyle = 'yellow';
		ctx.fill();
		ctx.closePath();

		// Logique des tuyaux
		for (let i = 0; i < pipes.length; i++) {
			let pipe = pipes[i];
			pipe.x -= pipeSpeed;

			// Si un tuyau sort de l'écran, il est repositionné avec une nouvelle hauteur
			if (pipe.x + pipeWidth < 0) {
				pipe.x = gameCanvas!.width;

				const previousPipeY = pipes[(i - 1 + pipes.length) % pipes.length].y;
				let newPipeY = previousPipeY + (Math.random() * maxPipeOffset * 2 - maxPipeOffset);

				newPipeY = Math.min(Math.max(newPipeY, 100), gameCanvas!.height - 100);

				pipe.y = newPipeY;
				score++;
			}

			// Dessine les tuyaux
			ctx.fillStyle = 'green';
			ctx.fillRect(pipe.x, 0, pipeWidth, pipe.y - pipeGap / 2);
			ctx.fillRect(pipe.x, pipe.y + pipeGap / 2, pipeWidth, gameCanvas!.height - pipe.y);

			// Vérifie les collisions avec les tuyaux
			if (
				50 + birdRadius > pipe.x &&
				50 - birdRadius < pipe.x + pipeWidth &&
				(birdY - birdRadius < pipe.y - pipeGap / 2 || birdY + birdRadius > pipe.y + pipeGap / 2)
			) {
				isGameOver = true;
				looserImageVisible = true; // Affiche le gif en cas de collision
				updateLeaderboard(); // Met à jour le leaderboard quand il y a collision
			}
		}

		// Affiche le score
		ctx.fillStyle = 'black';
		ctx.font = '20px Arial';
		ctx.fillText(`Score: ${score}`, 10, 20);

		// Si ce n'est pas Game Over, continue d'animer
		if (!isGameOver) {
			requestAnimationFrame(update);
		} else {
			ctx.fillStyle = 'red';
			ctx.fillText('Game Over', gameCanvas!.width / 2 - 50, gameCanvas!.height / 2);
			isGameStarted = false;
		}
	}

	// Fonction pour gérer le saut de l'oiseau
	function handleJump() {
		if (isGameOver) return;
		birdDY = jumpStrength;
	}

	// Fonction pour gérer les événements clavier
	function handleKeydown(event: KeyboardEvent) {
		if (event.code === 'Space') {
			if (!isGameStarted) {
				startGame();
			} else if (!isGameOver) {
				handleJump();
			} else {
				// Si on appuie sur espace après un Game Over, le gif disparaît et la partie recommence
				looserImageVisible = false;
				startGame();
			}
		}
	}

	// Attache et détache les écouteurs d'événements uniquement côté client
	onMount(() => {
		if (typeof window !== 'undefined') {
			if (gameCanvas) {
				ctx = gameCanvas.getContext('2d');
			}
			window.addEventListener('keydown', handleKeydown);
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('keydown', handleKeydown);
		}
	});
</script>

<main>
	<img src="/looser.gif" alt="Game Over" class="looser-gif" style:display={looserImageVisible ? 'block' : 'none'} style="width: 100vw; height: 100vh; opacity: 0.5;" />
	<h1>Error <span class="error-code">{$page.status}</span></h1>
	<p>Error occured : <b>{$page.error?.message}</b></p>
	<a class="home" href="/">Back to home</a>

	<div style="text-align:center;">
		<h2>or waste your time : </h2>
		<p>press space to start playing</p>

		<!-- Affichage du gif de Game Over -->
		

		<canvas bind:this={gameCanvas} width="400" height="400"></canvas>
	</div>

	<div class="table-container">
		<!-- Tableau pour le leaderboard -->
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Position</th>
					<th>Name</th>
					<th>Score</th>
				</tr>
			</thead>
			<tbody>
				{#each leaderboard as row}
					<tr class={row.username === 'You' ? 'highlight' : ''}>
						<td>{row.position}</td>
						<td>{row.username}</td>
						<td>{row.score}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</main>

<style>
	main {
		margin: auto;
		text-align: center;
	}

	h1,
	p {
		font-weight: 400;
	}

	.error-code {
		color: coral;
		font-weight: bold;
	}

	.home {
		color: blueviolet;
		font-weight: bold;
		text-decoration: underline;
	}

	canvas {
		border: 1px solid black;
		display: block;
		margin: 20px auto;
		background-color: skyblue;
	}

	/* Style du gif de "Game Over" */
	.looser-gif {
		display: none;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	/* Limiter la largeur du leaderboard et le centrer */
	.table-container {
		margin: 20px auto;
		max-width: 400px;
	}

	.table {
		width: 100%;
		border-collapse: collapse;
	}

	.table th,
	.table td {
		border: 1px solid #ddd;
		padding: 8px;
		text-align: center;
	}

	/* Highlight the player's row */
	.highlight {
		background-color: lightyellow;
	}
</style>
