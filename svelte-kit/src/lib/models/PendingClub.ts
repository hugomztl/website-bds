import mongoose, { model, Schema, type InferSchemaType } from 'mongoose';

const PendingClubSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	logo: String,
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	requireLicense: {
		type: Boolean,
		default: true
	}
});

// Permet de reconstruire le modèle en mode dev pour le HMR de Vite
if (process.env.NODE_ENV === 'development' && mongoose.models.PendingClub) {
	delete mongoose.models.PendingClub;
}

export type PendingClubType = InferSchemaType<typeof PendingClubSchema> & {
	_id: mongoose.Types.ObjectId;
};

const PendingClub = model('PendingClub', PendingClubSchema);

export default PendingClub;
