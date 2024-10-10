import PaymentIntent from '$lib/models/PaymentIntent';
import User from '$lib/models/User';

import { json, redirect } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const intentId = url.searchParams.get('checkoutIntentId');
	if (!intentId) {
		return json({ error: 'Intent ID is required' }, { status: 400 });
	}

	const paymentIntent = await PaymentIntent.findOne({ intentId });
	if (!paymentIntent) {
		return json({ error: 'Payment intent not found' }, { status: 404 });
	}

	if (url.searchParams.get('code') !== 'succeeded') {
		await paymentIntent.deleteOne();
		return json({ error: 'Payment failed' }, { status: 400 });
	}

	const user = await User.findById(paymentIntent.user);
	if (!user) {
		paymentIntent.hasFailed = true;
		await paymentIntent.save();
		return json({ error: 'User not found' }, { status: 404 });
	}

	user.license = true;
	await user.save();

	await paymentIntent.deleteOne();

	return redirect(303, '/ffsu');
};
