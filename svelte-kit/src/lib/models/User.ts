import { model, Schema } from 'mongoose';

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
	fullName: String,
	license: {
		type: Boolean,
		required: true,
		default: false
	},
	discord: String,
	promo: {
		type: String,
		enum: ['A1', 'A2', 'A3', 'A4', 'A5'],
		required: true
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

const User = model('User', UserSchema);

export default User;
