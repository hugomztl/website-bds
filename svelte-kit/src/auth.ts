import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { CredentialsSignin, SvelteKitAuth, type User } from '@auth/sveltekit';
import Credentials from '@auth/sveltekit/providers/credentials';
import { client } from './lib/database';

declare module '@auth/sveltekit' {
	interface User {
		license: boolean;
	}
}

class CustomError extends CredentialsSignin {
	code = 'custom_error';
}

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {}
			},
			authorize: async (credentials) => {
				console.log('Trying to authorize user', credentials);

				let user = null;

				// On vérifie si l'utilisateur existe déjà
				// Le cast permet de contourner le problème de typage de Mongo
				// TODO: Utilisation possible de mongoose?
				user = (await client.db().collection('users').findOne({
					email: credentials.email,
					password: credentials.password
				})) as unknown as User;

				if (!user) {
					// Pas d'utilisateur trouvé
					// TODO: Redirection vers une page d'inscription?
					throw new CustomError('Utilisateur introuvable.');
				}

				return user;
			}
		})
	],
	adapter: MongoDBAdapter(client),
	callbacks: {
		jwt({ token }) {
			console.log('Creating new token', token);
			return token;
		},
		async signIn({ user, credentials }) {
			if (!credentials) {
				console.log('No credentials');
				return false;
			}

			// On ajoute les propriétés supplémentaires si elles n'existent pas
			const existingUser = await client.db().collection('users').findOne({ email: user.email });
			user.license = existingUser?.license ?? false;

			// On pourra vérifier si le mail de l'utilisateur n'est pas (via)cesi, et refuser la connexion
			return true;
		},
		// Ce callback permet d'assigner correctement le nouveau modèle
		session({ session }) {
			return session;
		}
	},
	pages: {
		signIn: '/',
		error: '/',
		signOut: '/'
	}
});
