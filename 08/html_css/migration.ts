// code typescript pour l'application sport tracker
console.log("application sport tracker chargée");

// =================================
// types
// =================================

interface Utilisateur {
    id: number;
    nom: string;
    email: string;
}

interface Entrainement {
    id: number;
    date: string;   // format iso "2025-08-24"
    sport: string;
    duree: number;  // en minutes
    distance?: number | null; // optionnel
    calories: number;
    RPE: number;
    notes?: string;
}

interface BaseDeDonnees {
    utilisateur: Utilisateur;
    entrainements: Entrainement[];
}

// =================================
// initialisation de la base de données
// =================================

const defaultBDD: BaseDeDonnees = {
    utilisateur: { id: 1, nom: "Alex", email: "alex@example.com" },
    entrainements: [
        { id: 101, date: "2025-08-24", sport: "Course", duree: 45, distance: 10, calories: 600, RPE: 6 },
        { id: 102, date: "2025-08-22", sport: "Vélo", duree: 80, distance: 32, calories: 900, RPE: 9 }
    ]
};

let BDD: BaseDeDonnees;

// récupérer les données sauvegardées dans le localstorage
const savedData = localStorage.getItem('sportTrackerData');

if (savedData) {
    try {
        BDD = JSON.parse(savedData) as BaseDeDonnees;
    } catch {
        console.warn("erreur parsing localstorage, utilisation de la bdd par défaut.");
        BDD = defaultBDD;
    }
} else {
    console.log("aucune bdd trouvée, création d'une bdd par défaut.");
    BDD = defaultBDD;
    localStorage.setItem('sportTrackerData', JSON.stringify(BDD));
}

// =================================
// gestion du login
// =================================

const loginForm = document.getElementById('loginForm') as HTMLFormElement | null;

if (loginForm) {
    loginForm.addEventListener("submit", (event: Event) => {
        event.preventDefault();
        console.log("formulaire soumis ! redirection...");
        window.location.href = "dashboard.html";
    });
}

// =================================
// gestion du dashboard
// =================================

const dashboard = document.querySelector(".dashboard");

if (dashboard) {
    console.log("bienvenue sur le dashboard");

    const totalDistance = BDD.entrainements.reduce(
        (sum, entrainement) => sum + (entrainement.distance ?? 0),
        0
    );

    const totalSessions = BDD.entrainements.length;

    const totalCalories = BDD.entrainements.reduce(
        (sum, entrainement) => sum + entrainement.calories,
        0
    );

    const totalMinutes = BDD.entrainements.reduce(
        (sum, entrainement) => sum + entrainement.duree,
        0
    );

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const totalTimeFormatted = `${hours}h ${minutes}min`;

    const statValues = document.querySelectorAll(".stat-card__value");

    if (statValues.length === 4) {
        statValues[0].textContent = totalDistance + " km";
        statValues[1].textContent = totalSessions + " séances";
        statValues[2].textContent = totalCalories + " kcal";
        statValues[3].textContent = totalTimeFormatted;
    }
}

// =================================
// gestion de l'ajout d'un entraînement
// =================================

const trainingForm = document.getElementById('trainingForm') as HTMLFormElement | null;

if (trainingForm) {
    trainingForm.addEventListener("submit", (event: Event) => {
        event.preventDefault();

        const sportInput = document.getElementById("sport") as HTMLInputElement;
        const dateInput = document.getElementById("date") as HTMLInputElement;
        const dureeInput = document.getElementById("duree") as HTMLInputElement;
        const distanceInput = document.getElementById("distance") as HTMLInputElement;
        const rpeInput = document.getElementById("rpe") as HTMLInputElement;

        const newWorkout: Entrainement = {
            id: Date.now(),
            date: dateInput.value,
            sport: sportInput.value,
            duree: parseInt(dureeInput.value, 10),
            distance: parseFloat(distanceInput.value) || null,
            calories: Math.round(parseInt(dureeInput.value, 10) * 8.5),
            notes: "nouvelle séance ajoutée",
            RPE: parseInt(rpeInput.value, 10),
        };

        console.log("nouvel entraînement :", newWorkout);

        BDD.entrainements.push(newWorkout);
        localStorage.setItem('sportTrackerData', JSON.stringify(BDD));

        const submitButton = trainingForm.querySelector('button[type="submit"]') as HTMLButtonElement;
        submitButton.disabled = true;
        submitButton.textContent = "séance enregistrée !";

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1500);
    });
}
