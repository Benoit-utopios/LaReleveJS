// ---------------- Dark Mode ----------------------------------------------
const root = document.documentElement;
const btnSwitch = document.getElementById("switch");

// ------------------ bouton toggle (switch) pour le mode thème dark/light -------------------
if (btnSwitch) {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    root.classList.add("dark");
    btnSwitch.checked = true;
  } else {
    root.classList.remove("dark");
    btnSwitch.checked = false;
  }

  // sauvegarde dans le localStorage du mode thème ---------------
  btnSwitch.addEventListener("change", () => {
    root.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      root.classList.contains("dark") ? "dark" : "light",
    );
  });
}

// ---------------- Anime container (contenu) -------------------------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("contenu");
  container.classList.remove("opacity-0", "-translate-y-9");
  container.classList.add("opacity-100", "translate-y-0");
});

// ---------------- Création de profil ---------------------------------------------------------------

// ---------------- Gestion de la tâche ----------------

// Classe pour gérer une tâche
class Task {
  constructor(id, text, completed = false, createdAt = new Date()) {
    this.id = id;
    this.text = text;
    this.completed = completed;
    this.createdAt = createdAt;
  }
}

// Gestionnaire de tâches
class TaskManager {
  constructor() {
    this.tasks = this.loadTasks();
    this.currentFilter = 'all';
    this.editingTaskId = null;
  }

  // Charger les tâches depuis localStorage
  loadTasks() {
    try {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        return JSON.parse(savedTasks).map(task => 
          new Task(task.id, task.text, task.completed, new Date(task.createdAt))
        );
      }
      // Migration de l'ancienne version mono-tâche
      const oldTask = localStorage.getItem('tache');
      if (oldTask && oldTask.trim()) {
        const task = new Task(Date.now(), oldTask.trim());
        localStorage.removeItem('tache');
        return [task];
      }
    } catch (error) {
      console.error('Erreur lors du chargement des tâches:', error);
    }
    return [];
  }

  // Sauvegarder les tâches dans localStorage
  saveTasks() {
    try {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des tâches:', error);
    }
  }

  // Ajouter une tâche
  addTask(text) {
    if (!text || !text.trim()) return false;
    
    const task = new Task(Date.now(), text.trim());
    this.tasks.unshift(task); // Ajouter en début de liste
    this.saveTasks();
    return true;
  }

  // Supprimer une tâche
  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasks();
  }

  // Marquer/démarquer une tâche comme terminée
  toggleTask(id) {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
    }
  }

  // Modifier une tâche
  updateTask(id, newText) {
    const task = this.tasks.find(task => task.id === id);
    if (task && newText && newText.trim()) {
      task.text = newText.trim();
      this.saveTasks();
      return true;
    }
    return false;
  }

  // Supprimer les tâches terminées
  clearCompleted() {
    this.tasks = this.tasks.filter(task => !task.completed);
    this.saveTasks();
  }

  // Supprimer toutes les tâches
  clearAll() {
    if (confirm('Êtes-vous sûr de vouloir supprimer toutes les tâches ?')) {
      this.tasks = [];
      this.saveTasks();
      return true;
    }
    return false;
  }

  // Obtenir les tâches filtrées
  getFilteredTasks() {
    switch (this.currentFilter) {
      case 'pending':
        return this.tasks.filter(task => !task.completed);
      case 'completed':
        return this.tasks.filter(task => task.completed);
      default:
        return this.tasks;
    }
  }

  // Obtenir les statistiques
  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(task => task.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  }
}

// Instance globale du gestionnaire
const taskManager = new TaskManager();

// ---------------- Page de création de tâche ----------------
const textInput = document.getElementById("tache");
const btnValid = document.getElementById("btnValid");
const message = document.getElementById("message");

if (btnValid && textInput) {
  // Validation par clic sur le bouton
  btnValid.addEventListener("click", () => {
    const text = textInput.value.trim();
    
    if (taskManager.addTask(text)) {
      textInput.value = '';
      showMessage('Tâche ajoutée avec succès !');
      
      // Redirection après 1.5 secondes
      setTimeout(() => {
        window.location.href = "profil.html";
      }, 1500);
    } else {
      alert('Veuillez saisir une tâche valide.');
    }
  });

  // Validation par Entrée
  textInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      btnValid.click();
    }
  });
}

