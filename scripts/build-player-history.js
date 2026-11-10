const fs = require("fs");
const path = require("path");

const MATCHES_DIR = "./data/matches";
const OUTPUT_FILE = "./data/players-history.json";

const playerMap = require("./../data/playerNameMap");

/*
 * CSV parser s podporou úvodzoviek
 */
function parseCSV(csv) {

    const rows = [];

    const lines = csv
        .split(/\r?\n/)
        .filter(line => line.trim());

    const headers = parseCSVLine(lines[0]);

    for (let i = 1; i < lines.length; i++) {

        const values =
            parseCSVLine(lines[i]);

        const row = {};

        headers.forEach((header, index) => {

            row[header] =
                values[index] ?? "";

        });

        rows.push(row);

    }

    return rows;

}

function parseCSVLine(line) {

    const result = [];

    let current = "";

    let insideQuotes = false;

    for (const char of line) {

        if (char === '"') {

            insideQuotes = !insideQuotes;

            continue;

        }

        if (char === "," && !insideQuotes) {

            result.push(current);

            current = "";

            continue;

        }

        current += char;

    }

    result.push(current);

    return result;

}

const players = {};

if (!fs.existsSync(MATCHES_DIR)) {

    console.error(
        `Directory not found: ${MATCHES_DIR}`
    );

    process.exit(1);

}

const files =
    fs.readdirSync(MATCHES_DIR)
        .filter(file =>
            file.toLowerCase().endsWith(".csv")
        );

for (const file of files) {

    const matchId =
        Number(
            file.replace(".csv", "")
        );

    console.log(
        `Processing ${file}`
    );

    const csvContent =
        fs.readFileSync(
            path.join(MATCHES_DIR, file),
            "utf8"
        );

    const rows =
        parseCSV(csvContent);

    rows.forEach(row => {

        const originalName =
            row.Player?.trim();

        if (!originalName) {
            return;
        }

        const playerName =
            playerMap[originalName] ||
            originalName;

        if (!players[playerName]) {

            players[playerName] = [];

        }

        const matchRecord = {

            matchId

        };

        /*
         * prenes všetky stĺpce
         * okrem Player
         */
        Object.entries(row)
            .forEach(([key, value]) => {

                if (key === "Player") {
                    return;
                }

                matchRecord[key] =
                    value;

            });

        players[playerName]
            .push(matchRecord);

    });

}

Object.keys(players)
    .forEach(player => {

        players[player]
            .sort(
                (a, b) =>
                    a.matchId - b.matchId
            );

    });

fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(
        players,
        null,
        2
    ),
    "utf8"
);

console.log(
    `Generated ${OUTPUT_FILE}`
);

console.log(
    `Players: ${
        Object.keys(players).length
    }`
);
