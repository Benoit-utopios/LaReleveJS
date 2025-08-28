// Utilitaires pour la manipulation du DOM
export class DOMUtils {
  // Créer un élément avec classe et attributs
  static createElement(tag, className = "", attributes = {}) {
    const element = document.createElement(tag);
    if (className) element.className = className;

    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });

    return element;
  }

  // Vider un container
  static clearContainer(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  // Appliquer des styles en masse
  static applyStyles(element, styles) {
    Object.assign(element.style, styles);
  }

  // Créer un élément avec du texte
  static createTextElement(tag, text, className = "", attributes = {}) {
    const element = this.createElement(tag, className, attributes);
    element.textContent = text;
    return element;
  }

  // Trouver un élément de manière sécurisée
  static findElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
      console.warn(`Element not found: ${selector}`);
    }
    return element;
  }

  // Trouver plusieurs éléments de manière sécurisée
  static findElements(selector) {
    return document.querySelectorAll(selector);
  }
}
