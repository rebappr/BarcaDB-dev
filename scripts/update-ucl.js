const fs = require("fs");
const CLUB_MAP = require("../data/clubMap");

async function run() {

  console.log("Starting UCL updater...");

  const response = await fetch(
    "https://api.football-data.org/v4/competitions/CL/standings",
    {
      headers: {
        "X-Auth-Token": process.env.API_KEY
      }
    }
  );

  console.log("API status: " + response.status);

  if (!response.ok) {
    throw new Error("API returned " + response.status);
  }

  const apiData = await response.json();

  const season =
    apiData.season.startDate.slice(0, 4) +
    "/" +
    apiData.season.endDate.slice(2, 4);

  const standings = apiData.standings.find(
    x => x.type === "TOTAL"
  );

  if (!standings) {
    throw new Error("TOTAL standings not found");
  }

  const currentRows = standings.table.map(team => {

    const apiName = team.team.name;

    if (!CLUB_MAP[apiName]) {
      console.log("UNKNOWN CLUB: " + apiName);
    }

    return {
      season: season,
      position: String(team.position),
      club: CLUB_MAP[apiName] || apiName,
      matches: String(team.playedGames),
      wins: String(team.won),
      draws: String(team.draw),
      losses: String(team.lost),
      goals:
        String(team.goalsFor) +
        ":" +
        String(team.goalsAgainst),
      difference: String(team.goalDifference),
      points: String(team.points)
    };

  });

  let existing = [];

  try {

    existing = JSON.parse(
      fs.readFileSync(
        "data/tableucl.json",
        "utf8"
      )
    );

  } catch {

    existing = [];

  }

  const historical = existing.filter(
    row => row.season !== season
  );

  const finalData =
    historical.concat(currentRows);

  fs.writeFileSync(
    "data/tableucl.json",
    JSON.stringify(finalData, null, 2)
  );

  console.log(
    "UCL table updated for " + season
  );

}

run().catch(err => {

  console.error(err);

  process.exit(1);

});
