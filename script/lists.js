const categoriesId = {
	1: 'Courses',
	2: 'Ecole',
	3: 'Transports',
	4: 'Voyages',
	5: 'Santé',
	6: 'Revenus',
	7: 'Remboursements',
	8: 'Mouvements internes',
	9: 'Impôts',
	10: 'Vie quotidienne',
	11: 'Amendes',
	12: 'Voiture',
	13: 'Cadeaux',
	14: 'E-commerce',
	15: 'Vêtements',
	16: 'Maison',
	17: 'Activites',
	18: 'Banque',
	19: 'Fast-food',
	20: 'Resto & Bars',
	21: 'Abonnements & Téléphonie',
	22: 'Autres',
	23: 'Autorisation en cours',
};

const categoryColors = {
	Courses: '#c3e267',
	Ecole: '#f8ac56',
	Transports: '#f8e32a',
	Voyages: '#f8e32a',
	Santé: '#fa9edf',
	Revenus: '#99e5ae',
	Remboursements: '#99e5ae',
	'Mouvements internes': '',
	Impôts: '#5687f8',
	'Vie quotidienne': '#47cfc3aa',
	Amendes: '#5687f8',
	Voiture: '#f8e32a',
	Cadeaux: '#f8ac56',
	'E-commerce': '#da6e85',
	Vêtements: '#da6e85',
	Maison: '',
	Activites: '#da7df9',
	Banque: '',
	'Fast-food': '#da7df9',
	'Resto & Bars': '#da7df9',
	'Abonnements & Téléphonie': '#5cc1f8',
	Autres: '',
	'Autorisation en cours': '#ffffff',
};

const filteredMainCategories = {
	Courses: [],
	Ecole: ['Education & Famille'],
	Transports: [],
	Voyages: ['Voyages & Transports'],
	Santé: ['Santé'],
	Revenus: [
		'Pensions & rentes',
		'Revenus du travail',
		'Virements reçus',
		"Revenus d'épargne",
		'Remboursement de frais / offres Boursorama',
	],
	Remboursements: ['Remboursements'],
	'Mouvements internes': ["Dépenses d'épargne", 'Mouvements internes débiteurs', 'Mouvements internes créditeurs'],
	Impôts: ['Impôts'],
	'Vie quotidienne': ['Vie quotidienne'],
	Amendes: [],
	Voiture: ['Auto & Moto'],
	Cadeaux: ['Cadeaux et solidarité', 'Dépots (cartes/chéques/espèces)'],
	'E-commerce': ['E-commerce'],
	Vêtements: ['Vêtements'],
	Maison: [],
	Activites: ['Loisirs'],
	Banque: ['Services financiers & professionnels', 'Emprunts (hors immobilier)', 'Retraits cash'],
	'Fast-food': [],
	'Resto & Bars': ['Restaurants, bars, discothèques…'],
	'Abonnements & Téléphonie': ['Abonnements & téléphonie'],
	Autres: ['Non catégorisé', 'Virements émis'],
};

const filteredCategories = {
	Courses: ['Alimentation'],
	Ecole: [],
	Transports: ['Transports quotidiens (métro, bus…)', 'Location de véhicules'],
	Voyages: [],
	Santé: [],
	Revenus: [],
	Remboursements: ['Remboursements frais de vie quotidienne', 'Remboursements - Autres'],
	'Mouvements internes': [],
	Impôts: [],
	'Vie quotidienne': [],
	Amendes: ['Contraventions'],
	Voiture: [],
	Cadeaux: [],
	'E-commerce': ['Electronique et informatique'],
	Vêtements: ['Vêtements et accessoires'],
	Maison: ['Mobilier, électroménager, décoration…'],
	Activites: [],
	Banque: [],
	'Fast-food': [],
	'Resto & Bars': ['Restaurants, bars, discothèques…'],
	'Abonnements & Téléphonie': [],
	Autres: [],
};

const filteredLabels = {
	Courses: [
		'carrefour',
		'monoprix',
		'super u',
		'intermarché',
		'leclerc',
		'franprix',
		'lidl',
		'aldi',
		'picard',
		'casino',
		'auchan',
		'cora',
		'biocoop',
		'bio c bon',
	],
	Ecole: ['efrei', 'crous'],
	Transports: ['fluow', 'easybook'],
	Voyages: ['airbnb', 'booking', 'hertz', 'rentalcars'],
	Santé: ['doctolib', 'ameli', 'sante', 'pharmacie', 'pharma'],
	Revenus: [],
	Remboursements: ['remb', 'remboursement'],
	'Mouvements internes': ['interne'],
	Impôts: [],
	'Vie quotidienne': [],
	Amendes: [],
	Voiture: ['tesla', 'ionity', 'izivia'],
	Cadeaux: ['cadeau', 'noel', 'anniv'],
	'E-commerce': ['amazon', 'fnac', 'darty', 'cdiscount', 'boulanger'],
	Vêtements: ['zara', 'h&m', 'zalando', 'decathlon'],
	Maison: ['ikea', 'conforama', 'lapeyre', 'castorama'],
	Activites: [],
	Banque: ['prlv ce', 'prlv bpce', 'bourso', 'boursorama'],
	'Fast-food': [
		"mcdonald's",
		'mcdo',
		'macdo',
		'kfc',
		'sc.rest cirha', // domino's clamart
		'burger king',
		'bk',
		'quick',
		'subway',
		'pizza hut',
		'pizzahut',
		'pizza',
		'carls jr',
		'carl s jr',
	],
	'Resto & Bars': ['lydia', 'okali', '55amsterd'],
	'Abonnements & Téléphonie': ['nordvpn', 'onedrive', 'netflix', 'spotify', 'deezer', 'bouygues', 'orange', 'sfr', 'free'],
	Autres: [],
};