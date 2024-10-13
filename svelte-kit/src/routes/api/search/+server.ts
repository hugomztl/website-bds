import Club from '$lib/models/Club';
import User from '$lib/models/User';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	let q = url.searchParams.get('q') ?? '';

	const users = (
		await User.find(
			{
				$or: [{ fullName: { $regex: q, $options: 'i' } }, { email: { $regex: q, $options: 'i' } }]
			},
			['fullName', 'email'],
			{ limit: 5 }
		).exec()
	).map((user) => user.toObject({ flattenObjectIds: true }));

	const clubs = (
		await Club.find(
			{
				$or: [{ name: { $regex: q, $options: 'i' } }, { description: { $regex: q, $options: 'i' } }]
			},
			['name', 'description'],
			{ limit: 5 }
		).exec()
	).map((club) => club.toObject({ flattenObjectIds: true }));

	return json({ users, clubs });
};
