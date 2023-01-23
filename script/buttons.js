// bouton pour sauvegarder les operations dans un nouveau fichier CSV
const saveButton = document.getElementById('save-button');
saveButton.addEventListener('click', () => {
	createNewCSV('new_operations.csv');
});
//
//
//
// nombre de mois à charger
let monthsLoaded = 4;
// bouton pour charger plus d'operations
const loadMoreButton = document.createElement('button');
loadMoreButton.innerText = 'Charger plus';
loadMoreButton.id = 'load-more-button';
loadMoreButton.addEventListener('click', () => {
	monthsLoaded += 3;
	operationsElement.innerHTML = '';
	displayOperations(operations, operationsElement);
});
