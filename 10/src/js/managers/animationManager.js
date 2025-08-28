// Gestionnaire des animations
export class AnimationManager {
  // Animation de changement de couleur sur un swatch
  static animateColorChange(swatch) {
    const colorElement = swatch.querySelector(".swatch__color");
    if (!colorElement) return;

    colorElement.style.transform = "scale(0.95)";
    colorElement.style.filter = "brightness(1.2)";

    setTimeout(() => {
      colorElement.style.transform = "scale(1)";
      colorElement.style.filter = "brightness(1)";
    }, 200);
  }

  // Animation de génération globale
  static animateGeneration(currentView, lockedColors = new Set()) {
    const generateBtn = document.getElementById("generate");
    if (generateBtn) {
      generateBtn.style.transform = "scale(0.95)";

      setTimeout(() => {
        generateBtn.style.transform = "scale(1)";
      }, 100);
    }

    if (currentView === "palette") {
      this.animateSwatches(lockedColors);
    }
  }

  // Animation des swatches lors de la génération
  static animateSwatches(lockedColors) {
    const swatches = document.querySelectorAll(".swatch");
    swatches.forEach((swatch, index) => {
      setTimeout(() => {
        if (!lockedColors.has(index)) {
          swatch.style.transform = "translateY(-5px)";
          setTimeout(() => {
            swatch.style.transform = "translateY(0)";
          }, 150);
        }
      }, index * 50);
    });
  }

  // Animation de transition de vue
  static animateViewTransition(element, callback, delay = 200) {
    element.style.opacity = "0";
    element.style.transform = "translateY(10px)";

    setTimeout(() => {
      callback();
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, delay);
  }

  // Animation de bouton au hover
  static setupButtonHoverAnimation(button) {
    const originalTransform = button.style.transform || "none";

    button.addEventListener("mouseenter", () => {
      button.style.transform = "translateY(-1px)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = originalTransform;
    });
  }
}
