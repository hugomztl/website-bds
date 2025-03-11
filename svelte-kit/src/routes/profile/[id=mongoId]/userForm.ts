import { promos, sports } from '$lib/enums';
import { z } from 'zod';

export default z.object({
	fullName: z.string(),
	discord: z.string(),
	promo: z.enum(promos),
	sports: z.array(z.enum(sports))
});
