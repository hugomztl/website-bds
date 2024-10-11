import mongoose, { model, Schema } from 'mongoose';

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

// ASSURANCE sur 1
// LICDIRIGEANTETUDIANT sur 1
// LICSPORTIF coché | LICDIRIGEANT, LICARBITRE non cochés
// CERTIFICATOK et DATECM automatiquement remplits dans le selenium
// CHECKBOX_FICHE_INDIV_1 coché
// AUTORISATION2 (conditions d'utilisation) automatiquement coché, on informera l'utilisateur
// PRESIDENTOK sur oui
// MINEUROK ne devrait pas être utilisé, car seulement des majeurs autorisés
const PendingLicenseSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	nom: {
		type: String,
		required: true
	},
	nom_naissance: {
		type: String,
		required: false
	},
	prenom: {
		type: String,
		required: true
	},
	sexe: {
		type: String,
		enum: ['M', 'F'],
		required: true
	},
	datenaiss: {
		type: String,
		required: true
	},
	pays_naissance: {
		type: String,
		required: true
	},
	dpt_naissance: {
		type: String,
		enum: [
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
		],
		required: true
	},
	ville_naissance: {
		type: String,
		required: true
	},
	adresse1: {
		type: String,
		required: true
	},
	adresse2: {
		type: String,
		required: false
	},
	codepostal: {
		type: String,
		required: true
	},
	ville: {
		type: String,
		required: true
	},
	telephone: {
		type: String,
		required: false
	},
	email: {
		type: String,
		required: true
	},
	instagram: {
		type: String,
		required: false
	},
	discipline: {
		type: String,
		enum: [
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
		],
		required: false
	},
	autrefede: {
		type: String,
		required: false
	},
	sport: {
		type: String,
		enum: [
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
		],
		required: true
	},
	// Activité à contrainte particulière
	checkbox_fiche_indiv_3: {
		type: Boolean,
		required: false
	},
	cmnonrisque1: {
		type: String,
		enum: cmnonrisque_enum,
		required: true
	},
	cmnonrisque2: {
		type: String,
		enum: cmnonrisque_enum,
		required: true
	},
	cmnonrisque3: {
		type: String,
		enum: cmnonrisque_enum,
		required: true
	},
	cmnonrisque4: {
		type: String,
		enum: cmnonrisque_enum,
		required: true
	},
	cmnonrisque5: {
		type: String,
		enum: cmnonrisque_enum,
		required: true
	},
	cmrisque1: {
		type: String,
		enum: cmrisque_enum
	},
	cmrisque2: {
		type: String,
		enum: cmrisque_enum
	},
	cmrisque3: {
		type: String,
		enum: cmrisque_enum
	},
	cmrisque4: {
		type: String,
		enum: cmrisque_enum
	},
	cmrisque5: {
		type: String,
		enum: cmrisque_enum
	},
	// Droit à l'image
	autorisation: {
		type: Boolean,
		required: true
	}
});

// Permet de reconstruire le modèle en mode dev pour le HMR de Vite
if (process.env.NODE_ENV === 'development' && mongoose.models.PendingLicense) {
	delete mongoose.models.PendingLicense;
}

const PendingLicense = model('PendingLicense', PendingLicenseSchema);

export default PendingLicense;
