import { DOMUtils } from "../utils/domUtils.js";
import { ViewComponents } from "../components/viewComponents.js";

// Gestionnaire des vues
export class ViewManager {
  constructor(eventHandler) {
    this.currentView = "home";
    this.eventHandler = eventHandler;
    this.mainElement = null;
  }

  // Initialiser l'élément main
  initMainElement() {
    if (!this.mainElement) {
      this.mainElement = DOMUtils.createElement("main");
      document.body.appendChild(this.mainElement);
    }
  }

  // Obtenir la vue actuelle
  getCurrentView() {
    return this.currentView;
  }

  // Affichage de la vue d'accueil
  showHomeView() {
    this.currentView = "home";
    this.initMainElement();

    DOMUtils.clearContainer(this.mainElement);

    // Création des composants
    const gallery = ViewComponents.createGallery();
    const cta = ViewComponents.createHomeCTA();

    // Assemblage de la vue
    const section = ViewComponents.createView("Palette Generator", [
      gallery,
      cta,
    ]);
    this.mainElement.appendChild(section);

    // Liaison des événements
    if (this.eventHandler) {
      this.eventHandler.bindHomeEvents();
    }
  }

  // Affichage de la vue palette
  showPaletteView() {
    this.currentView = "palette";
    this.initMainElement();

    DOMUtils.clearContainer(this.mainElement);

    // Création des composants
    const palette = ViewComponents.createPalette();
    const cta = ViewComponents.createPaletteCTA();

    // Assemblage de la vue
    const section = ViewComponents.createView("Generate a color Palette", [
      palette,
      cta,
    ]);
    this.mainElement.appendChild(section);

    // Liaison des événements
    if (this.eventHandler) {
      this.eventHandler.bindPaletteEvents();
      // Générer une palette initiale
      this.eventHandler.generateInitialPalette();
    }
  }

  // Transition entre les vues avec animation
  transitionToView(viewName, delay = 200) {
    if (!this.mainElement) {
      this.initMainElement();
    }

    this.mainElement.style.opacity = "0.5";
    this.mainElement.style.transform = "translateY(10px)";

    setTimeout(() => {
      if (viewName === "home") {
        this.showHomeView();
      } else if (viewName === "palette") {
        this.showPaletteView();
      }

      // Animation d'entrée
      this.mainElement.style.transition = "all 0.3s ease";
      this.mainElement.style.opacity = "1";
      this.mainElement.style.transform = "translateY(0)";

      setTimeout(() => {
        this.mainElement.style.transition = "";
      }, 300);
    }, delay);
  }
}
