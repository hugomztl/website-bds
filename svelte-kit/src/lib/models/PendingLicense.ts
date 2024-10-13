import { zodSchema } from '@zodyac/zod-mongoose';
import mongoose, { model } from 'mongoose';
import { z } from 'zod';

const cmnonrisque_enum = [
	'1',
	'59',
	'2',
	'3',
	'4',
	'5',
	'6',
	'8',
	'9',
	'11',
	'12',
	'13',
	'14',
	'15',
	'16',
	'60',
	'17',
	'18',
	'19',
	'20',
	'21',
	'62',
	'22',
	'23',
	'24',
	'25',
	'26',
	'27',
	'28',
	'29',
	'30',
	'31',
	'33',
	'34',
	'35',
	'36',
	'61',
	'37',
	'38',
	'40',
	'41',
	'64',
	'42',
	'43',
	'44',
	'45',
	'46',
	'47',
	'48',
	'49',
	'51',
	'50',
	'52',
	'54',
	'55',
	'56',
	'57',
	'58'
] as const;

const cmrisque_enum = ['1', '7', '10', '32', '39', '63', '53'] as const;

const dpt_enum = [
	'01',
	'02',
	'03',
	'04',
	'05',
	'06',
	'07',
	'08',
	'09',
	'10',
	'11',
	'12',
	'13',
	'14',
	'15',
	'16',
	'17',
	'18',
	'19',
	'2A',
	'2B',
	'21',
	'22',
	'23',
	'24',
	'25',
	'26',
	'27',
	'28',
	'29',
	'30',
	'31',
	'32',
	'33',
	'34',
	'35',
	'36',
	'37',
	'38',
	'39',
	'40',
	'41',
	'42',
	'43',
	'44',
	'45',
	'46',
	'47',
	'48',
	'49',
	'50',
	'51',
	'52',
	'53',
	'54',
	'55',
	'56',
	'57',
	'58',
	'59',
	'60',
	'61',
	'62',
	'63',
	'64',
	'65',
	'66',
	'67',
	'68',
	'69',
	'70',
	'71',
	'72',
	'73',
	'74',
	'75',
	'76',
	'77',
	'78',
	'79',
	'80',
	'81',
	'82',
	'83',
	'84',
	'85',
	'86',
	'87',
	'88',
	'89',
	'90',
	'91',
	'92',
	'93',
	'94',
	'95',
	'971',
	'972',
	'973',
	'974',
	'975',
	'976',
	'0'
] as const;

const discipline_enum = [
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'10',
	'11',
	'12',
	'13',
	'14',
	'15',
	'16',
	'17',
	'18',
	'19'
] as const;

const sport_enum = [
	'Athlétisme - Courses hors stade',
	'Aviron (en ligne,longue distance, de mer, indoor)',
	'Babyfoot',
	'Badminton',
	'Baseball - Softball',
	'Basket - Basket 3x3',
	'Biathlon',
	'Bowling',
	'Boxe éducative Assaut',
	'Boxe(s) Combat, plein contact (Anglaise, Kick Boxing K1 rules, Savate BF)',
	'Bridge',
	'Canoë-kayak',
	'Cheerleading',
	"Course d'orientation",
	'Cyclisme - VTT - BMX',
	'Danse (toutes formes)',
	'E-sport',
	'Echecs',
	'Equitation',
	'Escalade',
	'Escrime',
	'Fitness',
	'Fléchettes',
	'Football - Futsal',
	'Football américain',
	'Force Athlétique',
	'Golf',
	'Gymnastiques : Artistique, GR, Team Gym, Trampoline, Parkour Gym',
	'Haltérophilie - Musculation',
	'Handball - Beach Handball',
	'Hockey',
	'Judo - Ju-Jitsu - Ne Waza',
	'Karaté',
	'Karting',
	'Kick Boxing - Muay-Thaï Light et Pré combat',
	'Lutte - Sambo sportif - Beach Wrestling',
	'Nage avec palmes',
	'Natation - Natation synchronisée - Natation en eau libre',
	'Pancrace assaut',
	'Patinage artistique et de vitesse',
	'Pelote basque',
	'Pentathlon',
	'Pétanque',
	'Roller hockey',
	'Rugby(s) (XV, X, 7, XIII)',
	'Sauvetage sportif',
	'Savate Boxe Française en assaut',
	'Skateboard - Trottinette',
	'Ski - Snowboard (toutes formes)',
	'Squash',
	'Surf - Stand Up Paddle',
	'Taekwondo',
	'Tennis - Padel - Beach Tennis',
	'Tennis de table',
	"Tir à l'arc",
	'Tir sportif',
	'Triathlon et Disciplines enchainées : [Bike &amp; Run, Duathlon, Raids multisports, Swimrun]',
	'Ultimate - Beach Ultimate',
	'Voile - Kite Surf',
	'Volley - Beach Volley',
	'Water-polo'
] as const;

