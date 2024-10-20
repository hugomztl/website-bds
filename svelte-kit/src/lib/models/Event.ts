import { zodSchema } from '@zodyac/zod-mongoose';
import mongoose, { model } from 'mongoose';
import z from 'zod';

// TODO: Remplir les tags
const tags = ['sport'] as const;

export const zEvent = z.object({
	title: z.string(),
	description: z.string(),
	date: z.date(),
	price: z.number().int().min(0),
	tag: z.enum(tags).optional()
});

const EventSchema = zodSchema(zEvent);

// Permet de reconstruire le modèle en mode dev pour le HMR de Vite
if (process.env.NODE_ENV === 'development' && mongoose.models.Event) {
	delete mongoose.models.Event;
}

export type EventType = mongoose.Document & z.infer<typeof zEvent>;

const Event = model('Event', EventSchema);

export default Event;
