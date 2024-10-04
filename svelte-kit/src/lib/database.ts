import { CONNECTION_STRING } from '$env/static/private';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

mongoose
	.connect(CONNECTION_STRING)
	.then(() => {
		console.log('Successfully connected to MongoDB');
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});
export const client: MongoClient = mongoose.connection.getClient();

const salt = bcrypt.genSaltSync(10);
export const hashPassword = (password: string) => {
	return bcrypt.hashSync(password, salt);
};
