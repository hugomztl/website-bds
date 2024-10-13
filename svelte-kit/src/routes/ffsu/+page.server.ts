import { HELLOASSO_ID, HELLOASSO_SECRET } from '$env/static/private';
import PaymentIntent from '$lib/models/PaymentIntent';
import PendingLicense, { zPendingLicense } from '$lib/models/PendingLicense.js';
import User from '$lib/models/User.js';
import { fail, redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';

export const prerender = false;

// FIXME: Changer l'url pour ne plus être en sandbox
const helloassoApiCheckouUrl =
	'https://api.helloasso-sandbox.com/v5/organizations/test-bds/checkout-intents';
const helloAssoApiUrlToken = 'https://api.helloasso-sandbox.com/oauth2/token/';

export const load = async ({ locals }) => {
	const session = await locals.auth();

	if (!session) {
		return redirect(303, '/signin');
	}

	const user = (await User.findById(session?.user?.id))?.toObject({ flattenObjectIds: true });
	if (!user) {
		return redirect(303, '/signin');
	}

	const form = await superValidate(zod(zPendingLicense));

	return { user, form };
};

export const actions = {
	default: async ({ request, locals }) => {
		const user = (await locals.auth())?.user;
		if (!user) {
			return redirect(303, '/signin');
		}

		const form = await superValidate(request, zod(zPendingLicense));

		if (!form.valid) {
			return fail(400, { form });
		}

		const pendingLicense = await PendingLicense.create({
			...form.data,
			email: user.email,
			user: user.id
		});

		const host = request.headers.get('host') ?? 'bds-cesi-nancy.fr';
		const baseUrl = `https://${host}`;

		const firstName = form.data.prenom;
		const lastName = form.data.nom;
		const dateOfBirth = form.data.datenaiss;
		const paiementData = {
			totalAmount: 2000,
			initialAmount: 2000,
			itemName: 'Licence FFSU',
			backUrl: `${baseUrl}/ffsu`,
			errorUrl: `${baseUrl}/ffsu/validate`,
			returnUrl: `${baseUrl}/ffsu/validate`,
			containsDonation: false,
			payer: {
				firstName,
				lastName,
				email: user.email,
				dateOfBirth
			}
		};

		const { access_token } = await obtenirToken();

		const response = fetch(helloassoApiCheckouUrl, {
			body: JSON.stringify(paiementData),
			method: 'POST',
			headers: {
				Authorization: `Bearer ${access_token}`,
				'Content-Type': 'application/json'
			}
		});

		const json = await (await response).json();

		if ('redirectUrl' in json && 'id' in json) {
			const { redirectUrl, id } = json;

			await PaymentIntent.create({ intentId: id, user: user.id, pendingLicense });

			return redirect(303, redirectUrl);
		}

		console.error('Une ou plusieurs erreurs se sont produites lors du paiement: ', json.errors);
		return fail(400, { errors: json.errors as { code: string; message: string }[] });
	}
};

// FIXME: Enregistrer les tokens et utiliser les refresh tokens
async function obtenirToken() {
	const response = await fetch(`${helloAssoApiUrlToken}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			client_id: HELLOASSO_ID || '',
			client_secret: HELLOASSO_SECRET || '',
			grant_type: 'client_credentials'
		})
	});

	const token = (await response.json()) as {
		access_token: string;
		expires_in: number;
		refresh_token: string;
		token_type: string;
	};

	return token;
}
