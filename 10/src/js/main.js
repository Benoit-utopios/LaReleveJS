// Imports des modules
import { ThemeManager } from "./managers/themeManager.js";
import { ViewManager } from "./managers/viewManager.js";
import { PaletteManager } from "./managers/paletteManager.js";
import { AnimationManager } from "./managers/animationManager.js";
import { ClipboardManager } from "./utils/clipboardManager.js";
import { DOMUtils } from "./utils/domUtils.js";

// Classe principale de l'application
class PaletteGenerator {
  constructor() {
    this.themeManager = new ThemeManager();
    this.paletteManager = new PaletteManager();
    this.viewManager = new ViewManager(this);

    this.init();
  }

  init() {
    this.createHeader();
    this.bindGlobalEvents();
    this.viewManager.showHomeView();
    setTimeout(() => this.createFooter(), 100);
  }

  // Création du header
  createHeader() {
    const header = DOMUtils.createElement("header", "topbar");
    const headerContainer = DOMUtils.createElement("div", "container");

    const brand = DOMUtils.createElement("div", "brand");
    const logoDiv = DOMUtils.createElement("div", "logo");

    // SVG logo
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.setAttribute("fill", "none");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill-rule", "evenodd");
    path.setAttribute("clip-rule", "evenodd");
    path.setAttribute(
      "d",
      "M13.1583 7.20873C13.4527 7.14543 13.5621 7.1863 13.586 7.1978C13.5959 7.21833 13.6182 7.28567 13.6027 7.44453C13.5803 7.67517 13.4834 8.00153 13.2857 8.41003C12.8933 9.22103 12.1695 10.221 11.1953 11.1953C10.221 12.1695 9.22107 12.8933 8.41003 13.2857C8.00153 13.4834 7.67517 13.5802 7.44453 13.6027C7.2857 13.6182 7.21837 13.5958 7.1978 13.586C7.1863 13.5621 7.14543 13.4527 7.20873 13.1583C7.2854 12.8018 7.48963 12.3219 7.8346 11.7606C8.2525 11.0806 8.8499 10.3248 9.58737 9.58733C10.3248 8.8499 11.0806 8.25247 11.7606 7.83457C12.3219 7.48963 12.8018 7.2854 13.1583 7.20873ZM1.47063 9.74677L6.25323 14.5294C6.6271 14.9032 7.13423 14.9726 7.5739 14.9298C8.0195 14.8863 8.50493 14.721 8.99077 14.486C9.9684 14.0129 11.0873 13.1889 12.1381 12.1381C13.1889 11.0873 14.0129 9.9684 14.486 8.99077C14.721 8.50493 14.8863 8.0195 14.9298 7.5739C14.9726 7.13423 14.9032 6.6271 14.5294 6.25323L9.74677 1.47062C9.28423 1.00809 8.6255 1.00858 8.09537 1.12259C7.53603 1.24288 6.91113 1.52806 6.27987 1.916C5.49927 2.39572 4.6627 3.06118 3.86193 3.86193C3.06118 4.66267 2.39572 5.49927 1.91601 6.27987C1.52807 6.91113 1.24288 7.53603 1.12259 8.09537C1.00858 8.6255 1.0081 9.28423 1.47063 9.74677Z"
    );
    path.setAttribute("fill", "#0D141C");

    svg.appendChild(path);
    logoDiv.appendChild(svg);

    const spanLogo = DOMUtils.createElement("span", "logo");
    spanLogo.textContent = "Palette Generator";

    brand.appendChild(logoDiv);
    brand.appendChild(spanLogo);

    const avatar = DOMUtils.createElement("div", "avatar");
    const avatarImg = DOMUtils.createElement("img", "", {
      src: "public/img/pic.png",
      width: "40",
      height: "40",
      alt: "Avatar",
    });

    avatar.appendChild(avatarImg);
    headerContainer.appendChild(brand);
    headerContainer.appendChild(avatar);
    header.appendChild(headerContainer);
    document.body.appendChild(header);
  }

