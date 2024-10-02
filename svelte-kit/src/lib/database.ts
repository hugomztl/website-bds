import { CONNECTION_STRING } from '$env/static/private';
import { MongoClient } from 'mongodb';

export const client = new MongoClient(CONNECTION_STRING);
