# PASSATION

## Ce qui a été fait pendant cette étape
Étape 1 

    Cahier des charges manquant ? 
    Wireframe/maquette basique.

Étape 2 – Intégration (OK)

    HTML/CSS responsive (desktop/mobile).

    Formulaire centré avec input mail + bouton soumission.

    Modale de confirmation.

    Page privacy.html propre et lisible.

Étape 3 - Interactivité (OK)

    Arborescence du projet changée : 

    ├─ html
    │   └─ index.html          # Page d’accueil avec formulaire
    │   └─ privacy.html        # Page politique de confidentialité
    ├─ css/
    │   └─ style.css           # Tous les styles (clair/sombre, responsive…)
    │ 
    ├─ js/
    │   └─ main.js            # Validation email, modale, dark mode


    Ce qui est fait : 

        - Ajout de la page privacy.html : Contient la politique de confidentialité (explication de la collecte et l’utilisation des emails, droits utilisateurs, durée de conservation, sécurité).

        - Validation email côté client (regex robuste) :

            Invalide → affiche #errorMessage + classe .error sur l’input.

            Valide → cache l’erreur, ouvre la modale, reset du formulaire.

        - Modale :

            openModal() / closeModal() (fermeture via bouton, clic overlay, Esc).

            Focus renvoyé sur l’input après fermeture.

        - Dark mode (slider) :

            Toggle en header (index & privacy).

            Classe body.dark + palette dédiée.

            Persistance en localStorage (theme = 'dark'|'light').

            Prend en compte prefers-color-scheme: dark.

        - Accessibilité :

            aria-live="polite" recommandé sur le message d’erreur (présent si activé).

            Focus visible, contrastes OK.

## Ce qui reste à faire / priorités
- Etape 4

## Choix / hypothèses faites
- …

## Problèmes connus
- …
