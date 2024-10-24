import Event from '$lib/models/Event';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';

const testSchema = z.object({
	date: z.coerce.date(),
	weekRange: z.coerce.number().int().positive().max(10).default(1)
});

export const GET: RequestHandler = async ({ url }) => {
	const entries = Object.fromEntries(Array(...url.searchParams.entries()));
	const maybeEntries = testSchema.safeParse(entries);

	if (!maybeEntries.success) {
		return error(
			400,
			maybeEntries.error.errors.map((err) => `${err.path}: ${err.message}`).join('\n')
		);
	}

	const { date, weekRange } = maybeEntries.data;
	const minDate = new Date(date);
	minDate.setDate(date.getDate() - weekRange * 7);
	minDate.setDate(minDate.getDate() - minDate.getDay() + 1);
	const maxDate = new Date(date);
	maxDate.setDate(date.getDate() + weekRange * 7);
	maxDate.setDate(maxDate.getDate() - maxDate.getDay() + 7);

	console.info(minDate, maxDate);

	try {
		const users = (
			await Event.find({
				date: {
					$gte: minDate,
					$lte: maxDate
				}
			}).exec()
		).map((user) => user.toObject({ flattenObjectIds: true }));

		return json(users);
	} catch (_) {}

	return json([]);
};