// Afficher un message de confirmation
function showMessage(text, type = 'success') {
  // Créer ou utiliser l'élément message existant
  let message = document.getElementById("message");
  if (!message) {
    message = document.createElement('div');
    message.id = "message";
    message.className = "hidden rounded-md p-4 mb-4";
    
    const main = document.querySelector('main');
    if (main && main.firstChild) {
      main.insertBefore(message, main.firstChild);
    }
  }

  // Définir les styles selon le type
  message.className = "rounded-md p-4 mb-4";
  if (type === 'success') {
    message.className += " bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800";
    message.innerHTML = `<p class="text-sm font-medium text-green-800 dark:text-green-200">${text}</p>`;
  } else if (type === 'error') {
    message.className += " bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800";
    message.innerHTML = `<p class="text-sm font-medium text-red-800 dark:text-red-200">${text}</p>`;
  }
  
  // Afficher le message
  message.classList.remove('hidden');
  
  // Masquer après 3 secondes
  setTimeout(() => {
    message.classList.add('hidden');
  }, 3000);
}

// ---------------- Page de liste des tâches ----------------
const tasksList = document.getElementById("tasksList");
const noTasksMessage = document.getElementById("noTasksMessage");
const totalTasksEl = document.getElementById("totalTasks");
const pendingTasksEl = document.getElementById("pendingTasks");
const completedTasksEl = document.getElementById("completedTasks");

// Filtres
const filterAll = document.getElementById("filterAll");
const filterPending = document.getElementById("filterPending");
const filterCompleted = document.getElementById("filterCompleted");

// Actions globales
const clearCompleted = document.getElementById("clearCompleted");
const clearAll = document.getElementById("clearAll");

// Modal de modification
const editModal = document.getElementById("editModal");
const editInput = document.getElementById("editInput");
const saveEdit = document.getElementById("saveEdit");
const cancelEdit = document.getElementById("cancelEdit");

// Initialisation de la page profil
if (tasksList) {
  // Initialisation
  renderTasks();
  updateStats();
  setupEventListeners();
}

// Configuration des événements
function setupEventListeners() {
  // Filtres
  if (filterAll) {
    filterAll.addEventListener('click', () => setFilter('all'));
    filterPending.addEventListener('click', () => setFilter('pending'));
    filterCompleted.addEventListener('click', () => setFilter('completed'));
  }

  // Actions globales
  if (clearCompleted) {
    clearCompleted.addEventListener('click', () => {
      const completedCount = taskManager.tasks.filter(task => task.completed).length;
      if (completedCount === 0) {
        showMessage('Aucune tâche terminée à supprimer.', 'error');
        return;
      }
      
      if (confirm(`Êtes-vous sûr de vouloir supprimer les ${completedCount} tâche(s) terminée(s) ?`)) {
        taskManager.clearCompleted();
        renderTasks();
        updateStats();
        showMessage('Tâches terminées supprimées avec succès !', 'success');
      }
    });
  }

  if (clearAll) {
    clearAll.addEventListener('click', () => {
      if (taskManager.tasks.length === 0) {
        showMessage('Aucune tâche à supprimer.', 'error');
        return;
      }
      
      if (taskManager.clearAll()) {
        renderTasks();
        updateStats();
        showMessage('Toutes les tâches ont été supprimées !', 'success');
      }
    });
  }

  // Modal de modification
  if (cancelEdit) {
    cancelEdit.addEventListener('click', closeEditModal);
  }

  if (saveEdit) {
    saveEdit.addEventListener('click', () => {
      const newText = editInput.value.trim();
      if (newText && taskManager.editingTaskId) {
        if (taskManager.updateTask(taskManager.editingTaskId, newText)) {
          closeEditModal();
          renderTasks();
          updateStats();
          showMessage('Tâche modifiée avec succès !', 'success');
        } else {
          showMessage('Erreur lors de la modification de la tâche.', 'error');
        }
      } else {
        showMessage('Veuillez saisir un texte valide.', 'error');
      }
    });
  }

  if (editInput) {
    editInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        saveEdit.click();
      } else if (e.key === 'Escape') {
        closeEditModal();
      }
    });
  }

  // Fermer le modal en cliquant en dehors
  if (editModal) {
    editModal.addEventListener('click', (e) => {
      if (e.target === editModal) {
        closeEditModal();
      }
    });
  }
}