export const zPendingLicense = z.object({
	licensePaid: z.boolean().default(false),
	user: z
		.string()
		.refine((val) => mongoose.Types.ObjectId.isValid(val), {
			message: 'Invalid ObjectId'
		})
		.optional(),
	nom: z.string().superRefine((val, ctx) => {
		const forbiddenValues = [
			'firstname',
			'lastname',
			'unknown',
			'first_name',
			'last_name',
			'anonyme',
			'user',
			'admin',
			'name',
			'nom',
			'prénom',
			'test'
		];
		if (/(.)\1\1/.test(val)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Le nom ne doit pas contenir 3 caractères répétitifs'
			});
		}
		if (/\d/.test(val)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Le nom ne doit pas contenir de chiffres'
			});
		}
		if (val.length === 1) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Le nom ne doit pas être un seul caractère'
			});
		}
		if (!/[aeiouy]/i.test(val)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Le nom doit contenir au moins une voyelle'
			});
		}
		if (/[^a-zA-Zéèêëàâäùûüç'\-]/.test(val)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Le nom contient des caractères non autorisés'
			});
		}
		if (forbiddenValues.includes(val.toLowerCase())) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Le nom contient une valeur interdite'
			});
		}
	}),
	nom_naissance: z.string().optional(),
	prenom: z.string().superRefine((val, ctx) => {
		const forbiddenValues = [
			'firstname',
			'lastname',
			'unknown',
			'first_name',
			'last_name',
			'anonyme',
			'user',
			'admin',
			'name',
			'nom',
			'prénom',
			'test'
		];
		if (/(.)\1\1/.test(val)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Le prénom ne doit pas contenir 3 caractères répétitifs'
			});
		}
		if (/\d/.test(val)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Le prénom ne doit pas contenir de chiffres'
			});
		}
		if (val.length === 1) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Le prénom ne doit pas être un seul caractère'
			});
		}
		if (!/[aeiouy]/i.test(val)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Le prénom doit contenir au moins une voyelle'
			});
		}
		if (/[^a-zA-Zéèêëàâäùûüç'\-]/.test(val)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Le prénom contient des caractères non autorisés'
			});
		}
		if (forbiddenValues.includes(val.toLowerCase())) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Le prénom contient une valeur interdite'
			});
		}
	}),
	sexe: z.enum(['M', 'F']),
	datenaiss: z.string().refine(
		(val) => {
			const today = new Date();
			const birthDate = new Date(val);
			let age = today.getFullYear() - birthDate.getFullYear();
			const monthDifference = today.getMonth() - birthDate.getMonth();
			if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
				age--;
			}
			return age >= 18;
		},
		{
			message: "L'acheteur doit avoir plus de 18 ans"
		}
	),
	pays_naissance: z.string(),
	dpt_naissance: z.enum(dpt_enum),
	ville_naissance: z.string(),
	adresse1: z.string(),
	adresse2: z.string().optional(),
	codepostal: z.string(),
	ville: z.string(),
	telephone: z.string().optional(),
	email: z.string(),
	instagram: z.string().optional(),
	discipline: z.enum(discipline_enum).optional(),
	autrefede: z.string().optional(),
	sport: z.enum(sport_enum),
	checkbox_fiche_indiv_3: z.boolean().optional(),
	cmnonrisque1: z.enum(cmnonrisque_enum),
	cmnonrisque2: z.enum(cmnonrisque_enum),
	cmnonrisque3: z.enum(cmnonrisque_enum),
	cmnonrisque4: z.enum(cmnonrisque_enum),
	cmnonrisque5: z.enum(cmnonrisque_enum),
	cmrisque1: z.enum(cmrisque_enum).optional(),
	cmrisque2: z.enum(cmrisque_enum).optional(),
	cmrisque3: z.enum(cmrisque_enum).optional(),
	cmrisque4: z.enum(cmrisque_enum).optional(),
	cmrisque5: z.enum(cmrisque_enum).optional(),
	autorisation: z.boolean()
});

// ASSURANCE sur 1
// LICDIRIGEANTETUDIANT sur 1
// LICSPORTIF coché | LICDIRIGEANT, LICARBITRE non cochés
// CERTIFICATOK et DATECM automatiquement remplits dans le selenium
// CHECKBOX_FICHE_INDIV_1 coché
// AUTORISATION2 (conditions d'utilisation) automatiquement coché, on informera l'utilisateur
// PRESIDENTOK sur oui
// MINEUROK ne devrait pas être utilisé, car seulement des majeurs autorisés
const PendingLicenseSchema = zodSchema(zPendingLicense);

// Permet de reconstruire le modèle en mode dev pour le HMR de Vite
if (process.env.NODE_ENV === 'development' && mongoose.models.PendingLicense) {
	delete mongoose.models.PendingLicense;
}

export type PendingLicenseType = mongoose.Document & z.infer<typeof zPendingLicense>;

const PendingLicense = model('PendingLicense', PendingLicenseSchema);

export default PendingLicense;
