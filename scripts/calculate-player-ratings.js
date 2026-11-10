const fs = require("fs");

const INPUT_FILE = "./data/players-history.json";
const OUTPUT_FILE = "./data/player-ratings.json";

function num(value) {

    const n = Number(value);

    return Number.isFinite(n)
        ? n
        : 0;

}

function calculateMatchRating(stats) {

    const minutes =
        num(stats.Min);

    if (minutes <= 0) {
        return 0;
    }

    let rating = 6.0;

    const goals = num(stats.Gls);
    const assists = num(stats.Ast);

    const shots = num(stats.Sh);
    const shotsOnTarget = num(stats.SoT);

    const tacklesWon = num(stats.TklW);
    const interceptions = num(stats.Int);

    const foulsWon = num(stats.Fld);
    const foulsCommitted = num(stats.Fls);

    const yellowCards = num(stats.CrdY);
    const redCards = num(stats.CrdR);

    const offsides = num(stats.Off);
    const crosses = num(stats.Crs);

    const ownGoals = num(stats.OG);

    const shotsAgainst = num(stats.SoTA);
    const goalsAgainst = num(stats.GA);
    const saves = num(stats.Saves);

    rating += goals * 1.5;
    rating += assists * 1.0;

    rating += shotsOnTarget * 0.25;
    rating += shots * 0.05;

    rating += tacklesWon * 0.15;
    rating += interceptions * 0.15;

    rating += foulsWon * 0.05;
    rating += crosses * 0.03;

    rating -= foulsCommitted * 0.05;
    rating -= offsides * 0.08;

    rating -= yellowCards * 0.30;
    rating -= redCards * 1.50;

    rating -= ownGoals * 2.00;

    if (
        Object.prototype.hasOwnProperty.call(
            stats,
            "Saves"
        )
    ) {

        rating += saves * 0.20;

        rating -= goalsAgainst * 0.40;

        if (shotsAgainst > 0) {

            const savePct =
                (saves / shotsAgainst) * 100;

            rating +=
                (savePct - 70) / 20;

        }

    }

    const minuteFactor =
        Math.min(minutes, 90) / 90;

    rating =
        6 +
        ((rating - 6) * minuteFactor);

    rating =
        Math.max(
            0,
            Math.min(10, rating)
        );

    return Number(
        rating.toFixed(2)
    );

}

if (!fs.existsSync(INPUT_FILE)) {

    console.error(
        `${INPUT_FILE} not found`
    );

    process.exit(1);

}

const history = JSON.parse(
    fs.readFileSync(
        INPUT_FILE,
        "utf8"
    )
);

const output = {};

for (
    const [playerName, matches]
    of Object.entries(history)
) {

    if (!Array.isArray(matches)) {
        continue;
    }

    const ratings = [];

    const seasonStats = {};

    let totalMinutes = 0;

    let goals = 0;
    let assists = 0;

    let yellowCards = 0;
    let redCards = 0;

    let cleanSheets = 0;

    let saveSum = 0;
    let saveMatches = 0;

    let bestMatch = null;
    let worstMatch = null;

    for (const match of matches) {

        const matchRating =
            calculateMatchRating(match);

        ratings.push({

            matchId:
                match.matchId
