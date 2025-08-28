// Code JavaScript pour l'application Sport Tracker
console.log("Application Sport Tracker chargée");

// =================================
// INITIALISATION DE LA BASE DE DONNÉES
// =================================

// On définit une BDD par défaut
const defaultBDD = {
  "utilisateur": { "id": 1, "nom": "Alex", "email": "alex@example.com" },
  "entrainements": [
    { "id": 101, "date": "2025-08-24", "sport": "Course", "duree": 45, "distance": 10, "calories": 600, "RPE": 6 },
    { "id": 102, "date": "2025-08-22", "sport": "Vélo", "duree": 80, "distance": 32, "calories": 900, "RPE" : 9 }
  ]
};

// récupérer les données sauvegardées dans le localStorage
let BDD = JSON.parse(localStorage.getItem('sportTrackerData'));

// Si aucune donnée sauvegardée, BDD par défaut
if (!BDD) {
  console.log("Aucune BDD trouvée, création d'une BDD par défaut.");
  BDD = defaultBDD;
  localStorage.setItem('sportTrackerData', JSON.stringify(BDD));
}


const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    // Empêche le rechargement de la page
    event.preventDefault();

    console.log("Formulaire soumis ! Redirection...");

    // Redirection utilisateur vers le tableau de bord
    window.location.href = "dashboard.html";
  });
}

// Gestion du tableau de bord -> dashboard.html

const dashboard = document.querySelector(".dashboard");

if (dashboard) {
  console.log("Bienvenue sur le dashboard");

  // calcul distance Totale
  const totalDistance = BDD.entrainements.reduce(
    (sum, entrainement) => sum + (entrainement.distance || 0),
    0
  );

  // nombre total de séances
  const totalSessions = BDD.entrainements.length;

  // nombre total de calories brûlées
  const totalCalories = BDD.entrainements.reduce(
    (sum, entrainement) => sum + entrainement.calories,
    0
  );

  // durée totale en minutes
  const totalMinutes = BDD.entrainements.reduce(
    (sum, entrainement) => sum + entrainement.duree,
    0
  );

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const totalTimeFormatted = `${hours}h ${minutes}min`;

  // MAJ HTML
  const statValues = document.querySelectorAll(".stat-card__value");

  if (statValues.length === 4) {
    statValues[0].textContent = totalDistance + " km";
    statValues[1].textContent = totalSessions + " séances";
    statValues[2].textContent = totalCalories + " kcal";
    statValues[3].textContent = totalTimeFormatted;
  }
}

// Gestion de l'ajout d'un entraînement -> form.html

const trainingForm = document.getElementById('trainingForm');

if (trainingForm) {
  trainingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const sportInput = document.getElementById("sport");
    const dateInput = document.getElementById("date");
    const dureeInput = document.getElementById("duree");
    const distanceInput = document.getElementById("distance");
    const rpeInput = document.getElementById("rpe");

    const newWorkout = {
      id: Date.now(),
      date: dateInput.value,
      sport: sportInput.value,
      duree: parseInt(dureeInput.value, 10),
      distance: parseFloat(distanceInput.value) || null,
      calories: Math.round(parseInt(dureeInput.value, 10) * 8.5),
      notes: "Nouvelle séance ajoutée",
      RPE: parseInt(rpeInput.value, 10),
    };

    
    // Ajout de l'entraînement à la base de données (BDD)
    console.log("Nouvel entraînement :", newWorkout);

    BDD.entrainements.push(newWorkout);
    localStorage.setItem('sportTrackerData', JSON.stringify(BDD));


    const submitButton = trainingForm.querySelector('button[type="submit"]');
    submitButton.disabled = true; // éviter les double-clics
    submitButton.textContent = "Séance enregistrée !";

    // Attente de 1.5 secondes avant de rediriger
    setTimeout(function () {
      window.location.href = "dashboard.html";
    }, 1500); // Délai de 1.5 secondes
  });

  
}
