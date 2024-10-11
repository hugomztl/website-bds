import PaymentIntent from '$lib/models/PaymentIntent';
import type { PendingLicenseType } from '$lib/models/PendingLicense.js';
import User from '$lib/models/User';

import { redirect } from '@sveltejs/kit';

export const load = async ({ url }) => {
	const intentId = url.searchParams.get('checkoutIntentId');
	if (!intentId) {
		return { error: 'Intent ID is required' };
	}

	const paymentIntent = await PaymentIntent.findOne({ intentId }).populate<{
		pendingLicense: PendingLicenseType & { save(): Promise<void> };
	}>('pendingLicense');
	if (!paymentIntent) {
		return { error: 'Payment intent not found' };
	}

	if (url.searchParams.get('code') !== 'succeeded') {
		await paymentIntent.deleteOne();
		return { error: 'Payment failed' };
	}

	const user = await User.findById(paymentIntent.user);
	if (!user) {
		paymentIntent.hasFailed = true;
		await paymentIntent.save();
		return { error: 'User not found' };
	}

	user.license = true;
	await user.save();

	paymentIntent.pendingLicense.licensePaid = true;
	await paymentIntent.pendingLicense.save();
	await paymentIntent.deleteOne();

	return redirect(303, '/ffsu');
};
