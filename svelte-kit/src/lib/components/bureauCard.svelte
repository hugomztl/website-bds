<script>
    export let nom = '';
    export let prenom = '';
    export let fonction = '';
    export let imageUrl = '';
    import * as Card from "$lib/components/ui/card/index";
    import * as Avatar from "$lib/components/ui/avatar";
	import { Button } from "$lib/components/ui/button/index";
    import { Mail } from 'lucide-svelte';

</script>

<Card.Root class="border-none shadow-none bg-transparent text-white">
    <Card.Header class="items-center">
        <Card.Title>{prenom} {nom}</Card.Title>
        <Card.Description>{fonction}</Card.Description>
    </Card.Header>
    <Card.Content class="flex justify-center">
        <Avatar.Root class="size-32">
            <Avatar.Image src="/bureau/{imageUrl}" alt="HK" class="object-cover"/>
            <Avatar.Fallback>HK</Avatar.Fallback>
        </Avatar.Root>
    </Card.Content>
    <Card.Footer class="justify-center">
        <Button href="mailto:{prenom.toLowerCase()}.{nom.toLowerCase()}@viacesi.fr" variant="link" class="text-white hover:scale-110 transition-transform"><Mail class="mr-1"/>{prenom.toLowerCase()}.{nom.toLowerCase()}@viacesi.fr</Button>
    </Card.Footer>
</Card.Root>