// Configuration de l'application
export const AppConfig = {
  // Version de l'application
  version: "1.0.0",

  // Configuration des couleurs par défaut
  colors: {
    defaultPalette: ["#000000", "#333333", "#666666", "#999999", "#CCCCCC"],
    paletteSize: 5,
  },

  // Configuration des animations
  animations: {
    colorChangeDelay: 200,
    generationDelay: 100,
    viewTransitionDelay: 200,
    swatchAnimationStagger: 50,
    feedbackDuration: 1500,
  },

  // Configuration du thème
  theme: {
    storageKey: "darkMode",
    togglePosition: { top: "20px", right: "20px" },
    toggleSize: "44px",
  },

  // Configuration des raccourcis clavier
  shortcuts: {
    generate: ["Space"],
    regenerate: ["KeyR"],
    clearLocks: ["KeyC"],
    goHome: ["Escape"],
    lockColors: ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5"],
  },

  // Messages utilisateur
  messages: {
    copySuccess: "Copié !",
    copyError: "Erreur",
    beforeUnload:
      "Vous avez des couleurs verrouillées. Êtes-vous sûr de vouloir quitter ?",
    browserWarning:
      "Certaines fonctionnalités avancées peuvent ne pas être disponibles sur ce navigateur.",
    loadError: "Erreur lors de l'initialisation de l'application",
  },

  // Configuration des images
  images: {
    visualsPath: "public/img/",
    visualsCount: 5,
    avatarPath: "public/img/pic.png",
    socialIcons: {
      twitter: "public/img/twitter.png",
      instagram: "public/img/insta.png",
      github: "public/img/github.png",
    },
  },

  // Configuration de développement
  dev: {
    enableDebugMode: false,
    enableConsoleMessages: true,
    exposeGlobalApp: true,
  },
};
