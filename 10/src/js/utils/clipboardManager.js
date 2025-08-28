// Gestionnaire du presse-papier
export class ClipboardManager {
  // Copie moderne dans le presse-papier
  static async copyToClipboard(text, button) {
    try {
      await navigator.clipboard.writeText(text);
      this.showCopySuccess(button);
    } catch (err) {
      this.fallbackCopyToClipboard(text, button);
    }
  }

  // Méthode de fallback pour anciens navigateurs
  static fallbackCopyToClipboard(text, button) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
      this.showCopySuccess(button);
    } catch (err) {
      this.showCopyError(button);
    } finally {
      document.body.removeChild(textArea);
    }
  }

  // Affichage du succès de copie
  static showCopySuccess(button) {
    const originalText = button.textContent;
    button.textContent = "Copié !";
    button.style.background = "var(--success)";
    button.style.color = "white";

    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = "";
      button.style.color = "";
    }, 1500);
  }

  // Affichage d'erreur de copie
  static showCopyError(button) {
    const originalText = button.textContent;
    button.textContent = "Erreur";
    button.style.background = "var(--danger)";
    button.style.color = "white";

    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = "";
      button.style.color = "";
    }, 1500);
  }
}
