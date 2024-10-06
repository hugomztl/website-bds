import mongoose, { model, Schema } from 'mongoose';

const ClubSchema = new Schema({
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
	posts: [
		{
			title: {
				type: String,
				required: true
			},
			content: {
				type: String,
				required: true
			}
		}
	],
	createdAt: {
		type: Date,
		default: Date.now
	}
});

// Permet de reconstruire le modèle en mode dev pour le HMR de Vite
if (process.env.NODE_ENV === 'development' && mongoose.models.Club) {
	delete mongoose.models.Club;
}

const Club = model('Club', ClubSchema);

export default Club;
