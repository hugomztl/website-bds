import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { CredentialsSignin, SvelteKitAuth, type DefaultSession } from '@auth/sveltekit';
import Credentials from '@auth/sveltekit/providers/credentials';
import bcrypt from 'bcrypt';
import { formatName } from '$lib/email';
import User from '$lib/models/User';
import { client } from '$lib/database';

// Ces deux modules permettent d'étendre la définition des types de AuthJS
// Si on veut ajouter des propriétés, il faut également les ajouter dans les callbacks adaptés du SvelteKitAuth
declare module '@auth/core/jwt' {
	interface JWT {
		isAdmin: boolean;
	}
}

declare module '@auth/sveltekit' {
	interface Session {}

	interface User {
		isAdmin: boolean;
	}
}

class InvalidCredentialsError extends CredentialsSignin {
	code = 'Identifiant ou mot de passe invalide';
}

export const { handle, signIn, signOut } = SvelteKitAuth({
	session: {
		strategy: 'jwt'
	},
	// Nécessaire pour le déploiement Docker
	trustHost: true,
	debug: process.env.NODE_ENV !== 'production',
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				token.isAdmin = user.isAdmin;
			}
			return token;
		},
		session({ session, token }) {
			session.user.isAdmin = token.isAdmin;
			return session;
		}
	},
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {}
			},
			authorize: async (credentials) => {
				let user = null;

				if (!(typeof credentials.password === 'string' && typeof credentials.email === 'string')) {
					return null;
				}

				// On vérifie si l'utilisateur existe déjà
				// TODO: Utilisation possible de mongoose?
				user = await User.findOne({
					email: credentials.email
				}).select('+password');

				// Si l'utilisateur n'existe pas ou que le mot de passe est incorrect
				if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
					throw new InvalidCredentialsError();
				}
				return {
					email: user.email,
					name: formatName(user.email),
					isAdmin: user.admin
				};
			}
		})
	],
	adapter: MongoDBAdapter(client),
	pages: {
		signIn: '/signin'
	}
});
