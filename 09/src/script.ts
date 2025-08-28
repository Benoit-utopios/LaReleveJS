// Définition du type Film
interface Film {
  title: string;
  year: string;
  category: string;
  imgurl: string;
}

// Liste des films
let arrayListFilm: Film[] = [];

// Sélection des éléments HTML avec assertions de type
let btn = document.getElementById("btn") as HTMLButtonElement;
let btn2 = document.getElementById("btn2") as HTMLButtonElement;
let listSection = document.querySelector(".list-film") as HTMLElement;

// Ajouter un film
btn.addEventListener("click", (e: MouseEvent) => {
  e.preventDefault();

  let title = (document.getElementById("title") as HTMLInputElement).value.trim();
  let year = (document.getElementById("year") as HTMLInputElement).value.trim();
  let category = (document.getElementById("category") as HTMLSelectElement).value.trim();
  let imgurl = (document.getElementById("imgurl") as HTMLInputElement).value.trim();

  // Vérifie si un champ est vide
  if (!title || !year || !category || !imgurl) {
    alert("Merci de remplir tous les champs !");
    return;
  }

  // Création de l’objet film
  let film: Film = { title, year, category, imgurl };
  arrayListFilm.push(film);

  // Message de succès
  alert("Film ajouté avec succès !");

  // Réaffiche la liste
  listSection.innerHTML = "<h2>Films à voir</h2>";

  arrayListFilm.forEach((film) => {
    let filmCard = `
      <div class="film-card">
        <h3>${film.title} (${film.year})</h3>
        <p><strong>Genre :</strong> ${film.category}</p>
        <img src="${film.imgurl}" alt="" width="150">
      </div>
    `;
    listSection.innerHTML += filmCard;
  });
});