import express, { Request, Response } from "express";
import axios from "axios";

const router = express.Router();

const helloassoApiCheckouUrl =
	"https://api.helloasso.com/v5/organizations/bureau-des-sports-bds-cesi-nancy/checkout-intents";
const helloAssoApiUrl = "https://api.helloasso.com/v5/";
const helloAssoApiUrlToken = "https://api.helloasso.com/oauth2/token/";
const clientId = "822e8187331543a9821b477104f03c1e"; // Utiliser des variables d'environnement
const clientSecret = "q9VHO2H5bn8/OebsLNFhXJcUMDi/E3dO"; // Utiliser des variables d'environnement

// Fonction pour obtenir le token d'accès
async function obtenirToken() {
	const response = await axios.post(
		`${helloAssoApiUrlToken}`,
		new URLSearchParams({
			client_id: clientId || "",
			client_secret: clientSecret || "",
			grant_type: "client_credentials",
		})
	);
	console.log(response.data);
	return response.data;
}

// Route pour obtenir le token
router.get("/token", async (req: Request, res: Response) => {
	try {
		const tokenData = await obtenirToken();
		return res
			.status(200)
			.json({ message: "Token retrieved successfully", data: tokenData });
	} catch (error: unknown) {
		const errorMessage = axios.isAxiosError(error)
			? error.response?.data
			: error;
		return res
			.status(500)
			.json({ message: "Error retrieving token", error: errorMessage });
	}
});

// Endpoint pour le paiement
router.post("/", async (req: Request, res: Response) => {
	try {
		const { access_token } = await obtenirToken();
		console.log(access_token);
		const paiementData = {
			initialAmount: 10000,
			totalAmount: 10000,
			backUrl: "https://www.partnertest.com/back.php",
			errorUrl: "https://www.partnertest.com/error.php",
			returnUrl: "https://www.partnertest.com/return.php",
			itemName: "Adhesion Football",
			containsDonation: false,
			payer: {
				firstName: "John",
				lastName: "Doe",
				email: "john.doe@test.com",
				dateOfBirth: "1986-07-06",
				address: "23 rue du palmier",
				city: "Paris",
				zipCode: "75000",
				country: "FRA",
				companyName: "HelloAsso",
			},
		};

		const response = await axios.post(
			`${helloassoApiCheckouUrl}`,
			paiementData,
			{
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
				},
			}
		);

		return res.status(200).json({ message: "Success", data: response.data });
	} catch (error: unknown) {
		const errorMessage = axios.isAxiosError(error)
			? error.response?.data
			: error;
		return res.status(500).json({ message: "Error", error: errorMessage });
	}
});

export default router;
