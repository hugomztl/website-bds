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

Pour lancer le projet en **dev**:
 1. A la racine, démarrer la base de données `docker compose up database -d`
 2. Dans le dossier **svelte-kit**, copier le fichier ***.env.example*** et le renommer en ***.env*** , puis renseigner les variables d'environnement
    - ⚠️ Écrire *localhost* comme adresse de la BDD
 3. Installer les dépendances `npm install`
 4. Générer le secret `npx auth secret`
 5. Lancer le serveur de dev `npm run dev`

Pour lancer le projet en **prod**:
 1. Dans le dossier **svelte-kit**, copier le fichier ***.env.example*** et le renommer en ***.env*** , puis renseigner les variables d'environnement
    - ⚠️ Écrire *database* comme adresse de la BDD
 2. Générer le secret `npx auth secret`
 3. Démarrer les conteneurs dans le dossier racine `docker compose -f compose.yaml -f compose.prod.yaml up -d --build`