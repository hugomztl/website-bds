import type { LayoutServerLoad } from './$types';

// Permet de rendre accessible la session à toutes les pages
export const load: LayoutServerLoad = async (event) => {
	return {
		session: await event.locals.auth()
	};
};