  // Création du footer
  createFooter() {
    const footer = DOMUtils.createElement("footer", "site-footer");
    const footerContainer = DOMUtils.createElement(
      "div",
      "container footer-grid"
    );

    ["About", "Contact", "Terms of Service", "Privacy Policy"].forEach(
      (text) => {
        const link = DOMUtils.createElement("a", "", { href: "#" });
        link.textContent = text;
        footerContainer.appendChild(link);
      }
    );

    const socialContainer = DOMUtils.createElement("div", "container social");
    const social = DOMUtils.createElement("div", "social");

    const socials = [
      { href: "https://x.com/", img: "twitter.png", alt: "Twitter" },
      {
        href: "https://www.instagram.com/",
        img: "insta.png",
        alt: "Instagram",
      },
      { href: "https://github.com/", img: "github.png", alt: "GitHub" },
    ];

    socials.forEach(({ href, img, alt }) => {
      const a = DOMUtils.createElement("a", "", { href, "aria-label": alt });
      const image = DOMUtils.createElement("img", "", {
        src: `public/img/${img}`,
        width: "24",
        height: "24",
        alt: alt,
      });
      a.appendChild(image);
      social.appendChild(a);
    });

    socialContainer.appendChild(social);
    footer.appendChild(footerContainer);
    footer.appendChild(socialContainer);

    const pCopy = DOMUtils.createElement("p", "copy");
    pCopy.textContent = "©2025 Color Palette Generator. All rights reserved.";

    footer.appendChild(pCopy);
    document.body.appendChild(footer);
  }

  // Génération de palette initiale
  generateInitialPalette() {
    setTimeout(() => {
      this.paletteManager.generateRandomPalette();
    }, 100);
  }

  // Événements de la page d'accueil
  bindHomeEvents() {
    const generateBtn = DOMUtils.findElement("#generate");
    if (!generateBtn) return;

    generateBtn.addEventListener("click", () => {
      AnimationManager.animateGeneration(this.viewManager.getCurrentView());
      setTimeout(() => this.viewManager.transitionToView("palette"), 200);
    });
  }

  // Événements de la page palette
  bindPaletteEvents() {
    const generateBtn = DOMUtils.findElement("#generate");
    const backBtn = DOMUtils.findElement("#back-home");
    const swatches = DOMUtils.findElements(".swatch");

    // Génération de palette
    if (generateBtn) {
      generateBtn.addEventListener("click", () => {
        AnimationManager.animateGeneration(
          this.viewManager.getCurrentView(),
          this.paletteManager.lockedColors
        );
        setTimeout(() => this.paletteManager.generateRandomPalette(), 100);
      });
    }

    // Retour à l'accueil
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        this.viewManager.transitionToView("home");
      });
    }

    // Événements sur les swatches
    swatches.forEach((swatch, index) => {
      const hexButton = swatch.querySelector(".swatch__hex");
      const lockButton = swatch.querySelector(".swatch__lock");

      if (hexButton) {
        hexButton.addEventListener("click", () => {
          const color = hexButton.textContent;
          ClipboardManager.copyToClipboard(color, hexButton);
        });
      }

      if (lockButton) {
        lockButton.addEventListener("click", () => {
          this.paletteManager.toggleLock(index, lockButton);
        });
      }
    });
  }

  // Événements globaux
  bindGlobalEvents() {
    // Logo cliquable pour retourner à l'accueil
    const brand = DOMUtils.findElement(".brand");
    if (brand) {
      brand.style.cursor = "pointer";
      brand.addEventListener("click", () => {
        if (this.viewManager.getCurrentView() === "palette") {
          this.viewManager.transitionToView("home");
        }
      });
    }

    // Raccourci clavier global (barre d'espace)
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" && e.target.tagName !== "INPUT") {
        e.preventDefault();

        const currentView = this.viewManager.getCurrentView();

        if (currentView === "home") {
          AnimationManager.animateGeneration(currentView);
          setTimeout(() => this.viewManager.transitionToView("palette"), 200);
        } else if (currentView === "palette") {
          AnimationManager.animateGeneration(
            currentView,
            this.paletteManager.lockedColors
          );
          setTimeout(() => this.paletteManager.generateRandomPalette(), 100);
        }
      }
    });

    // Raccourcis clavier additionnels
    document.addEventListener("keydown", (e) => {
      // Échap pour retourner à l'accueil
      if (
        e.code === "Escape" &&
        this.viewManager.getCurrentView() === "palette"
      ) {
        this.viewManager.transitionToView("home");
      }

      // R pour régénérer (sur la page palette uniquement)
      if (
        e.code === "KeyR" &&
        this.viewManager.getCurrentView() === "palette"
      ) {
        e.preventDefault();
        AnimationManager.animateGeneration(
          this.viewManager.getCurrentView(),
          this.paletteManager.lockedColors
        );
        setTimeout(() => this.paletteManager.generateRandomPalette(), 100);
      }

      // C pour effacer tous les verrouillages
      if (
        e.code === "KeyC" &&
        this.viewManager.getCurrentView() === "palette"
      ) {
        e.preventDefault();
        this.paletteManager.clearLocks();
      }

      // Chiffres 1-5 pour verrouiller/déverrouiller des couleurs spécifiques
      if (this.viewManager.getCurrentView() === "palette") {
        const keyNum = parseInt(e.code.replace("Digit", ""));
        if (keyNum >= 1 && keyNum <= 5) {
          e.preventDefault();
          const index = keyNum - 1;
          const lockButton = document.querySelector(
            `[data-index="${index}"] .swatch__lock`
          );
          if (lockButton) {
            this.paletteManager.toggleLock(index, lockButton);
          }
        }
      }
    });

    // Gestion des erreurs globales
    window.addEventListener("error", (e) => {
      console.error("Erreur dans l'application:", e.error);
    });

    // Prévention du rechargement accidentel avec des données non sauvegardées
    window.addEventListener("beforeunload", (e) => {
      if (
        this.viewManager.getCurrentView() === "palette" &&
        this.paletteManager.lockedColors.size > 0
      ) {
        e.preventDefault();
        e.returnValue =
          "Vous avez des couleurs verrouillées. Êtes-vous sûr de vouloir quitter ?";
      }
    });
  }

  // Méthodes utilitaires publiques

  // Exporter la palette actuelle
  exportPalette() {
    if (this.viewManager.getCurrentView() !== "palette") return null;

    return {
      colors: this.paletteManager.getCurrentPalette(),
      locked: Array.from(this.paletteManager.lockedColors),
      timestamp: new Date().toISOString(),
    };
  }

  // Importer une palette
  importPalette(paletteData) {
    if (!paletteData || !paletteData.colors) return false;

    if (this.viewManager.getCurrentView() !== "palette") {
      this.viewManager.transitionToView("palette");
      setTimeout(() => this.applyImportedPalette(paletteData), 500);
    } else {
      this.applyImportedPalette(paletteData);
    }

    return true;
  }

  // Appliquer une palette importée
  applyImportedPalette(paletteData) {
    const swatches = DOMUtils.findElements(".swatch");

    paletteData.colors.forEach((color, index) => {
      if (index < swatches.length) {
        this.paletteManager.currentPalette[index] = color;
        this.paletteManager.updateSwatch(swatches[index], color, index);
      }
    });

    // Appliquer les verrouillages
    if (paletteData.locked) {
      this.paletteManager.clearLocks();
      paletteData.locked.forEach((index) => {
        const lockButton = document.querySelector(
          `[data-index="${index}"] .swatch__lock`
        );
        if (lockButton) {
          this.paletteManager.toggleLock(index, lockButton);
        }
      });
    }
  }

  // Obtenir les statistiques de l'application
  getStats() {
    return {
      currentView: this.viewManager.getCurrentView(),
      isDarkMode: document.body.classList.contains("dark-mode"),
      lockedColorsCount: this.paletteManager.lockedColors.size,
      currentPalette: this.paletteManager.getCurrentPalette(),
    };
  }
}

