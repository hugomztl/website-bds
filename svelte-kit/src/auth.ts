import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';
import { client } from './lib/database';

declare module '@auth/sveltekit' {
	interface User {
		license: boolean;
	}
}

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [GitHub],
	adapter: MongoDBAdapter(client),
	callbacks: {
		async signIn({ user }) {
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
