import Event from '$lib/models/Event';

export const load = async ({}) => {
	const events = await Event.find()
		.exec()
		.then((events) => events.map((event) => event.toObject({ flattenObjectIds: true })));

	return { events };
};
