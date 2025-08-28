/********************
 * NEWSLETTER (index)
 ********************/
const form = document.getElementById('newsletterForm');
const emailInput = document.getElementById('email');
const errorMessage = document.getElementById('errorMessage');
const modal = document.getElementById('myModal');

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(String(value).trim());

const showError = () => {
  if (!errorMessage || !emailInput) return;
  errorMessage.style.display = 'block';
  emailInput.classList.add('error');
};

const hideError = () => {
  if (!errorMessage || !emailInput) return;
  errorMessage.style.display = 'none';
  emailInput.classList.remove('error');
};

/* Modale (si présente sur la page) */
function openModal() {
  if (modal) modal.classList.add('active');
}
function closeModal() {
  if (modal) {
    modal.classList.remove('active');
    if (emailInput) emailInput.focus(); // UX : remet le focus sur l'input
  }
}
/* Expose seulement si besoin (le HTML appelle closeModal() sur index.html) */
if (modal) {
  window.closeModal = closeModal;
  window.openModal = openModal;

  // Fermer si clic en dehors
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  // Fermer avec Esc
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/* Formulaire : listeners uniquement si le form existe (index.html) */
if (form && emailInput) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = emailInput.value.trim();

    if (!isValidEmail(value)) {
      showError();
      emailInput.focus();
      return;
    }
    hideError();
    openModal();  // s’exécute seulement si modal existe
    form.reset();
  });

  // Validation live
  emailInput.addEventListener('input', () => {
    if (isValidEmail(emailInput.value)) hideError();
  });
}

/********************
 * DARK MODE (toutes pages)
 ********************/
(function () {
  const toggle = document.getElementById('themeToggle');
  const body = document.body;

  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const startDark = stored ? (stored === 'dark') : prefersDark;

  if (startDark) {
    body.classList.add('dark');
    if (toggle) toggle.checked = true;
  }

  if (toggle) {
    toggle.addEventListener('change', () => {
      const isDark = toggle.checked;
      body.classList.toggle('dark', isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
})();
