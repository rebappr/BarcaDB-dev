document.addEventListener("DOMContentLoaded", () => {

    const menuToggle =
        document.getElementById("menuToggle");

    const sidebar =
        document.getElementById("sidebar");

    const sidebarClose =
        document.getElementById("sidebarClose");

    const overlay =
        document.getElementById("sidebarOverlay");

    if (!menuToggle || !sidebar) {
        return;
    }

    function openSidebar() {

        sidebar.classList.add("open");
        overlay?.classList.add("show");

    }

    function closeSidebar() {

        sidebar.classList.remove("open");
        overlay?.classList.remove("show");

    }

    function toggleSidebar() {

        sidebar.classList.toggle("open");
        overlay?.classList.toggle("show");

    }

    menuToggle.addEventListener("click", (e) => {

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

    document.addEventListener("click", (e) => {

        if (
            sidebar.classList.contains("open") &&
            !sidebar.contains(e.target) &&
            !menuToggle.contains(e.target)
        ) {
            closeSidebar();
        }

    });

    document
        .querySelectorAll(".sidebar-nav a")
        .forEach(link => {

            link.addEventListener("click", () => {

                closeSidebar();

            });

        });

});
