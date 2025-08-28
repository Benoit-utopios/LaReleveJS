// src/app/index.ts
document.addEventListener('DOMContentLoaded', () => {
  // ===== Helpers typés =====
  const byId = <T extends HTMLElement>(id: string): T => {
    const el = document.getElementById(id);
    if (!el) throw new Error(`Missing #${id}`);
    return el as T;
  };
  const qs = <T extends Element>(sel: string, root: ParentNode = document): T => {
    const el = root.querySelector(sel);
    if (!el) throw new Error(`Missing selector ${sel}`);
    return el as T;
  };

  type CardEl = HTMLDivElement; // .card (peut être affiné si besoin)
  const getCardKey = (card: CardEl): string => {
    // clé d’égalité: src de l'image au dos (comme ton implémentation d'origine)
    const img = card.querySelector<HTMLImageElement>('.back img');
    return img?.src ?? '';
  };

  // ===== Éléments du DOM =====
  const triesElement = byId<HTMLElement>('tries');
  const timeElement = byId<HTMLElement>('time');
  const restartButton = byId<HTMLButtonElement>('restart');
  const victoryMessage = byId<HTMLElement>('victory-message');
  const gameBoard = qs<HTMLElement>('.game-board');

  // ===== État de jeu =====
  let cards: CardEl[] = [];
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard: CardEl | null = null;
  let secondCard: CardEl | null = null;
  let attempts = 0;
  let matchedPairs = 0;
  let totalPairs = 0;

  let startTime = 0;
  let timerInterval: number | null = null;
  let gameStarted = false;

  // ===== Init =====
  function initGame(): void {
    attempts = 0;
    matchedPairs = 0;
    hasFlippedCard = false;
    lockBoard = false;
    gameStarted = false;
    if (timerInterval !== null) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    timeElement.textContent = '0';
    triesElement.textContent = '0';
    victoryMessage.style.display = 'none';

    // Récupérer + mélanger
    cards = Array.from(document.querySelectorAll<HTMLDivElement>('.card'));
    totalPairs = Math.floor(cards.length / 2);

    shuffleCards();

    // Reset visuel + (ré)abonner les handlers
    cards.forEach((card) => {
      card.classList.remove('flipped', 'matched');
      card.style.removeProperty('order');
      card.addEventListener('click', handleCardClick);
    });
  }

  function shuffleCards(): void {
    // Mélange simple via l'ordre CSS
    cards.forEach((card) => {
      const randomPos = Math.floor(Math.random() * cards.length);
      (card.style as CSSStyleDeclaration).order = String(randomPos);
    });
  }

  // ===== Handlers =====
  function handleCardClick(e: MouseEvent): void {
    if (lockBoard) return;

    const card = e.currentTarget as CardEl;

    if (card === firstCard) return;
    if (card.classList.contains('matched')) return;

    // Démarrer le timer au premier clic
    if (!gameStarted) {
      startTimer();
      gameStarted = true;
    }

    card.classList.add('flipped');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = card;
      return;
    }

    // Deuxième clic
    secondCard = card;
    attempts++;
    triesElement.textContent = String(attempts);
    checkForMatch();
  }

  function checkForMatch(): void {
    if (!firstCard || !secondCard) return;
    const isMatch = getCardKey(firstCard) === getCardKey(secondCard);
    isMatch ? disableCards() : unflipCards();
  }

  function disableCards(): void {
    if (!firstCard || !secondCard) return;

    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    // Important: même référence de handler
    firstCard.removeEventListener('click', handleCardClick);
    secondCard.removeEventListener('click', handleCardClick);

    matchedPairs++;
    if (matchedPairs === totalPairs) {
      endGame();
    }
    resetBoard();
  }

  function unflipCards(): void {
    lockBoard = true;

    setTimeout(() => {
      firstCard?.classList.remove('flipped');
      secondCard?.classList.remove('flipped');
      resetBoard();
    }, 1000);
  }

  function resetBoard(): void {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
  }

  // ===== Timer =====
  function startTimer(): void {
    startTime = Date.now();
    timerInterval = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      timeElement.textContent = String(elapsed);
    }, 1000);
  }

  function endGame(): void {
    if (timerInterval !== null) {
      window.clearInterval(timerInterval);
      timerInterval = null;
    }
    const finalTime = timeElement.textContent ?? '0';
    victoryMessage.innerHTML = `
      <h2>Bravo ! Vous avez gagné !</h2>
      <p>Temps: ${finalTime} secondes</p>
      <p>Nombre de tentatives: ${attempts}</p>
    `;
    victoryMessage.style.display = 'block';
  }

  // ===== Wiring =====
  restartButton.addEventListener('click', initGame);
  initGame();
});
