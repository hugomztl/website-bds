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
	},
	members: [
		{
			pending: {
				type: Boolean,
				required: true
			},
			user: {
				type: Schema.Types.ObjectId,
				ref: 'User',
				required: true
			}
		}
	]
});

// Permet de reconstruire le modèle en mode dev pour le HMR de Vite
if (process.env.NODE_ENV === 'development' && mongoose.models.Club) {
	delete mongoose.models.Club;
}

export type ClubDocument = mongoose.Document & {
	name: string;
	description: string;
	logo?: string;
	owner?: mongoose.Types.ObjectId;
	posts: Array<{
		title: string;
		content: string;
	}>;
	createdAt: Date;
	members: Array<{
		pending: boolean;
		user?: mongoose.Types.ObjectId;
	}>;
};

const Club = model('Club', ClubSchema);

export default Club;
