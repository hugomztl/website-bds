<script lang='ts'>
    export let nom = '';
    export let prenom = '';
    export let linkedin = '';
    export let imgUrl ='';
    export let classList = '';
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Mail, Linkedin } from 'lucide-svelte';
	import * as Avatar from "$lib/components/ui/avatar";
	import svelteTilt from 'vanilla-tilt-svelte';

    function capitals(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function removeAccent(str: string) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function initials() {
        return prenom.charAt(0).toUpperCase() + nom.charAt(0).toUpperCase();
    }

</script>

<div
    use:svelteTilt={{
        reverse: false,
        max: 20,
        startX: 0,
        startY: 0,
        perspective: 1000,
        scale: 1,
        speed: 300,
        transition: true,
        axis: null,
        reset: true,
    }}
class={classList}
>
    <Card.Root class="hover:shadow-2xl transition-shadow bg-black max-w-prose">
        <Card.Header class="items-center">
            <Card.Title class="text-white">{capitals(prenom)} {nom.toUpperCase()}</Card.Title>
        </Card.Header>
        <Card.Content class="flex justify-center">
            <Avatar.Root class="size-32">
                <Avatar.Image src="/founder/{imgUrl}" alt="{initials()}" class="object-cover"/>
                <Avatar.Fallback>{initials()}</Avatar.Fallback>
            </Avatar.Root>
        </Card.Content>
        <Card.Footer class="justify-center flex-col">
            <Button href="mailto:{removeAccent(prenom)}.{removeAccent(nom)}@viacesi.fr" variant="link" class="text-white"><Mail class="mr-1"/>{removeAccent(prenom)}.{removeAccent(nom)}@viacesi.fr</Button>
            <Button href="https://www.linkedin.com/in/{linkedin}/" variant="link" class="text-white"><Linkedin class="mr-1"/>linkedin.com/in/{linkedin}</Button>
        </Card.Footer>
    </Card.Root>
</div>