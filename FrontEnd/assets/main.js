/*// Déclaration des variables
let works = [];
let categories = [];
const gallery = document.querySelector('.gallery');
const filters = document.querySelector('.filters');

// Récupération des catégories via l'API
async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:5678/api/categories');
        const listCategories = await response.json();
        categories = listCategories;

        listCategories.map((category) => {
            const filter = document.createElement('li'); // Création des "li"
            filter.className = 'filter';
            filter.dataset.id = category.id;
            filter.textContent = category.name;
            filters.appendChild(filter); // Association des "li" à la balise "ul" crée dans le html
        })
    } catch (error) {
        console.log(error);
    }
}

// Récupération des données works via l'API
async function fetchWorks() {
    try {
        const response = await fetch('http://localhost:5678/api/works');
        const listWorks = await response.json();
        works = listWorks;
        displayWorks(works)
    } catch (error) {
        console.log(error);
    }
}

// Filtrage des projets par catégorie
async function worksFilteredByCategory() {
    const filterItems = document.querySelectorAll('.filters li');
    filterItems.forEach((item) => item.addEventListener('click', () => {
        let worksFiltered = [];
        gallery.innerHTML = '';
        // Uniquement si on clique sur un filtre autre que "TOUS"
        worksFiltered = works.filter(work => work.category.id == item.dataset.id);
        displayWorks(worksFiltered)
    }))
}

// Au chargement de la page
addEventListener("DOMContentLoaded", async (event) => {
    await fetchCategories()
    await fetchWorks();
    await worksFilteredByCategory();
});

// Création des projets de la gallerie
function displayWorks(works) {
    works.map((work) => {
        const workItem = document.createElement('figure');
        workItem.dataset.id = work.category.id;
        workItem.innerHTML = `<img src=${work.imageUrl} alt=${work.title}
            <figcaption>${work.title}</figcaption>`
        gallery.appendChild(workItem);
    })
}
*/

// Chargement de la page
addEventListener('DOMContentLoaded', async (event) => {
    await genererGallery();
    await genererCategoriesFiltersGallery();
    filtersCategories();
})

// Création de la gallerie
async function genererGallery () {
    try {
        const response = await fetch('http://localhost:5678/api/works');
        const works = await response.json();
        console.log(works);
        works.map((work) => {
            const sectionGallery = document.querySelector('.gallery');
            const figureGallery = document.createElement('figure');
            figureGallery.dataset.id = work.category.id;
            figureGallery.innerHTML = `<img src=${work.imageUrl} alt=${work.title}
            <figcaption>${work.title}</figcaption>`
            sectionGallery.appendChild(figureGallery);
        });
    } catch (error) {
        console.log('erreur serveur')
    }
    
    
}

// Création des boutons de filtres
async function genererCategoriesFiltersGallery () {
    try {
        const response = await fetch('http://localhost:5678/api/categories');
        const categories = await response.json();
        console.log(categories);
        categories.map((category) => {
            const sectionFilters = document.querySelector('.filters');
            const buttonFilters = document.createElement('button');
            buttonFilters.className = 'filter';
            buttonFilters.dataset.id = category.id;
            buttonFilters.textContent = category.name;
            sectionFilters.appendChild(buttonFilters);
        });
    } catch (error) {
        console.log('erreur serveur');
    }
}


/*// Filtrage des projets par catégorie
async function worksFilteredByCategory() {
    const filterItems = document.querySelectorAll('.filters li');
    filterItems.forEach((item) => item.addEventListener('click', () => {
        let worksFiltered = [];
        gallery.innerHTML = '';
        // Uniquement si on clique sur un filtre autre que "TOUS"
        worksFiltered = works.filter(work => work.category.id == item.dataset.id);
        displayWorks(worksFiltered)
    }))
}*/
