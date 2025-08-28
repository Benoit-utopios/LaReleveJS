import { ColorUtils } from "../utils/colorUtils.js";
import { AnimationManager } from "./animationManager.js";

// Gestionnaire de palette de couleurs
export class PaletteManager {
  constructor() {
    this.currentPalette = [];
    this.lockedColors = new Set();
  }

  // Génération de la palette complète
  generateRandomPalette() {
    const newPalette = ColorUtils.generateHarmoniousPalette();
    const swatches = document.querySelectorAll(".swatch");

    swatches.forEach((swatch, index) => {
      const isLocked = this.lockedColors.has(index);

      if (!isLocked) {
        const color = newPalette[index];
        this.currentPalette[index] = color;
        this.updateSwatch(swatch, color, index);
        AnimationManager.animateColorChange(swatch);
      }
    });
  }

  // Mise à jour d'un swatch
  updateSwatch(swatch, color, index) {
    const colorElement = swatch.querySelector(".swatch__color");
    const hexButton = swatch.querySelector(".swatch__hex");

    if (!colorElement || !hexButton) return;

    colorElement.style.setProperty("--c", color);
    hexButton.textContent = color;
    hexButton.setAttribute("aria-label", `Copier ${color}`);

    ColorUtils.adjustTextContrast(hexButton, color);
  }

  // Gestion du verrouillage des couleurs
  toggleLock(index, lockButton) {
    if (this.lockedColors.has(index)) {
      this.lockedColors.delete(index);
      lockButton.textContent = "🔓";
      lockButton.setAttribute("aria-pressed", "false");
      lockButton.style.background = "";
      lockButton.style.color = "";
    } else {
      this.lockedColors.add(index);
      lockButton.textContent = "🔒";
      lockButton.setAttribute("aria-pressed", "true");
      lockButton.style.background = "var(--warning)";
      lockButton.style.color = "white";
    }
  }

  // Vérifier si une couleur est verrouillée
  isColorLocked(index) {
    return this.lockedColors.has(index);
  }

  // Obtenir la palette actuelle
  getCurrentPalette() {
    return [...this.currentPalette];
  }

  // Réinitialiser les verrouillages
  clearLocks() {
    this.lockedColors.clear();
    const lockButtons = document.querySelectorAll(".swatch__lock");
    lockButtons.forEach((button) => {
      button.textContent = "🔓";
      button.setAttribute("aria-pressed", "false");
      button.style.background = "";
      button.style.color = "";
    });
  }
}
