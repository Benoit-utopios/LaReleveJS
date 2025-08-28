document.addEventListener('DOMContentLoaded', () => {
    // Variables globales
    let cards = [];
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let attempts = 0;
    let matchedPairs = 0;
    let startTime;
    let timerInterval;
    let gameStarted = false;

    // Éléments du DOM
    const triesElement = document.getElementById('tries');
    const timeElement = document.getElementById('time');
    const restartButton = document.getElementById('restart');
    const victoryMessage = document.getElementById('victory-message');
    const gameBoard = document.querySelector('.game-board');

    // Initialisation du jeu
    function initGame() {
        // Réinitialiser les variables
        attempts = 0;
        matchedPairs = 0;
        hasFlippedCard = false;
        lockBoard = false;
        gameStarted = false;
        clearInterval(timerInterval);
        timeElement.textContent = '0';
        triesElement.textContent = '0';
        victoryMessage.style.display = 'none';

        // Créer et mélanger les cartes
        cards = Array.from(document.querySelectorAll('.card'));
        shuffleCards();

        // Réinitialiser l'état des cartes
        cards.forEach(card => {
            card.classList.remove('flipped', 'matched');
            card.addEventListener('click', flipCard);
        });
    }

    // Mélanger les cartes
    function shuffleCards() {
        cards.forEach(card => {
            const randomPos = Math.floor(Math.random() * cards.length);
            card.style.order = randomPos;
        });
    }

    // Retourner une carte
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        if (this.classList.contains('matched')) return;

        // Démarrer le timer au premier clic
        if (!gameStarted) {
            startTimer();
            gameStarted = true;
        }

        this.classList.add('flipped');

        if (!hasFlippedCard) {
            // Premier clic
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        // Deuxième clic
        secondCard = this;
        attempts++;
        triesElement.textContent = attempts;

        checkForMatch();
    }

    // Vérifier si les cartes correspondent
    function checkForMatch() {
        const isMatch = firstCard.querySelector('.back img').src === secondCard.querySelector('.back img').src;

        isMatch ? disableCards() : unflipCards();
    }

    // Désactiver les cartes si elles correspondent
    function disableCards() {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        matchedPairs++;

        if (matchedPairs === 12) {
            endGame();
        }

        resetBoard();
    }

    // Retourner les cartes si elles ne correspondent pas
    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');

            resetBoard();
        }, 1000);
    }

    // Réinitialiser le plateau après chaque tour
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    // Démarrer le timer
    function startTimer() {
        startTime = new Date();
        timerInterval = setInterval(() => {
            const currentTime = new Date();
            const elapsedTime = Math.floor((currentTime - startTime) / 1000);
            timeElement.textContent = elapsedTime;
        }, 1000);
    }

    // Terminer le jeu
    function endGame() {
        clearInterval(timerInterval);
        const finalTime = timeElement.textContent;

        // Afficher le message de victoire
        victoryMessage.innerHTML = `
      <h2>Bravo ! Vous avez gagné !</h2>
      <p>Temps: ${finalTime} secondes</p>
      <p>Nombre de tentatives: ${attempts}</p>
    `;
        victoryMessage.style.display = 'block';
    }

    // Événements
    restartButton.addEventListener('click', initGame);

    // Initialiser le jeu au chargement
    initGame();
});