// Initialisation de l'application
document.addEventListener("DOMContentLoaded", () => {
  // Vérification du support des modules ES6
  if (!window.navigator || !window.navigator.clipboard) {
    console.warn(
      "Certaines fonctionnalités avancées peuvent ne pas être disponibles sur ce navigateur."
    );
  }

  try {
    // Création de l'instance principale
    const app = new PaletteGenerator();

    // Exposition globale pour le debugging (en développement uniquement)
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      window.paletteApp = app;
      console.log("Palette Generator chargé avec succès!");
      console.log("Raccourcis disponibles:");
      console.log("  - Espace: Générer/Régénérer");
      console.log("  - Échap: Retour à l'accueil");
      console.log("  - R: Régénérer la palette");
      console.log("  - C: Effacer tous les verrouillages");
      console.log("  - 1-5: Verrouiller/Déverrouiller une couleur");
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation de l'application:", error);

    // Fallback simple si les modules ne se chargent pas
    const fallbackDiv = DOMUtils.createElement("div", "", {
      style: "text-align: center; padding: 2rem; font-family: system-ui;",
    });

    const h1 = DOMUtils.createElement("h1");
    h1.textContent = "Erreur de chargement";

    const p1 = DOMUtils.createElement("p");
    p1.textContent = "L'application n'a pas pu se charger correctement.";

    const p2 = DOMUtils.createElement("p");
    p2.textContent =
      "Veuillez vérifier que votre navigateur supporte les modules ES6.";

    const button = DOMUtils.createElement("button");
    button.textContent = "Recharger la page";
    button.onclick = () => window.location.reload();

    fallbackDiv.appendChild(h1);
    fallbackDiv.appendChild(p1);
    fallbackDiv.appendChild(p2);
    fallbackDiv.appendChild(button);

    document.body.appendChild(fallbackDiv);
  }
});
