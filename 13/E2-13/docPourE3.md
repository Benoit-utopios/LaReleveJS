
html ligne 43 : onclick="closeModal()" => permets de fermer la modal. => retire la class 'active'.

- faire la fonction "openModal()" => ajoute la class 'active' a la modal une fois de la formulaire envoyé.

- pour la fonction de vérification de l'adresse mail et gestion de l'affichage de l'erreur =>
    - si adresse invalide :
        - mettre display en block pour la class 'errorMessage'
        - ajouter la class 'error' à 'emailImput'.
    - et prévoir également dans le cas l'addresse est valide (pour gérer la validation après un refus pour le style) :
        - mettre le display en 'none' pour la class 'errorMessage'
        - retirer la class 'error' à 'emailInput'.



J'ai fais un footer et un header en cas de besoin il faut retirer la ligne "display" dans le css.