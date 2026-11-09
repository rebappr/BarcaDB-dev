import axios from "axios";
import fs from "fs/promises";
import * as cheerio from "cheerio";

const FBREF_URL =
    "https://fbref.com/en/squads/206d90db/Barcelona-Stats";

const TABLES = [

        {
            player: "player",
        
            games_90s: "nineties",
        
            goals: "goals",
        
            shots: "shots",
        
            shots_on_target: "shotsOnTarget",
        
            shots_on_target_pct: "shotAccuracy",
        
            shots_per90: "shotsPer90",
        
            shots_on_target_per90: "shotsOnTargetPer90",
        
            goals_per_shot: "goalsPerShot",
        
            goals_per_shot_on_target: "goalsPerShotOnTarget",
        
            pens_made: "penaltyGoals",
        
            pens_att: "penaltyAttempts"
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

    console.log(
        "Downloading FBref page..."
    );

    const $ =
        await loadPage();

    for (const table of TABLES) {

        console.log(
            `Processing ${table.name}...`
        );

        const data =
            parseTable(
                $,
                table.tableId,
                table.columns
            );

        await saveJson(
            table.name,
            data
        );

        console.log(
            `Saved ${table.name}.json (${data.length} players)`
        );
    }

    console.log(
        "Import finished."
    );
}

run()
    .catch(error => {

        console.error(
            "Import failed:"
        );

        console.error(error);
    });
