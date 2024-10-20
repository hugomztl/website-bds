import z from 'zod';

// TODO: Remplir les tags
export const tags = ['sport'] as const;

export default z.object({
	title: z.string().min(3),
	description: z.string(),
	date: z.date().refine(
		(date) => {
			const today = new Date();
			return date >= today;
		},
		{
			message: 'La date doit être dans le futur.'
		}
	),
	price: z.number().int().min(0),
	tag: z.enum(tags).optional()
});
