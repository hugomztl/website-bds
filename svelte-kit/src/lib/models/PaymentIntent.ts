import mongoose, { model, Schema, type InferSchemaType } from 'mongoose';

const PaymentIntentSchema = new Schema({
	intentId: {
		type: Number,
		required: true,
		unique: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	hasFailed: {
		type: Boolean,
		default: false
	}
});

// Permet de reconstruire le modèle en mode dev pour le HMR de Vite
if (process.env.NODE_ENV === 'development' && mongoose.models.PaymentIntent) {
	delete mongoose.models.PaymentIntent;
}

export type PaymentIntentType = InferSchemaType<typeof PaymentIntentSchema> & {
	_id: mongoose.Types.ObjectId;
};

const PaymentIntent = model('PaymentIntent', PaymentIntentSchema);

export default PaymentIntent;
