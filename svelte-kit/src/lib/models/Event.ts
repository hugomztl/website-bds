import { zodSchema } from '@zodyac/zod-mongoose';
import mongoose, { model, type InferSchemaType } from 'mongoose';
import zEvent from './schemas/zEvent';

const EventSchema = zodSchema(zEvent);

// Permet de reconstruire le modèle en mode dev pour le HMR de Vite
if (process.env.NODE_ENV === 'development' && mongoose.models.Event) {
	delete mongoose.models.Event;
}

export type EventType = InferSchemaType<typeof EventSchema> & { _id: mongoose.Types.ObjectId };

const Event = model('Event', EventSchema);

export default Event;
