// Elements du DOM

const cells = document.querySelectorAll(".cell");
const grid = document.getElementById("grid");
const piecesCount = document.getElementById("piecesCount");
const timerDisplay = document.getElementById("timer");

// Variables pour la logique du jeu
let draggedIndex = null;
let cellsArray = Array.from(cells);
let rightAnswer = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

// Variables pour le timer
let secondsElapsed = 0;
let timerInterval = null;

// Fonction pour update le compteur de pièces
function updatePiecesCount() {
  const currentOrder = Array.from(grid.children).map((cell) => Number(cell.id));
  let correctCount = 0;

  currentOrder.forEach((val, index) => {
    if (val === rightAnswer[index]) {
      correctCount++;
    }
  });

  piecesCount.textContent = `${correctCount}/16`;
}
// Gestion du timer
function startTimer() {
  timerInterval = setInterval(() => {
    secondsElapsed++;

    const minutes = Math.floor(secondsElapsed / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (secondsElapsed % 60).toString().padStart(2, "0");

    timerDisplay.textContent = `${minutes}:${seconds}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

// Vérifiecation de la résolution du puzzle
function isSolved() {
  const currentOrder = Array.from(grid.children).map((cell) => Number(cell.id));
  return currentOrder.every((val, index) => val === rightAnswer[index]);
}

// On mélange tout sinon c'est pas drôle
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

window.addEventListener("DOMContentLoaded", () => {
  const shuffled = shuffleArray(cellsArray.slice());
  shuffled.forEach((cell) => grid.appendChild(cell));
  // J'ai mis le timer ici pour qu'il démarre au chargement de la page(oui, c'est pas propre, mais tant pis)
  startTimer();
});

// Ids générés dynamiquement (flemme du html)
for (let i = 0; i < cells.length; i++) {
  cells[i].id = `${i + 1}`;
}

// Evènements de drag and drop et click
cells.forEach((cell, index) => {
  cell.draggable = true;

  cell.addEventListener("dragstart", () => {
    draggedIndex = Array.from(grid.children).indexOf(cell);
  });

  cell.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  cell.addEventListener("drop", () => {
    const droppedIndex = Array.from(grid.children).indexOf(cell);

    const draggedCell = grid.children[draggedIndex];
    const droppedCell = grid.children[droppedIndex];

    if (draggedCell === droppedCell) return;

    const placeholder = document.createElement("div");
    grid.replaceChild(placeholder, draggedCell);
    grid.replaceChild(draggedCell, droppedCell);
    grid.replaceChild(droppedCell, placeholder);
    updatePiecesCount();
    if (isSolved()) {
      alert("Bravo champion");
      // arrêt du timer ici (non, c'est toujours pas propre)
      stopTimer();
    }
  });

  // Ca, c'était juste pour tester
  cell.addEventListener("click", () => {
    console.log(cell.id);
  });
});

// Positionnement de l'image de fond dans chaque case
const SIZE = 4;
cells.forEach((cell, index) => {
  const row = Math.floor(index / SIZE);
  const col = index % SIZE;

  const x = (col / (SIZE - 1)) * 100;
  const y = (row / (SIZE - 1)) * 100;
  cell.style.backgroundPosition = `${x}% ${y}%`;
});
