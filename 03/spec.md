# Cahier des charges (spec.md)

## Objectifs clés
-Référencer des « nanars » pour les partager et les noter.
-Permettre aux utilisateurs de créer une fiche (titre, affiche, description courte, tags).
-Possibilité de mettre une notation simple (étoiles ou /5) et des commentaires.


## Fonctionnalités
- Page d’accueil avec liste des nanars (carte = image, titre, note moyenne, tags).

- Page détail d’un nanar : affiche, synopsis court, note moyenne, boutons “noter”, zone commentaires.

- Formulaire "Poster son nanar” : titre, année, image (URL), description (max ~300 caractères), tags.

- Recherche/filtre (par tag + saisie libre sur le titre).

- Système de notation (1–5) ; un utilisateur peut mettre 1 note par film sans authentification.

- Commentaires courts (max 300 caractères).

- Persistance en localstorage en JSON des nanar (url image,titre, note moyenne, tags).

- Gestion d’erreurs sur image manquante et champs requis.

## Contraintes techniques
- desktop first (on s'embête pas).
- les etoiels pour avis peuvent être des icon ou juste une note /5

## Données (exemples)
- {
  "films": [
    {
      "id": "film_001",
      "title": "Sharknado",
      "year": 2013,
      "imageUrl": "www.allocine.fr/film/fichefilm-222634/photos/detail/?cmediafile=9001704734",
      "description": "Des tornades remplies de requins qui attaquent!",
      "tags": ["catastrophe", "requins"],
      "ratings": [
        { "userId": "u_tmp_1", "value": 1 },
        { "userId": "u_tmp_2", "value": 5 }
      ],
      "comments": [
        {
          "id": "c_001",
          "userId": "u_tmp_3",
          "text": "omg c'est nul!",
          "createdAt": "2025-08-28T09:30:00Z"
        }
      ]
    }
  ],
  "users": [
    { "id": "u_tmp_1", "displayName": "Invité 1" },
    { "id": "u_tmp_2", "displayName": "Invité 2" }
  ]
}
.
