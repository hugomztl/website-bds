<script lang="ts">
    export let data;

    let post = data.post;
</script>

<article>
    <h1>{post.title}</h1>
    <p><em>{new Date(post.postedAt).toLocaleDateString()}</em></p>
    <div>{@html post.content}</div>
</article>