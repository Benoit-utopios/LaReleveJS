const loginButton = document.getElementById("loginButton") as HTMLButtonElement;

if (loginButton) {
  loginButton.addEventListener("click", function (): void {
    // Redirection vers login.html
    window.location.href = "login.html";
  });
}

const backButton = document.getElementById("backButton") as HTMLButtonElement;
const registerForm = document.getElementById("registerForm") as HTMLFormElement;

if (backButton) {
  backButton.addEventListener("click", function (): void {
    window.history.back();
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", function (e: Event): void {
    e.preventDefault();

    const usernameInput = document.getElementById("username") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    const confirmPasswordInput = document.getElementById("confirmPassword") as HTMLInputElement;

    const username: string = usernameInput ? usernameInput.value.trim() : "";
    const email: string = emailInput ? emailInput.value.trim() : "";
    const password: string = passwordInput ? passwordInput.value : "";
    const confirmPassword: string = confirmPasswordInput ? confirmPasswordInput.value : "";

    if (!username || !email || !password || !confirmPassword) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    alert("Inscription réussie (simulation)");
  });
}

const loginForm = document.getElementById("loginForm") as HTMLFormElement;

if (loginForm) {
  loginForm.addEventListener("submit", function (e: Event): void {
    e.preventDefault();
    
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    
    const email: string = emailInput ? emailInput.value : "";
    const password: string = passwordInput ? passwordInput.value : "";
    
    if (!email || !password) {
      alert("Veuillez remplir tous les champs !");
    } else {
      alert("Connexion réussie (simulation)");
      // ici tu pourrais rediriger vers une page d'accueil, par ex :
      // window.location.href = "index.html";
    }
  });
}
