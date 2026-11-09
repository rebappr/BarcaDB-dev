import axios from "axios";
import fs from "fs/promises";
import * as cheerio from "cheerio";

const FBREF_URL =
    "https://fbref.com/en/squads/206d90db/Barcelona-Stats";

const TABLES = [
    {
        name: "shooting",
        tableId: "stats_shooting",
    
        columns: {
    
            Player: "player",
    
            Nation: "nation",
    
            Pos: "position",
    
            Age: "age",
    
            "90s": "nineties",
    
            Gls: "goals",
    
            Sh: "shots",
    
            SoT: "shotsOnTarget",
    
            "SoT%": "shotAccuracy",
    
            "Sh/90": "shotsPer90",
    
            "SoT/90": "shotsOnTargetPer90",
    
            "G/Sh": "goalsPerShot",
    
            "G/SoT": "goalsPerShotOnTarget",
    
            PK: "penaltyGoals",
    
            PKatt: "penaltyAttempts"
        }
    }
];

async function loadPage() {

    const response =
        await axios.get(
            FBREF_URL,
            {
                headers: {

                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",

                    "Accept-Language":
                        "en-US,en;q=0.9"
                }
            }
        );

    let html =
        response.data;

    // FBref ukrýva tabuľky do HTML komentárov
    html =
        html.replace(
            /<!--|-->/g,
            ""
        );

    return cheerio.load(html);
}

function parseTable(
    $,
    tableId,
    columns
) {

    const rows = [];

    const table =
        $(`table#${tableId}`);

    if (!table.length) {

        console.warn(
            `Table not found: ${tableId}`
        );

        return rows;
    }

    table
        .find("tbody tr")
        .each((_, row) => {

            const record = {};

            Object.entries(columns)
                .forEach(([fbrefStat, jsonKey]) => {

                    const value =
                        $(row)
                        .find(
                            `[data-stat="${fbrefStat}"]`
                        )
                        .text()
                        .trim();

                    record[jsonKey] = value;
                });

            if (record.player) {
                rows.push(record);
            }
        });

    return rows;
}

async function saveJson(
    fileName,
    data
) {

    await fs.mkdir(
        "./data/fbref",
        {
            recursive: true
        }
    );

    await fs.writeFile(
        `./data/fbref/${fileName}.json`,
        JSON.stringify(
            data,
            null,
            2
        ),
        "utf8"
    );
}

async function run() {

    console.log("START");

    const $ =
        await loadPage();

    console.log("PAGE LOADED");

    console.log(
        "shooting table exists:",
        $("#stats_shooting").length
    );

    for (const table of TABLES) {

        console.log(
            "Processing:",
            table.name
        );

        const data =
            parseTable(
                $,
                table.tableId,
                table.columns
            );

        console.log(
            "Rows:",
            data.length
        );

        await saveJson(
            table.name,
            data
        );

        console.log(
            "Saved:",
            table.name
        );
    }

    console.log("DONE");
}
run()
    .catch(error => {

        console.error(
            "Import failed:"
        );

        console.error(error);
    });
