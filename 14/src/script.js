document.addEventListener("DOMContentLoaded", () => {
  const addCardButtons = document.querySelectorAll(".add-card");

  addCardButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const list = button.closest(".list");
      const cardsContainer = list.querySelector(".cards");

      const taskText = prompt("Entrez le nom de la tâche :");
      if (!taskText || taskText.trim() === "") return;

      const card = document.createElement("div");
      card.classList.add("card");

      // Titre
      const taskContent = document.createElement("span");
      taskContent.textContent = taskText;
      card.appendChild(taskContent);

    
      // Bouton Modifier
      const editBtn = document.createElement("button");
      editBtn.textContent = "Modifier";
      editBtn.classList.add("edit-card");
      editBtn.addEventListener("click", () => {
        const newTaskText = prompt(
          "Modifier le nom de la tâche :",
          taskContent.textContent
        );
        if (newTaskText && newTaskText.trim() !== "") {
          taskContent.textContent = newTaskText;
        }
      });
      card.appendChild(editBtn);

      // Bouton Déplacer
      const allLists = document.querySelectorAll(".list");
      let currentIndex = Array.from(allLists).indexOf(list);

      if (currentIndex < allLists.length - 1) {
        const moveBtn = document.createElement("button");
        moveBtn.textContent = "Déplacer";
        moveBtn.classList.add("move-card");
        moveBtn.addEventListener("click", () => {
          const nextList = allLists[currentIndex + 1];
          const nextCardsContainer = nextList.querySelector(".cards");
          nextCardsContainer.appendChild(card);
          currentIndex++;
          if (currentIndex === allLists.length - 1) {
            moveBtn.style.display = "none";
          }
        });
        card.appendChild(moveBtn);
      }

      // Bouton Supprimer
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Supprimer";
      deleteBtn.classList.add("delete-card");
      deleteBtn.addEventListener("click", () => {
        const confirmation = confirm(
          "Voulez-vous vraiment supprimer cette tâche ?"
        );
        if (confirmation) {
          card.remove();
        }
      });
      card.appendChild(deleteBtn);

      cardsContainer.appendChild(card);
    });
  });
});
