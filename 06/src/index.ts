const themeToggle = document.getElementById("theme-switch") as HTMLInputElement | null;
const body: HTMLElement = document.body;

if (themeToggle) {
    themeToggle.addEventListener("change", function (this: HTMLInputElement) {
        if (this.checked) {
            body.classList.add("dark-theme");
            localStorage.setItem("theme", "dark");
        } else {
            body.classList.remove("dark-theme");
            localStorage.setItem("theme", "light");
        }
    });
}
