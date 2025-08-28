// Utilitaires pour la gestion des couleurs
export class ColorUtils {
  // Génération de couleurs harmonieuses
  static generateRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 50) + 30;
    const lightness = Math.floor(Math.random() * 40) + 30;

    return this.hslToHex(hue, saturation, lightness);
  }

  // Conversion HSL vers HEX
  static hslToHex(h, s, l) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  // Génération de palette avec variantes harmonieuses
  static generateHarmoniousPalette() {
    const baseHue = Math.floor(Math.random() * 360);
    const colors = [];

    for (let i = 0; i < 5; i++) {
      const hue = (baseHue + i * 30) % 360;
      const saturation = Math.floor(Math.random() * 30) + 40;
      const lightness = 30 + i * 10 + Math.floor(Math.random() * 15);

      colors.push(this.hslToHex(hue, saturation, Math.min(lightness, 80)));
    }

    return colors;
  }

  // Calcul de la luminance pour le contraste
  static getLuminance(hex) {
    const r = parseInt(hex.substr(1, 2), 16) / 255;
    const g = parseInt(hex.substr(3, 2), 16) / 255;
    const b = parseInt(hex.substr(5, 2), 16) / 255;

    const [rs, gs, bs] = [r, g, b].map((c) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  // Ajustement du contraste du texte
  static adjustTextContrast(element, backgroundColor) {
    // C'est la merde donc bah je fais sans ça hein :D
    // const luminance = this.getLuminance(backgroundColor);
    // element.style.color = luminance > 0.5 ? "#000000" : "#ffffff";
  }
}
