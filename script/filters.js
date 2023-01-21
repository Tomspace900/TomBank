function filterOperations(operations) {
	operations.forEach((operation) => {
		if (filterOnLabelAndCategories(operation)) {
		} else if (operation.category !== ('separator' || 'undefined' || undefined)) {
			operation.category = 'autres';
		}
	});
	return operations;
}
// filter on label and categories
function filterOnLabelAndCategories(operation) {
	const label = formatString(operation.label);
	const category = formatString(operation.category);
	const categoryMain = formatString(operation.categoryMain);
	for (const [name, list] of Object.entries(filteredLabels)) {
		if (list.some((keyword) => label.includes(formatString(keyword)))) {
			operation.category = name;
			return true;
		}
	}
	for (const [name, list] of Object.entries(filteredCategories)) {
		if (list.some((keyword) => category.includes(formatString(keyword)))) {
			operation.category = name;
			return true;
		}
	}
	for (const [name, list] of Object.entries(filteredMainCategories)) {
		if (list.some((keyword) => categoryMain.includes(formatString(keyword)))) {
			operation.category = name;
			return true;
		}
	}
	return false;
}

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
			classes.push('ce');
			break;
		default:
			classes.push(formatString(operation.accountLabel));
			break;
	}
	// ajoute la ou les catégorie(s)
	classes.push(formatString(operation.category));
	// ajoute la classe credit ou debit
	classes.push(operation.amount > 0 ? 'credit' : 'debit');
	// boucle sur la liste pour ajouter toutes les classes à l'élément
	classes.forEach((className) => {
		operationElement.classList.add(className);
	});
}

function formatString(string) {
	try {
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
	} catch (error) {
		return 'undefined';
	}
}
