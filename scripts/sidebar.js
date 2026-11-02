document.documentElement.classList.add("sidebar-preload");

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const sidebarClose = document.getElementById("sidebarClose");
    const overlay = document.getElementById("sidebarOverlay");

    if (!sidebar) return;

    const STORAGE_KEY = "sidebarState";
    const desktop = window.innerWidth >= 1024;

    function saveState(isOpen) {
        localStorage.setItem(
            STORAGE_KEY,
            isOpen ? "open" : "closed"
        );
    }

    function openSidebar(save = true) {
        sidebar.classList.add("open");

        if (desktop) {
            document.body.classList.add("sidebar-open");
        } else {
            overlay?.classList.add("show");
        }

        if (save) {
            saveState(true);
        }
    }

    function closeSidebar(save = true) {
        sidebar.classList.remove("open");

        if (desktop) {
            document.body.classList.remove("sidebar-open");
        } else {
            overlay?.classList.remove("show");
        }

        if (save) {
            saveState(false);
        }
    }

    function toggleSidebar() {
        if (sidebar.classList.contains("open")) {
            closeSidebar();
        } else {
            openSidebar();
        }
    }

    const savedState =
        localStorage.getItem(STORAGE_KEY);

    if (desktop) {
        if (savedState === "closed") {
            closeSidebar(false);
        } else {
            openSidebar(false);
        }
    }

    menuToggle?.addEventListener("click", e => {
        e.stopPropagation();
        toggleSidebar();
    });

    sidebarClose?.addEventListener(
        "click",
        closeSidebar
    );

    overlay?.addEventListener(
        "click",
        closeSidebar
    );

    document.addEventListener("click", e => {
        if (
            !desktop &&
            sidebar.classList.contains("open") &&
            !sidebar.contains(e.target) &&
            !menuToggle?.contains(e.target)
        ) {
            closeSidebar();
        }
    });

    document
        .querySelectorAll(".sidebar-nav a")
        .forEach(link => {
            link.addEventListener("click", () => {
                if (!desktop) {
                    closeSidebar();
                }
            });
        });

    requestAnimationFrame(() => {
        document.documentElement.classList.remove(
            "sidebar-preload"
        );
    });
});
