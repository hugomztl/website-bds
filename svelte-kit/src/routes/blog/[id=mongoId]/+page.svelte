<script lang="ts">
	export let data;
	$: post = data.post;
</script>

<h1>{post.title}</h1>
<p>{post.content}</p>
