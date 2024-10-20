import z from 'zod';

// TODO: Remplir les tags
export const tags = ['sport'] as const;

export default z.object({
	title: z.string().min(3),
	description: z.string(),
	date: z.date().min(new Date()),
	price: z.number().int().min(0),
	tag: z.enum(tags).optional()
});
