import { z } from 'zod';

export const registerSchema = z.object({
	email: z.string().email()
		.refine(val => val.endsWith('@viacesi.fr'), {
			message: "L'adresse email doit être une adresse CESI"
		}),
	password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
	confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
	message: "Les mots de passe ne correspondent pas",
	path: ["confirmPassword"]
});