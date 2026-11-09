import fs from "fs/promises";
import { parse } from "csv-parse/sync";

const FILES = [
    {
        csv: "./csv/shooting.csv",
        json: "./data/fbref/shooting.json",

        columns: {
            "Player": "player",
            "Nation": "nation",
            "Pos": "position",
            "Age": "age",

            "90s": "nineties",

            "Gls": "goals",

            "Sh": "shots",

            "SoT": "shotsOnTarget",

            "SoT%": "shotAccuracy",

            "Sh/90": "shotsPer90",

            "SoT/90": "shotsOnTargetPer90",

            "G/Sh": "goalsPerShot",

            "G/SoT": "goalsPerShotOnTarget",

            "PK": "penaltyGoals",

            "PKatt": "penaltyAttempts"
        }
    }
];

function normalize(value){

    if(value === ""){
        return null;
    }

    const num =
        Number(value);

    if(!Number.isNaN(num)){
        return num;
    }

    return value;
}

async function convertFile(config){

    const csv =
        await fs.readFile(
            config.csv,
            "utf8"
        );

    const rows =
        parse(
            csv,
            {
                columns: true,
                skip_empty_lines: true
            }
        );

    const data =
        rows.map(row => {

            const result = {};

            Object.entries(config.columns)
                .forEach(([csvKey,jsonKey]) => {

                    result[jsonKey] =
                        normalize(
                            row[csvKey]
                        );

                });

            return result;

        });

    await fs.mkdir(
        "./data/fbref",
        {
            recursive: true
        }
    );

    await fs.writeFile(
        config.json,
        JSON.stringify(
            data,
            null,
            2
        )
    );

    console.log(
        `${config.json} created`
    );
}

async function run(){

    for(const file of FILES){

        await convertFile(
            file
        );

    }

    console.log(
        "Done"
    );
}

run();
