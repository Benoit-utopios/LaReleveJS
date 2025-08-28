let arrayListFilm = [];
let btn = document.getElementById("btn");
let btn2 = document.getElementById("btn2");
let listSection = document.querySelector(".list-film");

// Ajouter un film
btn.addEventListener("click", (e) => {
  e.preventDefault();

  let title = document.getElementById("title").value.trim();
  let year = document.getElementById("year").value.trim();
  let category = document.getElementById("category").value.trim();
  let imgurl = document.getElementById("imgurl").value.trim();

   // Vérifie si un champ est vide
  if (!title || !year || !category || !imgurl) {
    alert("Merci de remplir tous les champs !");
    return; 
  }

  // Création de l’objet film
  let film = { title, year, category, imgurl };
  arrayListFilm.push(film);

  // Message de succès
  alert("Film ajouté avec succès !");

  // Réaffiche la liste

  listSection.innerHTML = "<h2>Films à voir</h2>";

  // Parcourt le tableau et génère du HTML
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


