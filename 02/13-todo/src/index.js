// ---------------- Dark Mode ----------------------------------------------
const root = document.documentElement;
const btnSwitch = document.getElementById("switch");

// ------------------ bouton toggle (switch) pour le mode thème dark/light -------------------
if (btnSwitch) {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    root.classList.add("dark");
    btnSwitch.checked = true;
  } else {
    root.classList.remove("dark");
    btnSwitch.checked = false;
  }

  // sauvegarde dans le localStorage du mode thème ---------------
  btnSwitch.addEventListener("change", () => {
    root.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      root.classList.contains("dark") ? "dark" : "light",
    );
  });
}

// ---------------- Anime container (contenu) -------------------------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("contenu");
  container.classList.remove("opacity-0", "-translate-y-9");
  container.classList.add("opacity-100", "translate-y-0");
});

// ---------------- Création de profil ---------------------------------------------------------------

// ---------------- Gestion de la tâche ----------------
const textInput = document.getElementById("tache");
const btnValid = document.getElementById("btnValid");

// ---------------- Bouton Valider ----------------
if (btnValid) {
  btnValid.addEventListener("click", () => {
    // Sauvegarde de la tâche
    if (textInput) {
      localStorage.setItem("tache", textInput.value.trim());
    }

    // Redirection
    window.location.href = "profil.html";
  });
}

// ---------------- Page profil -----------------------------------------------
// -------------- Récupération de la tâche ------------------------------
const mirror = document.getElementById("mirror");
if (mirror) {
  const savedTache = localStorage.getItem("tache");
  mirror.textContent = savedTache || "Tâche";
}

// ---------------- Bouton Recommencer ----------------
const btnRestart = document.getElementById("btnRestart");
if (btnRestart) {
  btnRestart.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}