// Définir le filtre actuel
function setFilter(filter) {
  taskManager.currentFilter = filter;
  
  // Mettre à jour l'apparence des boutons de filtre
  document.querySelectorAll('[id^="filter"]').forEach(btn => {
    btn.classList.remove('bg-indigo-600', 'text-white');
    btn.classList.add('bg-gray-300', 'text-gray-700', 'dark:bg-gray-600', 'dark:text-gray-200');
  });
  
  const activeBtn = document.getElementById(`filter${filter.charAt(0).toUpperCase() + filter.slice(1)}`);
  if (activeBtn) {
    activeBtn.classList.remove('bg-gray-300', 'text-gray-700', 'dark:bg-gray-600', 'dark:text-gray-200');
    activeBtn.classList.add('bg-indigo-600', 'text-white');
  }
  
  renderTasks();
}

// Afficher les tâches
function renderTasks() {
  if (!tasksList) return;

  const filteredTasks = taskManager.getFilteredTasks();
  
  if (filteredTasks.length === 0) {
    noTasksMessage.style.display = 'block';
    tasksList.innerHTML = '';
    tasksList.appendChild(noTasksMessage);
    return;
  }

  noTasksMessage.style.display = 'none';
  tasksList.innerHTML = '';

  filteredTasks.forEach(task => {
    const taskElement = createTaskElement(task);
    tasksList.appendChild(taskElement);
  });
}

// Créer l'élément HTML d'une tâche
function createTaskElement(task) {
  const taskDiv = document.createElement('div');
  taskDiv.className = `flex items-center justify-between rounded-lg p-4 transition-all duration-200 ${
    task.completed 
      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
      : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700'
  } shadow-sm border hover:shadow-md`;

  taskDiv.innerHTML = `
    <div class="flex items-center space-x-3 flex-1">
      <input
        type="checkbox"
        ${task.completed ? 'checked' : ''}
        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
        onchange="toggleTask(${task.id})"
      />
      <span class="flex-1 break-words ${
        task.completed 
          ? 'text-gray-500 line-through dark:text-gray-400' 
          : 'text-gray-900 dark:text-white'
      }">
        ${escapeHtml(task.text)}
      </span>
      <span class="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap ml-2">
        ${formatDate(task.createdAt)}
      </span>
    </div>
    <div class="flex space-x-2 ml-4">
      <button
        class="rounded p-1.5 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
        onclick="editTask(${task.id})"
        title="Modifier"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
      </button>
      <button
        class="rounded p-1.5 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
        onclick="deleteTask(${task.id})"
        title="Supprimer"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
        </svg>
      </button>
    </div>
  `;

  return taskDiv;
}

// Mettre à jour les statistiques
function updateStats() {
  const stats = taskManager.getStats();
  
  if (totalTasksEl) totalTasksEl.textContent = stats.total;
  if (pendingTasksEl) pendingTasksEl.textContent = stats.pending;
  if (completedTasksEl) completedTasksEl.textContent = stats.completed;
}

// Actions sur les tâches (fonctions globales pour les onclick)
function toggleTask(id) {
  taskManager.toggleTask(id);
  renderTasks();
  updateStats();
  
  const task = taskManager.tasks.find(t => t.id === id);
  if (task) {
    const message = task.completed ? 'Tâche marquée comme terminée !' : 'Tâche marquée comme en cours !';
    showMessage(message, 'success');
  }
}

function deleteTask(id) {
  const task = taskManager.tasks.find(t => t.id === id);
  if (task && confirm(`Êtes-vous sûr de vouloir supprimer la tâche "${task.text}" ?`)) {
    taskManager.deleteTask(id);
    renderTasks();
    updateStats();
    showMessage('Tâche supprimée avec succès !', 'success');
  }
}

function editTask(id) {
  const task = taskManager.tasks.find(t => t.id === id);
  if (task) {
    taskManager.editingTaskId = id;
    editInput.value = task.text;
    editModal.classList.remove('hidden');
    editModal.classList.add('flex');
    editInput.focus();
    editInput.select();
  }
}

function closeEditModal() {
  editModal.classList.add('hidden');
  editModal.classList.remove('flex');
  taskManager.editingTaskId = null;
  editInput.value = '';
}

// Utilitaires
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatDate(date) {
  const now = new Date();
  const taskDate = new Date(date);
  const diffTime = Math.abs(now - taskDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Aujourd\'hui';
  } else if (diffDays === 1) {
    return 'Hier';
  } else if (diffDays < 7) {
    return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `Il y a ${weeks} semaine${weeks > 1 ? 's' : ''}`;
  } else {
    return taskDate.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}

