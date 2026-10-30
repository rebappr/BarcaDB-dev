document.addEventListener("DOMContentLoaded", () => {

    const savedTheme =
        localStorage.getItem("theme");

    if(savedTheme){

        document.documentElement.setAttribute(
            "data-theme",
            savedTheme
        );
    }

    const themeToggle =
        document.getElementById("themeToggle");

    const themeIcon =
        document.getElementById("themeIcon");

    if(!themeToggle || !themeIcon){
        return;
    }

    function updateThemeIcon(theme){

        themeIcon.innerHTML =
            theme === "dark"
            ? `
            <circle
                cx="12"
                cy="12"
                r="5"
                stroke="currentColor"
                stroke-width="2"/>

            <path
                d="M12 1V4M12 20V23M4.22 4.22L6.34 6.34
                   M17.66 17.66L19.78 19.78
                   M1 12H4M20 12H23
                   M4.22 19.78L6.34 17.66
                   M17.66 6.34L19.78 4.22"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"/>
            `
            : `
            <path
                d="M21 12.8A9 9 0 1 1 11.2 3
                   7 7 0 0 0 21 12.8Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"/>
            `;
    }

    updateThemeIcon(
        savedTheme ||
        (
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
                ? "dark"
                : "light"
        )
    );

    themeToggle.addEventListener(
        "click",
        () => {

            const current =
                document.documentElement.getAttribute(
                    "data-theme"
                ) || "dark";

            const next =
                current === "dark"
                ? "light"
                : "dark";

            document.documentElement.setAttribute(
                "data-theme",
                next
            );

            localStorage.setItem(
                "theme",
                next
            );

            updateThemeIcon(next);

        }
    );

});
