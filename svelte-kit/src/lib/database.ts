import { CONNECTION_STRING } from '$env/static/private';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

export const client = new MongoClient(CONNECTION_STRING);

const salt = bcrypt.genSaltSync(10);
export const hashPassword = (password: string) => {
	return bcrypt.hashSync(password, salt);
};
