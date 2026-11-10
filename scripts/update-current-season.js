const fs = require("fs");
const CLUB_MAP = require("../data/clubMap");
const COMPETITION_MAP = require("../data/competitionMap");

function formatDate(dateStr){
const d = new Date(dateStr);
return d.getDate() + "." + (d.getMonth()+1) + "." + d.getFullYear();
}

async function run(){

const response = await fetch(
"https://api.football-data.org/v4/teams/81/matches?limit=200",
{
headers:{
"X-Auth-Token":process.env.API_KEY
}
}
);

if(!response.ok){
throw new Error("API returned " + response.status);
}

const data = await response.json();

const currentSeason =
new Date().getMonth() >= 6
? new Date().getFullYear() + "/" + String(new Date().getFullYear()+1).slice(2)
: (new Date().getFullYear()-1) + "/" + String(new Date().getFullYear()).slice(2);

const matches = data.matches
.filter(match => {
const startYear = new Date(match.season.startDate).getFullYear();
const endYear = new Date(match.season.endDate).getFullYear();
return startYear + "/" + String(endYear).slice(2) === currentSeason;
})
.map(match => {

const homeApiName = match.homeTeam.name;
const awayApiName = match.awayTeam.name;

const home =
    CLUB_MAP[homeApiName] || homeApiName;

const away =
    CLUB_MAP[awayApiName] || awayApiName;

const isHome = home === "FC Barcelona";
const opponent = isHome ? away : home;

let result = "-:-";

if (
  match.status === "FINISHED" &&
  match.score?.fullTime?.home != null &&
  match.score?.fullTime?.away != null
) {
  result = `${match.score.fullTime.home}:${match.score.fullTime.away}`;
}

return {
ApiId: String(match.id),
Date: formatDate(match.utcDate),
Competition:
COMPETITION_MAP[match.competition.name] ||
match.competition.name,
"Opp. Team": opponent,
"Home/Away": isHome ? "Home" : "Away",
Result: result
};
});

fs.writeFileSync(
"data/current-season.json",
JSON.stringify(matches,null,2)
);

console.log(
"Saved " +
matches.length +
" matches for " +
currentSeason
);

}

run().catch(err => {
console.error(err);
process.exit(1);
});
