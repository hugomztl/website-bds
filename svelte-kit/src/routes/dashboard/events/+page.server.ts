import { isAdmin } from '$lib/authutil.js';
import Event from '$lib/models/Event';
import zEvent from '$lib/models/schemas/zEvent.js';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const prerender = false;

export const actions = {
	async createEvent({ request, locals }) {
		const session = await locals.auth();
		if (!isAdmin(session) || !session?.user?.id) {
			return fail(403);
		}

		const form = await superValidate(request, zod(zEvent));
		if (!form.valid) {
			return fail(400, { form });
		}

		const { title, tag, date, description, price } = form.data;
		const event = new Event({ title, tag, date, description, price });
		await event.save();

		return redirect(303, '/dashboard');
	},
	async deleteEvent({ request, locals }) {
		const formData = await request.formData();
		const id = formData.get('id');

		const session = await locals.auth();
		if (!isAdmin(session) || !session?.user?.id) {
			return fail(403);
		}

		await Event.findByIdAndDelete(id);
	}
};
