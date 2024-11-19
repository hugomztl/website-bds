<script lang="ts">
	import BlogForm from '../BlogForm.svelte';

	export let data;
	$: post = data.post;
</script>

<h2 class="h2">Modifier un post</h2>
<div class="container mx-auto">
	<BlogForm {post} />
</div>
