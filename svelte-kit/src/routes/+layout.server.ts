import type { LayoutServerLoad } from './$types';
import { z } from 'zod';
import { extendZod } from '@zodyac/zod-mongoose';

// A n'exécuter qu'une fois; permet de mettre en place zod-mongoose
extendZod(z);

// Permet de rendre accessible la session à toutes les pages
export const load: LayoutServerLoad = async (event) => {
	return {
		session: await event.locals.auth()
	};
};
