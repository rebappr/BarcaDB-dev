function initPersonSearch() {

    const input = document.getElementById("sidebarPersonSearch");
    const results = document.getElementById("sidebarSearchResults");

    if (!input || !results) return;

    const searchItems = new Map();

    // Players
    allPlayers.forEach(player => {

        const playerName =
            player.Player ||
            player.Name;

        if (!playerName) return;

        searchItems.set(
            `player-${playerName}`,
            {
                name: playerName,
                type: "Player"
            }
        );

    });

    // Managers + Opponents
    allMatches.forEach(match => {

        if (match.Manager) {

            searchItems.set(
                `manager-${match.Manager}`,
                {
                    name: match.Manager,
                    type: "Manager"
                }
            );

        }

        if (match["Opp. Manager"]) {

            searchItems.set(
                `manager-${match["Opp. Manager"]}`,
                {
                    name: match["Opp. Manager"],
                    type: "Manager"
                }
            );

        }

        if (match["Opp. Team"]) {

            searchItems.set(
                `opponent-${match["Opp. Team"]}`,
                {
                    name: match["Opp. Team"],
                    type: "Opponent"
                }
            );

        }

    });

    const itemList =
        [...searchItems.values()]
        .sort((a, b) =>
            a.name.localeCompare(b.name)
        );

    input.addEventListener("input", () => {

        const value =
            input.value
                .trim()
                .toLowerCase();

        if (!value) {

            results.innerHTML = "";
            return;

        }

        const filtered =
            itemList
                .filter(item =>
                    item.name
                        .toLowerCase()
                        .includes(value)
                )
                .sort((a, b) => {

                    const aStarts =
                        a.name
                            .toLowerCase()
                            .startsWith(value);

                    const bStarts =
                        b.name
                            .toLowerCase()
                            .startsWith(value);

                    return Number(bStarts) -
                           Number(aStarts);

                })
                .slice(0, 20);

        results.innerHTML = `

            <div class="player-search-results">

                ${filtered.map(item => {

                    let url = "";

                    if (item.type === "Manager") {

                        url =
                        "manager.html?name=" +
                        encodeURIComponent(item.name);

                    } else if (item.type === "Opponent") {

                        url =
                        "opponent.html?name=" +
                        encodeURIComponent(item.name);

                    } else {

                        url =
                        "player.html?name=" +
                        encodeURIComponent(item.name);

                    }

                    return `

                        <a
                            class="player-search-item"
                            href="${url}">

                            ${item.name}

                            <span class="search-type ${item.type.toLowerCase()}">
                                (${item.type})
                            </span>

                        </a>

                    `;

                }).join("")}

            </div>

        `;

    });

    input.addEventListener("blur", () => {

        setTimeout(() => {

            results.innerHTML = "";

        }, 200);

    });

}

document.addEventListener("DOMContentLoaded", async () => {

    try {

        window.allPlayers =
            await fetch("data/players.json")
                .then(r => r.json());

        window.allMatches =
            await fetch("data/data.json")
                .then(r => r.json());

        initPersonSearch();

    } catch (err) {

        console.error(
            "Search initialization failed:",
            err
        );

    }

});