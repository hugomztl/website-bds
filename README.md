# website-bds

architecture micro-services
- user ([Login Microsoft](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow))
- club
- admin
- payment <br>
  [API Hello Asso](https://dev.helloasso.com/docs/introduction-à-lapi-de-helloasso) <br><br>
  ![helloasso](https://files.readme.io/09e4b42-image.png)
- notifications
- API > ExpressJs
-

Pour lancer le projet:
 1. Copier le fichier `.env.example` et le renmmer en `.env` dans svelte-kit et renseigner les variables d'environnement
 2. Lancer le docker compose avec la commande:
    -  `docker compose up -d --build` pour le **dev**
    -  `docker compose -f compose.yaml -f compose.prod.yaml up -d --build` pour le **prod**