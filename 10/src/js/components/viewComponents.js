import { DOMUtils } from "../utils/domUtils.js";

// Composants pour les vues de l'application
export class ViewComponents {
  // Création de la galerie d'exemples
  static createGallery() {
    const gallery = DOMUtils.createElement("div", "gallery", {
      role: "list",
      "aria-label": "Examples",
    });

    for (let i = 1; i <= 5; i++) {
      const article = DOMUtils.createElement("article", "card", {
        role: "listitem",
      });
      const cardImg = DOMUtils.createElement("div", "card__img");
      const img = DOMUtils.createElement("img", "", {
        src: `public/img/visual_${i}.png`,
        width: "100",
        height: "100",
        alt: `Exemple de palette ${i}`,
      });

      cardImg.appendChild(img);
      article.appendChild(cardImg);
      gallery.appendChild(article);
    }

    return gallery;
  }

  // Création du CTA de la page d'accueil
  static createHomeCTA() {
    const cta = DOMUtils.createElement("div", "cta");

    const generateBtn = DOMUtils.createTextElement(
      "button",
      "Generate Palette",
      "btn btn--primary",
      { id: "generate" }
    );
    const hint = DOMUtils.createTextElement(
      "span",
      "or press Spacebar",
      "hint"
    );

    cta.appendChild(generateBtn);
    cta.appendChild(hint);

    return cta;
  }

  // Création de la palette de couleurs
  static createPalette() {
    const palette = DOMUtils.createElement("div", "palette", {
      role: "list",
      "aria-label": "Palette de couleurs",
    });

    for (let i = 0; i < 5; i++) {
      const swatch = this.createSwatch(i);
      palette.appendChild(swatch);
    }

    return palette;
  }

  // Création d'un swatch individuel
  static createSwatch(index) {
    const swatch = DOMUtils.createElement("article", "swatch card", {
      role: "listitem",
      "data-index": index.toString(),
    });

    // Zone de couleur
    const colorDiv = DOMUtils.createElement("div", "swatch__color");
    colorDiv.style.setProperty("--c", "#000000");

    // Actions
    const actions = DOMUtils.createElement("div", "swatch__actions");

    // Bouton hex
    const hexButton = DOMUtils.createTextElement(
      "button",
      "#000000",
      "btn swatch__hex mono copy",
      {
        "aria-label": "Copier #000000",
      }
    );

    // Bouton lock
    const lockButton = DOMUtils.createTextElement(
      "button",
      "🔓",
      "btn swatch__lock",
      {
        "aria-pressed": "false",
        "aria-label": "Verrouiller",
      }
    );

    actions.appendChild(hexButton);
    actions.appendChild(lockButton);

    swatch.appendChild(colorDiv);
    swatch.appendChild(actions);

    return swatch;
  }

  // Création du CTA de la page palette
  static createPaletteCTA() {
    const cta = DOMUtils.createElement("div", "cta");

    const generateBtn = DOMUtils.createTextElement(
      "button",
      "Generate Palette",
      "btn btn--primary",
      { id: "generate" }
    );
    const hint = DOMUtils.createTextElement(
      "span",
      "or press Spacebar",
      "hint"
    );
    const backBtn = DOMUtils.createTextElement(
      "button",
      "← Back to Home",
      "btn",
      { id: "back-home" }
    );

    cta.appendChild(generateBtn);
    cta.appendChild(hint);
    cta.appendChild(backBtn);

    return cta;
  }

  // Création d'une vue complète
  static createView(title, content) {
    const section = DOMUtils.createElement("section", "container homepage");
    const titleElement = DOMUtils.createTextElement("h1", title);

    section.appendChild(titleElement);
    content.forEach((element) => section.appendChild(element));

    return section;
  }
}
