import mongoose, { model, Schema } from 'mongoose';

const PostSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	}
});

// Permet de reconstruire le modèle en mode dev pour le HMR de Vite
if (process.env.NODE_ENV === 'development' && mongoose.models.Post) {
	delete mongoose.models.Post;
}

const Post = model('Post', PostSchema);

export default Post;
