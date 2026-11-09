import axios from "axios";
import fs from "fs/promises";
import cheerio from "cheerio";

const TABLES = [
    {
        name: "shooting",
        url: "FBREF_SHOOTING_URL",
        columns: {
            Player: "player",
            Sh: "shots",
            SoT: "shotsOnTarget",
            "SoT%": "shotAccuracy",
            xG: "xG",
            npxG: "nonPenaltyXG"
        }
    },
    {
        name: "passing",
        url: "FBREF_PASSING_URL",
        columns: {
            Player: "player",
            Cmp: "completed",
            Att: "attempted",
            "Cmp%": "accuracy",
            KP: "keyPasses",
            PrgP: "progressivePasses",
            xA: "expectedAssists"
        }
    }
];

async function loadTable(url){

    const response =
        await axios.get(url,{
            headers:{
                "User-Agent":
                    "Mozilla/5.0"
            }
        });

    let html =
        response.data;

    html =
        html.replace(
            /<!--|-->/g,
            ""
        );

    return cheerio.load(html);
}

function parseTable($, columns){

    const rows = [];

    $("tbody tr").each((_, row)=>{

        const record = {};

        Object.entries(columns)
        .forEach(([fbref,jsonKey])=>{

            const td =
                $(row)
                .find(`[data-stat="${fbref}"]`);

            record[jsonKey] =
                td.text().trim();

        });

        if(record.player){
            rows.push(record);
        }

    });

    return rows;
}

async function saveJson(name,data){

    await fs.mkdir(
        "./data/fbref",
        {recursive:true}
    );

    await fs.writeFile(
        `./data/fbref/${name}.json`,
        JSON.stringify(
            data,
            null,
            2
        )
    );
}

async function run(){

    for(const table of TABLES){

        const $ =
            await loadTable(
                table.url
            );

        const data =
            parseTable(
                $,
                table.columns
            );

        await saveJson(
            table.name,
            data
        );

        console.log(
            `Imported ${table.name}`
        );
    }

}

run().catch(console.error);
