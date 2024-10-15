import mongoose from 'mongoose';
import { z } from 'zod';

export default z.object({
	name: z.string().min(5),
	description: z.string().min(1),
	logo: z.string().optional(),
	owner: z
		.string()
		.optional()
		.refine((val) => (val ? mongoose.Types.ObjectId.isValid(val) : true), {
			message: 'Invalid ObjectId'
		}),
	requireLicense: z.boolean().default(false)
});
