import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';
import { client } from './lib/database';

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [GitHub],
	adapter: MongoDBAdapter(client)
});
