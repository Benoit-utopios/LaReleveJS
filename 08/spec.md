# Cahier des charges (spec.md)

## Objectifs clés
- Concevoir une application web permettant de suivre ses performances sportives.
- Fournir une interface claire et visuelle (dashboard) avec des statistiques et des graphiques.
- Permettre l’ajout et la gestion d’entraînements (course, vélo, musculation, etc.).


---

## Fonctionnalités

- **Authentification simple et obligatoire**
- **Formulaire d'inscription**
- **Dashboard récapitulatif** : 
  - Nombre total de séances.
  - Distance parcourue.
  - Temps total d’activité.
  - Calories brûlées.
- **Graphiques interactifs** : évolution hebdomadaire/mensuelle.
- **Historique des entraînements** (tableau listant les séances passées).
- **Ajout manuel d’un entraînement**
    - Durée
    - Date
    - Calories brûlées
    - Sport (possibilité d'en ajouter si pas dans la liste pré-définie).
    - Notes
    - KM parcourue
    - RPE (Rate of Perceived Exertion)
- **Filtres par activité** (Tous, Course, Vélo, Musculation ...).
- **Responsive design** (mobile et desktop).
- **Mobile first**

---

## Contraintes techniques
- **Front-end :** HTML, CSS, JavaScript puis TypeScript.

- **Stockage des données :** 
  - JSON local pour le prototype.

- **Compatibilité :** navigateurs modernes (Chrome, Firefox, Edge, Safari).

- **Accessibilité :**
  - Contrastes respectés (WCAG niveau AA).
  - Navigation clavier possible.
  - Niveau AA WCAG.

- **Charte graphique**
    - primary-blue: #2563EB;
    - primary-green: #16A34A
    - accent-orange: #F97316;
    - accent-purple: #7C3AED;
    - neutral-dark: #1E293B;
    - neutral-medium: #64748B;
    - neutral-light: #F1F5F9;
    - white: #FFFFFF;
---
## Pages
- Home/Connexion
- Inscription
- Tableau de bord
- Historique des entrainements avec filtres
- Formulaire d'ajout d'entrainement

---
## Données (exemples)

### Exemple de structure JSON
```json
{
  "utilisateur": {
    "id": 1,
    "nom": "Alex",
    "email": "alex@example.com"
  },
  "entrainements": [
    {
      "id": 101,
      "date": "2025-08-24",
      "sport": "Course",
      "duree": 45,
      "distance": 10,
      "calories": 600,
      "notes": "Bonne séance, allure régulière",
      "RPE": 6
    },
    {
      "id": 102,
      "date": "2025-08-22",
      "sport": "Vélo",
      "duree": 80,
      "distance": 32,
      "calories": 900,
      "notes": "Sortie difficile, beaucoup de vent",
      "RPE" : 9
    },
    {
      "id": 103,
      "date": "2025-08-20",
      "sport": "Musculation",
      "duree": 50,
      "distance": null,
      "calories": 450,
      "notes": "Séance haut du corps",
      "RPE": 5
    }
  ]
}
