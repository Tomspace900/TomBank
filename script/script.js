// liste des operations mappée
let operations = [];
// liste des operations editées
let editedOperations = [];
// élément HTML qui contient les operations
const operationsElement = document.getElementById('operations');

fetch('operations.csv')
	.then((response) => response.text())
	.then((text) => {
		const CSVoperations = {};
		const rows = Papa.parse(text, { header: true }).data;
		const now = new Date(Date.now());
		rows.forEach((row, index) => {
			if (row.dateOp && row.dateOp !== '') {
				const id = index;
				const date = setDate(row.dateOp, row.label);
				const year = date.getFullYear();
				const month = date.getMonth();
				const day = date.getDate();
				const totalMonthDiff = calcMonthDiff(now, date);

				if (!CSVoperations[year]) {
					CSVoperations[year] = {};
				}
				if (!CSVoperations[year][month]) {
					CSVoperations[year][month] = {};
				}
				if (!CSVoperations[year][month][day]) {
					CSVoperations[year][month][day] = [];
				}

				CSVoperations[year][month][day].push({
					id: id,
					date: date,
					label: row.label,
					category: row.category,
					categoryMain: row.categoryParent,
					amount: row.amount ? parseFloat(row.amount.replace(',', '.')).toFixed(2) : row.amount,
					accountLabel: row.accountLabel,
					accountBalance: row.accountbalance
						? parseFloat(row.accountbalance.replace(',', '.')).toFixed(2)
						: row.accountbalance,
					xMonthsAgo: totalMonthDiff,
				});
			}
		});

		for (const year in CSVoperations) {
			for (const month in CSVoperations[year]) {
				for (const day in CSVoperations[year][month]) {
					operations = operations.concat(CSVoperations[year][month][day]);
				}
				// ajoute un séparateur entre les mois
				const separatorDate = new Date(year, month, 0);
				operations.push({
					date: undefined,
					label: getMonthName(parseInt(month, 10)) + ' ' + year,
					category: 'separator',
					categoryMain: undefined,
					amount: undefined,
					accountLabel: undefined,
					accountBalance: undefined,
					xMonthsAgo: calcMonthDiff(now, separatorDate) - 1,
				});
			}
		}
		// filtrage des operations
		filterOperations(operations);
		// inversion de la liste pour mettre le plus récent en haut
		operations.reverse();
		// affichage des operations dans le HTML
		displayOperations(operations, operationsElement);
		// creation de la liste des operations editées
		editOperations();

		console.log('CSVoperations', CSVoperations);
		console.log('operations', operations);
		console.log('editedOperations', editedOperations);
		console.log('monthsLoaded', monthsLoaded);
	});

