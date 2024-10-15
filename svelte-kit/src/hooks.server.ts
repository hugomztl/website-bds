import { dbConnect } from '$lib/database';
import { z } from 'zod';
import { extendZod } from '@zodyac/zod-mongoose';
import { building } from '$app/environment';

// A n'exécuter qu'une fois; permet de mettre en place zod-mongoose
extendZod(z);

if (!building) {
	await dbConnect();
}

export { handle } from './auth';
