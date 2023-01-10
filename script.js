let monthsLoaded = 4;

// Déclaration et initialisation de loadMoreButton en dehors de la chaîne de promesses
const loadMoreButton = document.createElement('button');
loadMoreButton.innerText = 'Charger plus';

// Déclaration des variables operations et operationsElement en dehors de la chaîne de promesses
let operations = [];
const operationsElement = document.getElementById('operations');

loadMoreButton.addEventListener('click', () => {
	monthsLoaded += 3;
	operationsElement.innerHTML = '';
	displayOperations(operations, operationsElement);
});

fetch('operations.csv')
	.then((response) => response.text())
	.then((text) => {
		const CSVoperations = {};
		const rows = Papa.parse(text, { header: true }).data;
		const now = new Date(Date.now());
		rows.forEach((row) => {
			const date = new Date(row.dateOp);
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
				date: date,
				label: row.label,
				category: row.category,
				categoryParent: row.categoryParent,
				amount: row.amount ? parseFloat(row.amount.replace(',', '.')).toFixed(2) : row.amount,
				accountLabel: row.accountLabel,
				accountBalance: row.accountbalance
					? parseFloat(row.accountbalance.replace(',', '.')).toFixed(2)
					: row.accountbalance,
				xMonthsAgo: totalMonthDiff,
			});
		});

		for (const year in CSVoperations) {
			for (const month in CSVoperations[year]) {
				for (const day in CSVoperations[year][month]) {
					operations = operations.concat(CSVoperations[year][month][day]);
				}
				const separatorDate = new Date(year, month, 0);
				operations.push({
					date: 'undefined',
					label: getMonthName(parseInt(month, 10)) + ' ' + year,
					category: 'separator',
					categoryParent: 'undefined',
					amount: 'undefined',
					accountLabel: 'undefined',
					accountBalance: 'undefined',
					xMonthsAgo: calcMonthDiff(now, separatorDate) - 1,
				});
			}
		}
		operations.reverse();
		displayOperations(operations, operationsElement);

		console.log(CSVoperations);
		console.log(operations);
		console.log(monthsLoaded);
	});

function displayOperations(operations, operationsElement) {
	operations.forEach((operation) => {
		if (operation.xMonthsAgo < monthsLoaded) {
			if (operation.category === 'separator') {
				const separatorElement = document.createElement('div');
				separatorElement.innerText = operation.label;
				separatorElement.classList.add('separator');
				operationsElement.appendChild(separatorElement);
			} else if (operation.date) {
				const operationElement = document.createElement('div');

				const iconElement = document.createElement('div');
				iconElement.classList.add('operation-icon');
				operationElement.appendChild(iconElement);

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
				assignClasses(operation, operationElement); // assign classes to operationElement based on operation properties
				operationsElement.appendChild(operationElement);
			}
		}
	});
	operationsElement.appendChild(loadMoreButton);
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
