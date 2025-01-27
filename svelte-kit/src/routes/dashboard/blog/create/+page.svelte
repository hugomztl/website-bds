<script>
	import { enhance } from '$app/forms';
	import { Label } from "$lib/components/ui/label";
	import { Textarea } from "$lib/components/ui/textarea";
	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";
	import Footer from '$lib/components/footer.svelte';

	export let data;
</script>



<div class="container my-[5%]">
	<form method="POST" action="/dashboard/blog/?/createPost" use:enhance>
		<h2 class="h2">Créer un nouveau post</h2>
		<div>
			<Label for="title">Titre</Label>
			<Input class="input" type="text" name="title" required />
		</div>
		<div>
			<Label for="author">Auteur</Label>
			<Input class="w-[20vh]" type="text" name="author" value={data.session?.user?.name + " (Vous)"} disabled />
		</div>
		<div>
			<Label for="content">Contenu</Label>
			<Textarea class="textarea form-textarea h-[60vh]" name="content" required/>
		</div>
		<div class="flex justify-center">
			<Button type="submit" class="mt-5">
				Publier
			</Button>
		</div>
	</form>
</div>

<Footer/>