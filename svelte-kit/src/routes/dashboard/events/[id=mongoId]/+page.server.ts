import Event from '$lib/models/Event';
import { fail } from '@sveltejs/kit';

export const load = async ({ parent, params }) => {
	await parent();

	const id = params.id;
	const event = (await Event.findById(id))?.toObject({ flattenObjectIds: true });

	if (!event) {
		return fail(404);
	}

	return { event };
};
