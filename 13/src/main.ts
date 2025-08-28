/********************
 * Types et Interfaces
 ********************/
interface NewsletterElements {
    form: HTMLFormElement | null;
    emailInput: HTMLInputElement | null;
    errorMessage: HTMLElement | null;
    modal: HTMLElement | null;
}

interface ThemeElements {
    toggle: HTMLInputElement | null;
    body: HTMLBodyElement;
}

// Déclaration de l'extension de l'interface Window
interface Window {
    closeModal: () => void;
}

/********************
 * Constants and DOM Elements
 ********************/
const getNewsletterElements = (): NewsletterElements => ({
    form: document.getElementById('newsletterForm') as HTMLFormElement,
    emailInput: document.getElementById('email') as HTMLInputElement,
    errorMessage: document.getElementById('errorMessage'),
    modal: document.getElementById('myModal')
});

/********************
 * Utility Functions
 ********************/
const isValidEmail = (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value.trim());
};

const showError = (emailInput: HTMLInputElement | null, errorMessage: HTMLElement | null): void => {
    if (!errorMessage || !emailInput) return;
    errorMessage.style.display = 'block';
    emailInput.classList.add('error');
};

const hideError = (emailInput: HTMLInputElement | null, errorMessage: HTMLElement | null): void => {
    if (!errorMessage || !emailInput) return;
    errorMessage.style.display = 'none';
    emailInput.classList.remove('error');
};

/********************
 * Modal Functions
 ********************/
const openModal = (modal: HTMLElement | null): void => {
    if (modal) modal.classList.add('active');
};

const closeModal = (modal: HTMLElement | null, emailInput: HTMLInputElement | null): void => {
    if (modal) {
        modal.classList.remove('active');
        if (emailInput) emailInput.focus();
    }
};

/********************
 * Newsletter Form Handling
 ********************/
const setupNewsletterForm = (elements: NewsletterElements): void => {
    const { form, emailInput, errorMessage, modal } = elements;
    
    if (!form || !emailInput || !errorMessage || !modal) return;

    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        const value = emailInput.value.trim();

        if (!isValidEmail(value)) {
            showError(emailInput, errorMessage);
            emailInput.focus();
            return;
        }
        
        hideError(emailInput, errorMessage);
        openModal(modal);
        form.reset();
    });

    emailInput.addEventListener('input', () => {
        if (isValidEmail(emailInput.value)) {
            hideError(emailInput, errorMessage);
        }
    });
};

/********************
 * Dark Mode Functionality
 ********************/
const setupDarkMode = (): void => {
    const toggle: HTMLInputElement | null = document.getElementById('themeToggle') as HTMLInputElement;
    const body: HTMLBodyElement = document.body as HTMLBodyElement;

    const stored: string | null = localStorage.getItem('theme');
    const prefersDark: boolean = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const startDark: boolean = stored ? (stored === 'dark') : prefersDark;

    if (startDark) {
        body.classList.add('dark');
        if (toggle) toggle.checked = true;
    }

    if (toggle) {
        toggle.addEventListener('change', () => {
            const isDark: boolean = toggle.checked;
            body.classList.toggle('dark', isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
};

/********************
 * Modal Event Listeners
 ********************/
const setupModalListeners = (modal: HTMLElement | null, emailInput: HTMLInputElement | null): void => {
    if (!modal) return;

    // Fermer si clic en dehors
    modal.addEventListener('click', (e: MouseEvent) => {
        if (e.target === modal) {
            closeModal(modal, emailInput);
        }
    });

    // Fermer avec Esc
    window.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeModal(modal, emailInput);
        }
    });
};

/********************
 * Global Functions for HTML onclick attributes
 ********************/
const setupGlobalFunctions = (modal: HTMLElement | null, emailInput: HTMLInputElement | null): void => {
    // Assignation de la fonction closeModal à l'objet window
    (window as any).closeModal = (): void => closeModal(modal, emailInput);
};

/********************
 * Initialize Application
 ********************/
const initApp = (): void => {
    const newsletterElements = getNewsletterElements();
    setupNewsletterForm(newsletterElements);
    setupDarkMode();
    setupModalListeners(newsletterElements.modal, newsletterElements.emailInput);
    setupGlobalFunctions(newsletterElements.modal, newsletterElements.emailInput);
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}