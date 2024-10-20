import Event from '$lib/models/Event';
import { fail } from '@sveltejs/kit';
import zEvent from '$lib/models/schemas/zEvent.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ parent, params }) => {
	await parent();

	const id = params.id;
	const event = (await Event.findById(id))?.toObject({ flattenObjectIds: true });

	if (!event) {
		return fail(404);
	}

	const form = await superValidate(event, zod(zEvent));

	return { event, form };
};
