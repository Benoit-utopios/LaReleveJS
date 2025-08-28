// ===============================
// Fichier : script.js
// ===============================

// Importation des données depuis data.js
import { recettes } from './data.js';

//  Sélection des éléments de recherche
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

//  Sélection du conteneur HTML où les recettes seront affichées
const recetteContainer = document.getElementById("recette-container");

//  Fonction principale pour afficher une liste de recettes
function afficherRecettes(listeRecettes) {
    recetteContainer.innerHTML = ""; // Nettoie le contenu précédent

    if (!listeRecettes || listeRecettes.length === 0) {
        recetteContainer.innerHTML = "<p>Aucune recette à afficher.</p>";
        return;
    }

    listeRecettes.forEach(recette => {
        // Création du bloc recette
        const bloc = document.createElement("div");
        bloc.classList.add("recette");

        // Image du plat
        const img = document.createElement("img");
        img.src = recette.image;
        img.alt = recette.titre;

        // Titre de la recette
        const titre = document.createElement("h3");
        titre.textContent = recette.titre;

        // Description courte
        const desc = document.createElement("p");
        desc.textContent = recette.description;

        // Temps de préparation
        const temps = document.createElement("p");
        temps.textContent = "⏱️ Temps : " + recette.temps;

        // Note utilisateur
        const note = document.createElement("p");
        note.textContent = "⭐ Note : " + recette.note + " / 5";

        // Liste des ingrédients
        const ingredients = document.createElement("ul");
        recette.ingredients.forEach(ing => {
            const li = document.createElement("li");
            li.textContent = ing;
            ingredients.appendChild(li);
        });

        // Bouton "Voir la recette"
        const bouton = document.createElement("button");
        bouton.textContent = "Voir la recette";
        bouton.classList.add("btn-recette");
        bouton.addEventListener("click", () => {
            alert("Recette sélectionnée : " + recette.titre);
        });

        // Ajout de tous les éléments au bloc
        bloc.appendChild(img);
        bloc.appendChild(titre);
        bloc.appendChild(desc);
        bloc.appendChild(temps);
        bloc.appendChild(note);
        bloc.appendChild(ingredients);
        bloc.appendChild(bouton);

        // Ajout du bloc au conteneur principal
        recetteContainer.appendChild(bloc);
    });
}


//  Fonction de recherche par mot-clé
searchBtn.addEventListener("click", () => {
    const motCle = searchInput.value.trim().toLowerCase();

    if (motCle === "") {
        // Si aucun mot-clé, on affiche toutes les recettes
        afficherRecettes(recettes);
        return;
    }

    //  Filtrage des recettes selon le mot-clé
    const resultats = recettes.filter(recette => {
        return (
            recette.titre.toLowerCase().includes(motCle) ||
            recette.description.toLowerCase().includes(motCle) ||
            recette.ingredients.some(ing => ing.toLowerCase().includes(motCle))
        );
    });

    // Affichage des résultats
    afficherRecettes(resultats);
});

// Filtre par categorie

// Sélection des onglets
const onglets = document.querySelectorAll(".tabs a");

//  Gestion du clic sur chaque onglet
onglets.forEach(onglet => {
    onglet.addEventListener("click", function (e) {
        e.preventDefault();

        // Mise à jour de l'onglet actif
        onglets.forEach(o => o.classList.remove("active"));
        this.classList.add("active");

        //  Récupère la catégorie depuis l'attribut data
        const categorie = this.dataset.categorie;

        // Filtre les recettes par catégorie
        const recettesFiltrees = recettes.filter(r => r.categorie === categorie);

        // Affiche les recettes filtrées
        afficherRecettes(recettesFiltrees);
    });
});

//  Affichage initial : toutes les recettes au chargement de la page
window.addEventListener("load", () => {
    afficherRecettes(recettes);
});

