import { isAdmin } from '$lib/authutil';
import Event from '$lib/models/Event';
import zEvent from '$lib/models/schemas/zEvent.js';
import { error, redirect } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ parent, params }) => {
	await parent();

	const id = params.id;
	const event = (await Event.findById(id))?.toObject({ flattenObjectIds: true });

	if (!event) {
		return error(404, 'Évènement introuvable.');
	}

	const form = await superValidate(event, zod(zEvent));

	return { event, form };
};

export const actions = {
	async updateEvent({ request, locals, params }) {
		const session = await locals.auth();
		if (!isAdmin(session) || !session?.user?.id) {
			return fail(403);
		}

		const form = await superValidate(request, zod(zEvent));
		if (!form.valid) {
			return fail(400, { form });
		}

		const { title, tag, startDate, endDate, description, price } = form.data;

		const event = await Event.findByIdAndUpdate(params.id, {
			title,
			tag,
			startDate,
			endDate,
			description,
			price
		});
		if (!event) {
			return fail(404, { form });
		}

		return redirect(303, '/dashboard');
	}
};
