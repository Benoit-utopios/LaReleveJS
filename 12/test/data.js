// ===============================
// Fichier : data.js
// ===============================

export const recettes = [
    //  Top recettes
    {
        titre: "Poulet rôti au thym",
        description: "Un classique croustillant, parfumé aux herbes.",
        image: "https://recettes100faim.fr/wp-content/uploads/2021/05/recettes100faim-poulet-roti-thym-olive-citron-ail.jpg",
        ingredients: ["Poulet entier", "Thym", "Ail", "Huile d'olive", "Sel", "Poivre"],
        temps: "1h30",
        note: 4.8,
        categorie: "Top recettes"
    },
    {
        titre: "Gratin dauphinois",
        description: "Pommes de terre fondantes à la crème et au fromage.",
        image: "https://recettes100faim.fr/wp-content/uploads/2021/05/recettes100faim-poulet-roti-thym-olive-citron-ail.jpg",
        ingredients: ["Pommes de terre", "Crème", "Lait", "Ail", "Muscade", "Gruyère"],
        temps: "1h10",
        note: 4.6,
        categorie: "Top recettes"
    },
    {
        titre: "Tarte aux pommes",
        description: "Dessert rustique et sucré, parfait pour l'automne.",
        image: "https://recettes100faim.fr/wp-content/uploads/2021/05/recettes100faim-poulet-roti-thym-olive-citron-ail.jpg",
        ingredients: ["Pâte brisée", "Pommes", "Sucre", "Beurre", "Cannelle"],
        temps: "45 min",
        note: 4.7,
        categorie: "Top recettes"
    },
    {
        titre: "Bœuf bourguignon",
        description: "Plat mijoté au vin rouge, tendre et savoureux.",
        image: "https://recettes100faim.fr/wp-content/uploads/2021/05/recettes100faim-poulet-roti-thym-olive-citron-ail.jpg",
        ingredients: ["Bœuf", "Vin rouge", "Carottes", "Oignons", "Champignons", "Lardons"],
        temps: "3h",
        note: 4.9,
        categorie: "Top recettes"
    },
    {
        titre: "Quiche lorraine",
        description: "Une quiche généreuse aux lardons et à la crème.",
        image: "https://recettes100faim.fr/wp-content/uploads/2021/05/recettes100faim-poulet-roti-thym-olive-citron-ail.jpg",
        ingredients: ["Pâte brisée", "Lardons", "Œufs", "Crème", "Gruyère"],
        temps: "50 min",
        note: 4.5,
        categorie: "Top recettes"
    },

    //  Recettes faciles
    {
        titre: "Omelette aux fines herbes",
        description: "Rapide, simple et pleine de goût.",
        image: "https://recettes100faim.fr/wp-content/uploads/2021/05/recettes100faim-poulet-roti-thym-olive-citron-ail.jpg",
        ingredients: ["Œufs", "Persil", "Ciboulette", "Sel", "Poivre"],
        temps: "10 min",
        note: 4.3,
        categorie: "Recettes faciles"
    },
    {
        titre: "Salade composée",
        description: "Fraîcheur et couleurs dans l’assiette.",
        image: "https://recettes100faim.fr/wp-content/uploads/2021/05/recettes100faim-poulet-roti-thym-olive-citron-ail.jpg",
        ingredients: ["Laitue", "Tomates", "Maïs", "Œufs", "Vinaigrette"],
        temps: "15 min",
        note: 4.2,
        categorie: "Recettes faciles"
    },
    {
        titre: "Pâtes au pesto",
        description: "Un plat express aux saveurs méditerranéennes.",
        image: "https://recettes100faim.fr/wp-content/uploads/2021/05/recettes100faim-poulet-roti-thym-olive-citron-ail.jpg",
        ingredients: ["Pâtes", "Pesto", "Parmesan", "Pignons", "Basilic"],
        temps: "20 min",
        note: 4.4,
        categorie: "Recettes faciles"
    },
    {
        titre: "Croque-monsieur",
        description: "Grillé, fondant, et prêt en quelques minutes.",
        image: "https://recettes100faim.fr/wp-content/uploads/2021/05/recettes100faim-poulet-roti-thym-olive-citron-ail.jpg",
        ingredients: ["Pain de mie", "Jambon", "Fromage", "Beurre"],
        temps: "15 min",
        note: 4.1,
        categorie: "Recettes faciles"
    },
    {
        titre: "Soupe de légumes",
        description: "Réconfortante et facile à préparer.",
        image: "https://recettes100faim.fr/wp-content/uploads/2021/05/recettes100faim-poulet-roti-thym-olive-citron-ail.jpg",
        ingredients: ["Carottes", "Poireaux", "Pommes de terre", "Bouillon", "Sel"],
        temps: "40 min",
        note: 4.6,
        categorie: "Recettes faciles"
    },

    //  Recettes rapides
    {
        titre: "Wrap au poulet",
        description: "Idéal pour un déjeuner sur le pouce.",
        image: "https://recettes100faim.fr/wp-content/uploads/2021/05/recettes100faim-poulet-roti-thym-olive-citron-ail.jpg",
        ingredients: ["Tortilla", "Poulet", "Salade", "Tomates", "Sauce yaourt"],
        temps: "15 min",
        note: 4.3,
        categorie: "Recettes rapides"
    },
    {
        titre: "Smoothie banane-fraise",
        description: "Boisson fruitée et énergisante.",
        image: "https://recettes100faim.fr/wp-content/uploads/2021/05/recettes100faim-poulet-roti-thym-olive-citron-ail.jpg",
        ingredients: ["Banane", "Fraises", "Lait", "Miel"],
        temps: "5 min",
        note: 4.7,
        categorie: "Recettes rapides"
    },
    {
        titre: "Tacos express",
        description: "Garnis à la volée, prêts en 10 minutes.",
        image: "image/tacos.jpg",
        ingredients: ["Tortilla", "Bœuf haché", "Tomates", "Fromage", "Salade"],
        temps: "10 min",
        note: 4.2,
        categorie: "Recettes rapides"
    },
    {
        titre: "Œufs brouillés",
        description: "Simple, rapide et nourrissant.",
        image: "image/oeufs.jpg",
        ingredients: ["Œufs", "Beurre", "Sel", "Poivre"],
        temps: "7 min",
        note: 4.0,
        categorie: "Recettes rapides"
    },
    {
        titre: "Toasts avocat",
        description: "Tendance et délicieux en un clin d’œil.",
        image: "image/toast-avocat.jpg",
        ingredients: ["Pain", "Avocat", "Citron", "Sel", "Piment"],
        temps: "10 min",
        note: 4.5,
        categorie: "Recettes rapides"
    },

    //  Desserts
    {
        titre: "Mousse au chocolat",
        description: "Onctueuse et intense en cacao.",
        image: "image/mousse.jpg",
        ingredients: ["Chocolat", "Œufs", "Sucre", "Crème"],
        temps: "20 min + repos",
        note: 4.8,
        categorie: "Desserts"
    },
    {
        titre: "Clafoutis aux cerises",
        description: "Moelleux et fruité, un classique estival.",
        image: "image/clafoutis.jpg",
        ingredients: ["Œufs", "Farine", "Lait", "Cerises", "Sucre"],
        temps: "50 min",
        note: 4.6,
        categorie: "Desserts"
    },
    {
        titre: "Cookies maison",
        description: "Croquants à l’extérieur, fondants à l’intérieur.",
        image: "image/cookies.jpg",
        ingredients: ["Farine", "Beurre", "Sucre", "Œufs", "Pépites de chocolat"],
        temps: "25 min",
        note: 4.9,
        categorie: "Desserts"
    },
    {
        titre: "Tiramisu",
        description: "Crémeux et parfumé au café.",
        image: "image/tiramisu.jpg",
        ingredients: ["Mascarpone", "Œufs", "Sucre", "Café", "Biscuits"],
        temps: "30 min + repos",
        note: 4.7,
        categorie: "Desserts"
    },
    {
        titre: "Crème brûlée",
        description: "Dessert raffiné à la croûte caramélisée.",
        image: "image/creme-brulee.jpg",
        ingredients: ["Crème", "Œufs", "Sucre", "Vanille"],
        temps: "1h",
        note: 4.6,
        categorie: "Desserts"
    }
];