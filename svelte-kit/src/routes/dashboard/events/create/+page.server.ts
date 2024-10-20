import zEvent from '$lib/models/schemas/zEvent.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({}) => {
	const form = await superValidate(zod(zEvent));

	return { form };
};
