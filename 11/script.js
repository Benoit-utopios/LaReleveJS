
// récupération des éléments du DOM
const destinataireInput = document.querySelector('input[placeholder="entre le nom du destinataire"]');
const emissaireInput = document.querySelector('input[placeholder="entre ton nom"]');
const imageSelect = document.getElementById('image-selection');
const btnSubmit = document.getElementById("submit");

// les éléments qui affichent
const containerCard = document.getElementById("card")
const destinataireText = document.getElementById("destinataire")
const emissaireText = document.getElementById('emissaire')
const cardImage = document.querySelector('#card img');

// bouton de validation
btnSubmit.addEventListener("click", () => {
    const destinataire = destinataireInput.value.trim();
    const emissaire = emissaireInput.value.trim();
    const imageChoisie = imageSelect.value;

    destinataireText.textContent = "Pour toi : " + destinataire;
    emissaireText.textContent =  "De la part de : " + emissaire;

    // charger l’image choisi
    let imagePath = "";
    if (imageChoisie === "star") {
        imagePath = "./assets/img/star.png";
    } else if (imageChoisie === "heart") {
        imagePath = "./assets/img/heart.png";
    } else if (imageChoisie === "flame-thrower") {
        imagePath = "./assets/img/flame-thrower.png";
    }

    cardImage.src = imagePath;

    containerCard.style.display= "block";
});
