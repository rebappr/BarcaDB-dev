const fs = require("fs");
const path = require("path");

const MATCHES_DIR = "./data/matches";
const GK_DIR = "./data/matches/gk";

const OUTPUT_FILE = "./data/players-history.json";

const playerMap =
    require("./../data/playerNameMap");

const allMatches =
    JSON.parse(
        fs.readFileSync(
            "./data/data.json",
            "utf8"
        )
    );

const seasonMap = {};

allMatches.forEach(match => {

    seasonMap[
        Number(match.ID)
    ] = match.Season;

});

function parseCSV(csv) {

    const rows = [];

    const lines = csv
        .split(/\r?\n/)
        .filter(line => line.trim());

    const headers =
        parseCSVLine(lines[0]);

    for (let i = 1; i < lines.length; i++) {

        const values =
            parseCSVLine(lines[i]);

        const row = {};

        headers.forEach(
            (header, index) => {

                row[header] =
                    values[index] ?? "";

            }
        );

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

            insideQuotes =
                !insideQuotes;

            continue;

        }

        if (
            char === "," &&
            !insideQuotes
        ) {

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

function processCSVDirectory(directory) {

    if (!fs.existsSync(directory)) {
        return;
    }

    const files =
        fs.readdirSync(directory)
            .filter(file =>
                file.endsWith(".csv")
            );

    for (const file of files) {

        const matchId =
            Number(
                file.replace(".csv", "")
            );

        console.log(
            `Processing ${directory}/${file}`
        );

        const csvContent =
            fs.readFileSync(
                path.join(
                    directory,
                    file
                ),
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

            let matchRecord =
                players[playerName].find(
                    m =>
                        m.matchId === matchId
                );

            if (!matchRecord) {

                matchRecord = {

                    matchId,

                    season:
                        seasonMap[matchId] ||
                        "Unknown"

                };

                players[playerName]
                    .push(matchRecord);

            }

            Object.entries(row)
                .forEach(
                    ([key, value]) => {

                        if (
                            key === "Player"
                        ) {
                            return;
                        }

                        matchRecord[key] =
                            value;

                    }
                );

        });

    }

}

processCSVDirectory(
    MATCHES_DIR
);

processCSVDirectory(
    GK_DIR
);

Object.keys(players)
    .forEach(player => {

        players[player].sort(
            (a, b) =>
                a.matchId -
                b.matchId
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
