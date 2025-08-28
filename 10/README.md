# Projet Palette Generator(anonyme)

## Contexte
Ce projet est une application web simple (Single Page Application) dont le but est de générer des palettes de couleurs harmonieuses de manière aléatoire. Il s'adresse aux designers, développeurs, et créatifs cherchant de l'inspiration rapide pour leurs projets. L'interface se veut minimale et centrée sur l'essentiel : la découverte de couleurs et la copie facile de leurs codes.

## Objectifs
- [ ] **Génération :** Générer une palette de 5 couleurs aléatoires via un bouton et la barre d'espace.
- [ ] **Affichage :** Afficher le code hexadécimal correspondant sous chaque aplat de couleur.
- [ ] **Copie :** Permettre la copie du code hexadécimal dans le presse-papier en un clic.
- [ ] **Verrouillage :** Implémenter une fonction de "verrouillage" pour conserver une couleur lors de la génération suivante.
- [ ] **Animations :** Ajouter des animations lors de la génération de la palette (JS ou CSS).
- [ ] **Gestion des erreurs :** Prévoir une gestion des erreurs (ex: échec de la copie dans le presse-papier).
- [ ] **Thème Sombre :** Intégrer un "Dark Mode" pour améliorer le confort visuel.


## Lancer le projet 

Le projet à cette étape est une page web statique (HTML/CSS). Il n'y a pas de build `npm` nécessaire.

* **Méthode simple :**
    Faites un clic droit sur le fichier `index.html` et ouvrez-le avec votre navigateur (Chrome, Firefox, etc.).

* **Méthode recommandée pour le développement :**
    Utilisez l'extension **"Live Server"** pour Visual Studio Code. Une fois installée, faites un clic droit sur le fichier `index.html` et choisissez "Open with Live Server". La page s'ouvrira dans votre navigateur et se rechargera automatiquement à chaque modification.

Pour avoir un aperçu des changements en temps réel, vous pouvez utiliser Live Server(Five server). C'est une extension similaire à Live server mais tout changement se fait en temps réel sans forcément avoir besoin de sauvegarder. 
* Voici le lien :
- https://marketplace.visualstudio.com/items?itemName=yandeu.five-server



## Evolutions futures

**Navigation (Undo/Redo) :** Ajouter la possibilité d'annuler la dernière génération de palette pour ne pas perdre une combinaison intéressante par erreur.
**Historique et Sauvegarde :** Permettre de sauvegarder les palettes favorites dans le navigateur (`localStorage`) et de leur donner un nom.
