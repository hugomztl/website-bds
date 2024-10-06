import mongoose from 'mongoose';

export function match(value: unknown) {
	if (typeof value !== 'string') return false;

	return mongoose.Types.ObjectId.isValid(value);
}