function displayOperations(operations, operationsElement) {
	operations.forEach((operation) => {
		// si l'operation est plus ancienne que le nombre de mois à charger, on l'ignore
		if (operation.xMonthsAgo < monthsLoaded) {
			// separateur
			if (operation.category === 'separator') {
				const separatorElement = document.createElement('li');
				separatorElement.innerText = operation.label;
				separatorElement.classList.add('separator');
				operationsElement.appendChild(separatorElement);
			} else if (operation.date) {
				const operationElement = document.createElement('li');
				operationElement.id = operation.id;

				// créer la div contenant l'icone
				const iconElement = document.createElement('div');
				iconElement.classList.add('operation-icon');
				operationElement.appendChild(iconElement);

				// ajoute un eventlistener au click sur l'icone
				iconElement.addEventListener('click', function () {
					operationPopup.style.display = 'block';
				});

				const operationPopup = document.createElement('div');
				operationPopup.classList.add('operation-popup');
				operationElement.appendChild(operationPopup);

				let timeoutId;
				operationPopup.addEventListener('mouseleave', function () {
					timeoutId = setTimeout(() => {
						operationPopup.style.display = 'none';
					}, 500);
				});
				operationPopup.addEventListener('mouseenter', function () {
					clearTimeout(timeoutId);
				});

				const operationDropdown = document.createElement('ul');
				operationDropdown.classList.add('operation-dropdown');
				operationPopup.appendChild(operationDropdown);

				for (const key in categoriesId) {
					const li = document.createElement('li');
					li.innerHTML = categoriesId[key];
					li.setAttribute('categoryId', key);
					operationDropdown.appendChild(li);
				}

				operationDropdown.querySelectorAll('li').forEach(function (li) {
					li.addEventListener('click', function () {
						const categoryId = li.getAttribute('categoryId');
						handleCategory(categoryId, operation.id);
						operationPopup.style.display = 'none';
					});
				});

				const contentElement = document.createElement('div');
				contentElement.classList.add('operation-content');
				operationElement.appendChild(contentElement);

				const labelElement = document.createElement('div');
				labelElement.classList.add('operation-label');
				labelElement.innerText = operation.label;
				contentElement.appendChild(labelElement);

				const dateElement = document.createElement('div');
				dateElement.classList.add('operation-date');
				dateElement.innerText = formatDate(operation.date);
				contentElement.appendChild(dateElement);

				const amountElement = document.createElement('div');
				amountElement.classList.add('operation-amount');
				if (parseFloat(operation.amount) < 0) {
					amountElement.classList.add('negative');
					amountElement.innerText = operation.amount + '€';
				} else {
					amountElement.classList.add('positive');
					amountElement.innerText = '+' + operation.amount + '€';
				}
				operationElement.appendChild(amountElement);
				// assign style to operationElement based on operation properties
				assignClasses(operation, operationElement);
				assignStyles(operation.category, operationElement);
				operationsElement.appendChild(operationElement);
			}
		}
	});
	operationsElement.appendChild(loadMoreButton);
}

function handleCategory(categoryId, operationId, operationElement) {
	const category = categoriesId[categoryId];
	// find the operation in the operations array
	const operation = operations.find((op) => op.id === operationId);
	const editedOperation = editedOperations.find((op) => op.id === operationId);
	// update the category of the operation
	operation.category = category;
	editedOperation.category = category;
	// update the operation in the DOM
	operationElement = document.getElementById(operationId);
	assignStyles(category, operationElement);
	// log the update
	console.log('Updating operation ' + operationId + ' with category :' + categoriesId[categoryId]);
}

function editOperations() {
	let filteredOperations = operations.slice().filter((operation) => operation.date !== undefined);
	editedOperations = filteredOperations.map((op) => {
		let newOp = Object.assign({}, op);
		const date = new Date(op.date);
		newOp.dateOp = date.toISOString().slice(0, 10);
		newOp.categoryParent = op.categoryMain;
		delete newOp.xMonthAgo;
		delete newOp.date;
		delete newOp.categoryMain;
		return newOp;
	});
}

function createNewCSV(fileName) {
	editOperations();
	const csvString = Papa.unparse(editedOperations);
	const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
	saveAs(blob, fileName);
}

function setDate(dateOp, label) {
	const dateFormat = /\d{2}\/\d{2}\/\d{2}/;
	let date = dateOp ? new Date(dateOp) : undefined;
	let match = label ? label.match(dateFormat) : undefined;
	if (match) {
		const [day, month, year] = match[0].split('/').map(Number);
		date = new Date(year + 2000, month - 1, day);
	}
	return date;
}

function calcMonthDiff(now, date) {
	return (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());
}

function formatDate(date) {
	const dateObj = new Date(date);
	const month = getMonthName(dateObj.getMonth()).toLowerCase();
	const day = dateObj.getDate();
	const year = dateObj.getFullYear();
	return day + ' ' + month + ' ' + year;
}

function getMonthName(monthNum) {
	switch (monthNum) {
		case 0:
			return 'Janvier';
		case 1:
			return 'Février';
		case 2:
			return 'Mars';
		case 3:
			return 'Avril';
		case 4:
			return 'Mai';
		case 5:
			return 'Juin';
		case 6:
			return 'Juillet';
		case 7:
			return 'Août';
		case 8:
			return 'Septembre';
		case 9:
			return 'Octobre';
		case 10:
			return 'Novembre';
		case 11:
			return 'Décembre';
	}
}
