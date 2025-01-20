<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Separator } from "$lib/components/ui/separator";
	import { Linkedin, Instagram, Youtube } from 'lucide-svelte';

    const instagramLink = "https://www.instagram.com/bds_cesi_nancy/";
    const discordLink = "https://www.discord.gg/tMNdRkJgDA";
    const youtubeLink = "https://www.youtube.com/@BDSCESINANCY";
    const linkedinLink = "https://www.linkedin.com/company/bureau-des-sports-cesi-nancy";

    const termsLink = "/legal/terms";
    const privacyLink = "/legal/privacy";

</script>
<footer class="py-8 bg-black text-white">
    <div class="container mx-auto px-4 font-roboto">
      <div class="flex flex-wrap justify-between items-center mb-8">
        <div class="mb-6 md:mb-0 flex flex-col space-x-2">
          
          <div class="flex text-xl font-bold uppercase"><img src="/logo-bds.png" alt="BDS" class="w-8 h-8">BDS Cesi Nancy</div>
          <Separator class="my-2"/>
          <Card.Description>19 Av. de la Forêt de Haye Bâtiment Orion,<br/>54500 Vandœuvre-lès-Nancy, France</Card.Description>
          <div class="w-[100%] h-auto mt-2"><iframe title="BDS CESI Nancy" width="100%" height="100%" frameborder="0" scrolling="yes" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=19%20Av.%20de%20la%20For%C3%AAt%20de%20Haye%20B%C3%A2timent%20Orion,%2054500%20Vand%C5%93uvre-l%C3%A8s-Nancy+(BDS%20CESI%20Nancy)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps tracker sport</a></iframe></div>

        </div>
        <div class="w-full md:w-auto flex justify-between space-x-12">
          <div>
            <h2 class="text-sm font-bold mb-4 uppercase ml-4">Resources</h2>
            <ul>
              <li><Button href="mailto:contact@bds-cesi-nancy.fr" variant="link" class="text-white">contact@bds-cesi-nancy.fr</Button></li>
              <li><Button href="https://nancy.cesi.fr/campus/vie-campus/" variant="link" class="text-white">Vie de campus</Button></li>
            </ul>
          </div>
          <div>
            <h2 class="text-sm font-bold mb-4 uppercase ml-4">suivez nous</h2>
            <ul>
              <li><Button href={instagramLink} variant="link" class="text-white">Instagram</Button></li>
              <li><Button href={discordLink} variant="link" class="text-white">Discord</Button></li>
              <li><Button href={youtubeLink} variant="link" class="text-white">YouTube</Button></li>
              <li><Button href={linkedinLink} variant="link" class="text-white">LinkedIn</Button></li>
            </ul>
          </div>
          <div>
            <h2 class="text-sm font-bold mb-4 uppercase ml-4">Légal</h2>
            <ul>
              <li><Button href={privacyLink} variant="link" class="text-white">Politique de confidentialité</Button></li>
              <li><Button href={termsLink} variant="link" class="text-white">Termes et conditions d'utilisation</Button></li>
            </ul>
          </div>
        </div>
      </div>
      <Separator class="w-full"/>
      <div class="flex pt-4 justify-between">
        <p>© {new Date().getFullYear()} BDS Cesi Nancy Tous droits.</p>
        <div class="flex justify-center space-x-4">
          <Button href={instagramLink} class="text-white" variant="ghost"><Instagram/></Button>
          <Button href={discordLink} class="text-white" variant="ghost"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-discord" viewBox="0 0 16 16">
            <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
          </svg></Button>
          <Button href={youtubeLink} class="text-white" variant="ghost"><Youtube/></Button>
          <Button href={linkedinLink} class="text-white" variant="ghost"><Linkedin/></Button>
        </div>
      </div>
    </div>
</footer>	  