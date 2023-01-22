// bouton pour sauvegarder les operations dans un nouveau fichier CSV
const saveButton = document.getElementById('save-button');
saveButton.addEventListener('click', () => {
	createNewCSV('new_operations.csv');
});

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

// Récupération du bouton
var scrollTopButton = document.getElementById('scroll-top-button');
// Fonction pour remonter en haut de la page
function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
}
// Ajout d'un écouteur d'événement pour l'événement "click" sur le bouton
scrollTopButton.addEventListener('click', scrollToTop);
// Fonction pour afficher/masquer le bouton en fonction de la position de défilement de la page
function toggleButton() {
	if (window.pageYOffset > 300) {
		scrollTopButton.style.display = 'block';
	} else {
		scrollTopButton.style.display = 'none';
	}
}
// Ajout d'un écouteur d'événement pour l'événement "scroll" sur la fenêtre
window.addEventListener('scroll', toggleButton);
