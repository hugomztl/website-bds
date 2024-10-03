import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { SvelteKitAuth, type User } from '@auth/sveltekit';
import Credentials from '@auth/sveltekit/providers/credentials';
import { client } from './lib/database';

declare module '@auth/sveltekit' {
	interface User {
		license: boolean;
	}
}

export const { handle, signIn, signOut } = SvelteKitAuth({
	session: {
		strategy: 'jwt'
	},
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {}
			},
			authorize: async (credentials) => {
				let user = null;

				// On vérifie si l'utilisateur existe déjà
				// TODO: Utilisation possible de mongoose?
				user = (await client.db().collection('users').findOne({
					email: credentials.email,
					password: credentials.password
				})) as unknown as User;

				if (!user) {
					return null;
				}

				return {
					email: user.email,
					license: user.license
				};
			}
		})
	],
	adapter: MongoDBAdapter(client),
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				token.license = user.license;
			}
			return token;
		},
		async signIn({ user, credentials }) {
			if (!credentials) {
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
