import mongoose, { model, Schema } from 'mongoose';

const BlogPostSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
});

// Permet de reconstruire le modèle en mode dev pour le HMR de Vite
if (process.env.NODE_ENV === 'development' && mongoose.models.BlogPost) {
	delete mongoose.models.BlogPost;
}

const BlogPost = model('BlogPost', BlogPostSchema);

export default BlogPost;