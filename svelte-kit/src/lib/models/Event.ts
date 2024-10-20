import { zodSchema } from '@zodyac/zod-mongoose';
import mongoose, { model } from 'mongoose';
import zEvent from './schemas/zEvent';
import { z } from 'zod';

const EventSchema = zodSchema(zEvent);

// Permet de reconstruire le modèle en mode dev pour le HMR de Vite
if (process.env.NODE_ENV === 'development' && mongoose.models.Event) {
	delete mongoose.models.Event;
}

export type EventType = mongoose.Document & z.infer<typeof zEvent>;

const Event = model('Event', EventSchema);

export default Event;
