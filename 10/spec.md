# Cahier des charges (spec.md)

## Objectifs clés
- Fournir aux utilisateurs un outil simple et rapide pour découvrir des palettes de couleurs harmonieuses.
- Permettre une utilisation immédiate des couleurs trouvées grâce à une fonctionnalité de copie rapide.
- Offrir une expérience utilisateur fluide et agréable, sans fonctionnalités superflues.

## Fonctionnalités

1.  **Génération de la palette**
    - Au chargement de la page, une palette initiale de 5 couleurs est affichée.
    - La génération d'une nouvelle palette est déclenchée par :
        - Un clic sur le bouton "Generate Palette".
        - Un appui sur la touche "Espace" du clavier.

2.  **Affichage des informations**
    - La palette est composée de 5 couleurs distinctes.
    - Le code hexadécimal de chaque couleur est affiché visiblement, probablement sous l'aplat de couleur correspondant.

3.  **Interaction utilisateur**
    - Un clic sur une couleur (ou son code) copie le code hexadécimal dans le presse-papier.

4.  **Fonctionnalité Bonus (Verrouillage)**
    - L'utilisateur peut "verrouiller" une ou plusieurs couleurs de la palette.
    - Les couleurs verrouillées ne sont pas modifiées lors de la génération d'une nouvelle palette.

## Contraintes techniques
- **HTML/CSS (Étape 2) :** Le projet doit être réalisé en **HTML5 et CSS3 purs** ("vanilla"). L'utilisation de frameworks (Bootstrap, Tailwind, etc.) est autorisée. La structure doit être sémantique.
- **JavaScript (Étape 3) :** L'interactivité doit être développée en **JavaScript pur** ("vanilla"). L'utilisation de librairies ou frameworks (jQuery, React, Vue, etc.) est interdite.
- **TypeScript (Étape 4) :** Le projet JS devra être migré vers TypeScript en assurant un typage strict et cohérent.
- **Compatibilité :** Le site doit être fonctionnel sur les dernières versions des navigateurs modernes (Chrome, Firefox, Edge).
- **Accessibilité :** Le projet doit respecter les bonnes pratiques (navigation au clavier fonctionnelle, contrastes de couleurs suffisants pour le texte).

## Données (exemples)

La palette de couleurs peut être représentée en mémoire comme un tableau d'objets. Chaque objet représente une couleur et contient son code ainsi que son état de verrouillage.

**Exemple de structure de données pour la palette :**
```json
[
  {
    "code": "#1a535c",
    "locked": false
  },
  {
    "code": "#4ecdc4",
    "locked": true
  },
  {
    "code": "#f7fff7",
    "locked": false
  },
  {
    "code": "#ff6b6b",
    "locked": false
  },
  {
    "code": "#ffe66d",
    "locked": true
  }
]