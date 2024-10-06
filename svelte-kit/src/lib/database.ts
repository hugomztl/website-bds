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

export const recursiveStringifyId = <T extends Record<string, any>>(obj: T): T => {
	if (Array.isArray(obj)) {
		return obj.map(recursiveStringifyId) as unknown as T;
	} else if (typeof obj === 'object' && obj !== null) {
		const result: Record<string, any> = {};
		for (const [key, value] of Object.entries(obj)) {
			if (key === '_id' && value instanceof mongoose.Types.ObjectId) {
				result[key] = value.toString();
			} else {
				result[key] = recursiveStringifyId(value);
			}
		}
		return result as T;
	}
	return obj;
};
