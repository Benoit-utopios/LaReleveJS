# Projet (anonyme)

## Contexte
L’entreprise souhaite développer une application web de type dashboard dédiée au suivi de la santé et de la productivité. Ce projet a pour objectif de proposer une interface simple et intuitive permettant de visualiser différents indicateurs fictifs tels que le nombre de pas réalisés, la durée de sommeil ou encore un score global de productivité. L’application s’adresse à un public individuel désireux de mieux comprendre et analyser ses habitudes quotidiennes à travers une présentation synthétique et structurée des données.

## Objectifs
- [ ] Le projet HealthBoard a pour finalité de :
- [ ] Centraliser les informations clés liées à la santé et à la productivité de l’utilisateur au sein d’une interface unique et intuitive.
- [ ] Offrir une visualisation claire et structurée des données fictives (nombre de pas, sommeil, productivité) à travers des indicateurs et représentations graphiques.

Permettre un suivi global et synthétique des habitudes quotidiennes afin d’identifier les tendances et améliorer la compréhension du mode de vie de l’utilisateur.

## Structures
l’application HealthBoard repose sur 4 pages principales :

- Connexion / Inscription
- Tableau de bord (accueil)
- Données détaillées
- Profil utilisateur

## Pages attendues et fonctionnalités

### 3.1 Page de connexion / inscription

- F001 : Permettre à l’utilisateur de se connecter avec un identifiant et un mot de passe.

- F002 : Offrir la possibilité de créer un compte (fictif) avec des informations basiques (nom, email, mot de passe).

###  3.2 Page d’accueil / Tableau de bord

- F003 : Afficher les indicateurs clés (nombre de pas, heures de sommeil moyennes, score de productivité).

- F004 : Présenter des graphiques récapitulatifs :

    - courbe d’évolution du sommeil sur 7 jours,
    - histogramme des pas quotidiens,
    - camembert de répartition des activités hebdomadaires.

- F005 : Offrir une vue synthétique permettant de comparer les résultats par jour.

### 3.3 Page “Données détaillées”

- F006 : Afficher un tableau listant les données quotidiennes (jour, pas, sommeil, activité principale).

- F007 : Permettre à l’utilisateur de consulter ses résultats jour par jour de manière plus granulaire.

###  3.4 Page “Profil utilisateur”

- F008 : Présenter les informations fictives de l’utilisateur (nom, email).

- F009 : Afficher des objectifs paramétrés (exemple : objectif de pas/jour, objectif d’heures de sommeil).

---

##  Données attendues

L’application **HealthBoard** reposera sur des données fictives organisées en trois grandes catégories :

### 4.1 Données de santé

* **Nombre de pas quotidiens** (exemple : 7 800 pas un lundi, objectif 10 000)
* **Durée de sommeil** (en heures et minutes, ex. 7h45)
* **Moyenne hebdomadaire de sommeil**

### 4.2 Données de productivité

* **Score global de productivité** (exprimé en pourcentage)
* **Répartition hebdomadaire des activités** (exemple : Travail 50 %, Sport 25 %, Repos 15 %, Autres 10 %)

### 4.3 Données récapitulatives

* **Tableau hebdomadaire** présentant :

    * Jour de la semaine
    * Nombre de pas réalisés
    * Heures de sommeil enregistrées
    * Activité principale du jour

---

Exemple de données fictives :

| Jour     | Pas    | Sommeil | Activité principale |
| -------- | ------ | ------- | ------------------- |
| Lundi    | 7 800  | 6h30    | Travail             |
| Mardi    | 9 200  | 8h10    | Travail             |
| Mercredi | 10 300 | 7h45    | Sport               |
| Jeudi    | 6 500  | 6h50    | Travail             |
| Vendredi | 8 000  | 7h20    | Repos               |
| Samedi   | 12 000 | 8h00    | Sport               |
| Dimanche | 11 500 | 7h55    | Repos               |

---

## Contraintes

### 5.1 Contraintes ergonomiques

* L’interface doit être **claire, intuitive et lisible** pour un utilisateur non expert.
* Les informations doivent être **hiérarchisées** : indicateurs clés en premier, puis graphiques, puis données détaillées.
* Le design doit rester **minimaliste**, sans surcharge visuelle.
* L’application doit être **responsive** : utilisable aussi bien sur ordinateur que sur tablette ou mobile.

---

### 5.2 Contraintes techniques

* Les données sont **fictives et statiques** : aucune collecte réelle auprès de capteurs ou d’API.
* L’application doit être conçue de manière à pouvoir, si nécessaire, être connectée plus tard à une base de données réelle.
* Les graphiques doivent être affichés sous une forme **simple et standardisée** (courbes, barres, camemberts).
* Le tableau récapitulatif doit permettre une **lecture horizontale claire** (jour par jour).

---

### 5.3 Contraintes de cohérence

* Un **vocabulaire homogène** doit être utilisé à travers toute l’application (mêmes termes, mêmes intitulés).
* La **navigation** doit être simple et réduire au minimum le nombre de clics nécessaires pour accéder aux informations essentielles.
* Les **indicateurs fictifs** doivent rester cohérents entre les différentes pages (par exemple, la moyenne de sommeil affichée sur le tableau de bord doit correspondre aux données du tableau récapitulatif).

---

## Livrables attendus

À l’issue du projet, les livrables suivants sont attendus :

1. **Une application web fonctionnelle (fictive)**

    * Composée des pages définies (connexion, tableau de bord, données détaillées, profil utilisateur).
    * Intégrant les indicateurs clés, graphiques et tableau récapitulatif.
    * Données fictives intégrées directement dans l’application.

2. **Une documentation utilisateur simple**

    * Présentation des différentes pages.
    * Explication des indicateurs affichés et de leur interprétation.

3. **Une documentation technique minimale**

    * Organisation générale du projet.
    * Description des données utilisées (structure, format).
    * Références pour une éventuelle évolution vers des données réelles.

---

## Lancer le projet
```bash
# Si vous créez un projet npm
npm i
npm run dev
```

## Notes pour le/la suivant·e
(Choix techniques, points flous, idées de suite, pièges à éviter.)
