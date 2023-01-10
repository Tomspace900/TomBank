function assignClasses(operation, operationElement) {
	const classes = [];
	// ajoute la classe operation
	classes.push('operation');
	// ajoute le nom du compte
	switch (operation.accountLabel) {
		case 'BOURSORAMA BANQUE':
			classes.push('bourso');
			break;
		case "CAISSE D'ÉPARGNE":
			classes.push('caisse_depargne');
			break;
		default:
			classes.push(formatString(operation.accountLabel));
			break;
	}
	// ajoute la catégorie parente
	classes.push(formatString(operation.categoryParent));
	// ajoute la catégorie
	addLabel(operation, classes);
	// boucle sur la liste pour ajouter les classes à l'élément
	classes.forEach((className) => {
		operationElement.classList.add(className);
	});
}

function renameFilter(operations) {
	const filteredOperations = [];
	operations.forEach((operation) => {});
	return filteredOperations;
}

function addLabel(operation, classes) {
	const label = formatString(operation.label);
	if (enseignesFastFood.some((enseigne) => label.includes(formatString(enseigne)))) {
		classes.push('fast-food');
	} else if (enseignesSupermarche.some((enseigne) => label.includes(formatString(enseigne)))) {
		classes.push('courses');
	} else {
		classes.push(formatString(operation.categoryParent));
		classes.push(formatString(operation.category));
	}
}

function formatString(string) {
	return string
		.toLowerCase()
		.replaceAll(' ', '_')
		.replaceAll(',', '')
		.replaceAll('é', 'e')
		.replaceAll('è', 'e')
		.replaceAll('ê', 'e')
		.replaceAll('à', 'a')
		.replaceAll('â', 'a')
		.replaceAll('î', 'i')
		.replaceAll('ô', 'o')
		.replaceAll('û', 'u')
		.replaceAll('ç', 'c');
}

const enseignesSupermarche = [
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
];

const enseignesFastFood = [
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
];
