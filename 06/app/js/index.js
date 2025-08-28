// Toggle Dark/Light Mode
const themeToggle = document.getElementById("theme-switch");
const body = document.body;

// Charge le thème sauvegardé
const savedTheme = localStorage.getItem("theme") || "light";
if (savedTheme === "dark") {
	body.classList.add("dark-theme");
	themeToggle.checked = true;
}

// Gére le changement de thème
themeToggle.addEventListener("change", function () {
	if (this.checked) {
		body.classList.add("dark-theme");
		localStorage.setItem("theme", "dark");
	} else {
		body.classList.remove("dark-theme");
		localStorage.setItem("theme", "light");
	}
});

// Annonce le changement de thème aux lecteurs d'écran
themeToggle.addEventListener("change", function () {
	const announcement = this.checked
		? "Mode sombre activé"
		: "Mode clair activé";
	const announcer = document.createElement("div");
	announcer.setAttribute("aria-live", "polite");
	announcer.setAttribute("aria-atomic", "true");
	announcer.className = "sr-only";
	announcer.textContent = announcement;
	document.body.appendChild(announcer);

	setTimeout(() => {
		document.body.removeChild(announcer);
	}, 1000);
});

function goBack() {
	if (window.history.length > 1) {
		window.history.back();
	} else {
		window.location.href = "index.html";
	}
}

// Redirige vers la page d'accueil
function goHome() {
	window.location.href = "index.html";
}

// Affiche la date et l'heure actuelles
document.addEventListener("DOMContentLoaded", function () {
	const now = new Date();
	const date = now.toLocaleDateString("fr-FR", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
	const time = now.toLocaleTimeString("fr-FR", {
		hour: "2-digit",
		minute: "2-digit",
	});

	const dateElement = document.getElementById("current-date");
	const timeElement = document.getElementById("current-time");

	dateElement.textContent = date;
	dateElement.setAttribute("datetime", now.toISOString().split("T")[0]);
	timeElement.textContent = time;
	timeElement.setAttribute("datetime", now.toTimeString().slice(0, 5));

});

// Vérifie que toutes les questions sont remplies
document
	.getElementById("questionnaire-form")
	.addEventListener("submit", function (e) {
		e.preventDefault();

		let formValid = true;
		const totalQuestions = 5;
		const unanswered = [];

		for (let i = 1; i <= totalQuestions; i++) {
			const radios = document.querySelectorAll(`input[name="question_${i}"]`);
			const checked = Array.from(radios).some((radio) => radio.checked);

			if (!checked) {
				formValid = false;
				unanswered.push(i);
			}
		}

		if (!formValid) {
			alert(
				"Merci de répondre à toutes les questions avant de valider.\nQuestions manquantes : " +
					unanswered.join(", ") + "."
			);
			return;
		}
		window.location.href = "validation.html";
	});
