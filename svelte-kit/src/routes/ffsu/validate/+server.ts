import PaymentIntent from '$lib/models/PaymentIntent';
import User from '$lib/models/User';

import { json, redirect } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	if (url.searchParams.get('code') !== 'succeeded') {
		return json({ error: 'Payment failed' }, { status: 400 });
	}

	const intentId = url.searchParams.get('checkoutIntentId');
	if (!intentId) {
		return json({ error: 'Intent ID is required' }, { status: 400 });
	}

	console.info('Trying to validate payment with intent id: ', intentId);

	const paymentIntent = await PaymentIntent.findOne({ intentId });
	if (!paymentIntent) {
		return json({ error: 'Payment intent not found' }, { status: 404 });
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

	console.info('Validated payment for user: ', user.id);

	return redirect(303, '/ffsu');
};
