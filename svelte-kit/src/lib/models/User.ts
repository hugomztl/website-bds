import mongoose, { model, Schema, type InferSchemaType } from 'mongoose';

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		select: false,
		required: true
	},
	fullName: {
		type: String,
		required: true
	},
	license: {
		type: Boolean,
		required: true,
		default: false
	},
	discord: String,
	promo: {
		type: String,
		enum: ['A1', 'A2', 'A3', 'A4', 'A5']
	},
	admin: {
		type: Boolean,
		default: false,
		required: true
	},
	sports: [
		{
			type: String,
			// FIXME: Changer les sports plus tard
			enum: [
				'football',
				'basketball',
				'tennis',
				'natation',
				'athlétisme',
				'volleyball',
				'rugby',
				'autre'
			]
		}
	],
	dateInscription: {
		type: Date,
		default: Date.now
	}
});

// Define the type based on the schema
export type UserType = InferSchemaType<typeof UserSchema> & { _id: mongoose.Types.ObjectId };

// Permet de reconstruire le modèle en mode dev pour le HMR de Vite
if (process.env.NODE_ENV === 'development' && mongoose.models.User) {
	delete mongoose.models.User;
}

const User = model('User', UserSchema);

export default User;
