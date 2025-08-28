import { DOMUtils } from "../utils/domUtils.js";

// Gestionnaire du thème sombre
export class ThemeManager {
  constructor() {
    this.darkModeToggle = null;
    this.init();
  }

  init() {
    this.createDarkModeToggle();
    this.loadDarkModePreference();
  }

  // Création du toggle pour le mode sombre
  createDarkModeToggle() {
    const toggle = DOMUtils.createElement("button", "btn dark-mode-toggle", {
      "aria-label": "Basculer le mode sombre",
    });

    toggle.textContent = "🌙";

    const styles = {
      position: "fixed",
      top: "20px",
      right: "20px",
      width: "44px",
      height: "44px",
      borderRadius: "50%",
      background: "var(--surface)",
      border: "1px solid var(--border)",
      boxShadow: "var(--shadow-md)",
      zIndex: "var(--z-header)",
      fontSize: "18px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s ease",
    };

    DOMUtils.applyStyles(toggle, styles);

    document.body.appendChild(toggle);
    this.darkModeToggle = toggle;

    // Événement du mode sombre
    toggle.addEventListener("click", () => {
      this.toggleDarkMode();
    });
  }

  // Basculer le mode sombre
  toggleDarkMode() {
    const isDark = document.body.classList.toggle("dark-mode");
    this.darkModeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("darkMode", isDark.toString());

    if (isDark) {
      this.applyDarkModeStyles();
    } else {
      this.removeDarkModeStyles();
    }
  }

  // Application des styles du mode sombre
  applyDarkModeStyles() {
    let darkStyleSheet = document.getElementById("dark-mode-styles");
    if (!darkStyleSheet) {
      darkStyleSheet = DOMUtils.createElement("style", "", {
        id: "dark-mode-styles",
      });
      document.head.appendChild(darkStyleSheet);
    }

    const darkStyles = `
            :root {
                --bg: #0f172a;
                --surface: #1e293b;
                --text: #f1f5f9;
                --muted: #94a3b8;
                --border: #334155;
                --border-strong: #475569;
            }
        `;

    darkStyleSheet.textContent = darkStyles;
  }

  // Suppression des styles du mode sombre
  removeDarkModeStyles() {
    const darkStyleSheet = document.getElementById("dark-mode-styles");
    if (darkStyleSheet) {
      document.head.removeChild(darkStyleSheet);
    }
  }

  // Chargement de la préférence du mode sombre
  loadDarkModePreference() {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      this.darkModeToggle.textContent = "☀️";
      this.applyDarkModeStyles();
    }
  }
}
