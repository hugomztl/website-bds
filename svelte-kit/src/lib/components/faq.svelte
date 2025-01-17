<script lang='ts'>
    export let shortcut = '';
    import * as Accordion from "$lib/components/ui/accordion";
</script>

<Accordion.Root>
    <Accordion.Item value="item-1">
        <Accordion.Trigger>Comment rejoindre un club existant ?</Accordion.Trigger>
        <Accordion.Content>
            Pour rejoindre un club, accédez à la <a href="/clubs" class="underline">liste des clubs</a> et choisissez le club qui vous intéresse pour accéder à sa page. Vous pourrez alors effectuer une demande d'adhésion. Alternativement, vous pouvez chercher un club précis en utilisant la barre de recherche en haut de la page ou en appuyant sur
          <kbd
          class="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span class="text-xs">{shortcut}K</span>
          </kbd>
        </Accordion.Content>
      </Accordion.Item>
    <Accordion.Item value="item-2">
        <Accordion.Trigger>Comment créer un club ?</Accordion.Trigger>
        <Accordion.Content>
          Pour créer un club, il vous suffit de remplir le formulaire de demande de création de club. Un administrateur se chargera de répondre à la demande dans les 48H.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>Comment obtenir ma licence FFSU ?</Accordion.Trigger>
        <Accordion.Content>
          Yes. It adheres to the WAI-ARIA design pattern.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-4">
        <Accordion.Trigger>Puis-je pratiquer sans licence ?</Accordion.Trigger>
        <Accordion.Content>
          Oui, si les installations utilisées par le club ne sont pas mises à disposition par la FFSU. Dans le cas contraire, une licence est obligatoire une fois vos séances d'essai épuisées.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-5">
        <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
        <Accordion.Content>
          Yes. It adheres to the WAI-ARIA design pattern.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-6">
        <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
        <Accordion.Content>
          Yes. It adheres to the WAI-ARIA design pattern.
        </Accordion.Content>
      </Accordion.Item>
  </Accordion.Root>