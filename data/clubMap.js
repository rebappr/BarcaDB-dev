const clubNameMap = {
  // Nemecko
  "1. FC Kaiserslautern": "Kaiserslautern",
  "1. FC Köln": "Köln",
  "1. FC Magdeburg": "Magdeburg",
  "1. FC Lokomotive Leipzig": "Lokomotive Leipzig",
  "Bayer 04 Leverkusen": "Bayer Leverkusen",
  "FC Bayern München": "Bayern München",
  "Borussia Dortmund": "Borussia Dortmund",
  "Borussia Mönchengladbach": "Borussia Mönchengladbach",
  "Eintracht Frankfurt": "Eintracht Frankfurt",
  "FC Schalke 04": "Schalke",
  "Hamburger SV": "Hamburg",
  "Hertha BSC": "Hertha",
  "Hannover 96": "Hannover",
  "FC Hansa Rostock": "Hansa Rostock",
  "Fortuna Düsseldorf": "Fortuna Düsseldorf",
  "SV Werder Bremen": "Werder Bremen",
  "VfB Stuttgart": "Stuttgart",
  "KFC Uerdingen 05": "Uerdingen",

  // Anglicko
  "Arsenal FC": "Arsenal",
  "Aston Villa FC": "Aston Villa",
  "Chelsea FC": "Chelsea",
  "Liverpool FC": "Liverpool",
  "Manchester City FC": "Manchester City",
  "Manchester United FC": "Manchester United",
  "Newcastle United FC": "Newcastle United",
  "Nottingham Forest FC": "Nottingham Forest",
  "Tottenham Hotspur FC": "Tottenham Hotspur",
  "Wolverhampton Wanderers FC": "Wolves",
  "Leeds United FC": "Leeds United",
  "Ipswich Town FC": "Ipswich Town",
  "Sheffield Wednesday FC": "Sheffield Wednesday",
  "Birmingham City FC": "Birmingham City",

  // Španielsko
  "Real Madrid CF": "Real Madrid",
  "Club Atlético de Madrid": "Atlético Madrid",
  "Athletic Club": "Athletic Club",
  "Real Betis Balompié": "Real Betis",
  "Sevilla FC": "Sevilla",
  "Valencia CF": "Valencia",
  "Villarreal CF": "Villarreal",
  "Real Sociedad de Fútbol": "Real Sociedad",
  "Rayo Vallecano de Madrid": "Rayo Vallecano",
  "CA Osasuna": "Osasuna",
  "RCD Espanyol de Barcelona": "Espanyol",
  "RC Celta de Vigo": "Celta Vigo",
  "Getafe CF": "Getafe",
  "Girona FC": "Girona",
  "UD Almería": "Almería",
  "Levante UD": "Levante",
  "UD Las Palmas": "Las Palmas",
  "Elche CF": "Elche",
  "SD Eibar": "Eibar",
  "CD Leganés": "Leganés",
  "Real Valladolid CF": "Real Valladolid",
  "Real Zaragoza": "Real Zaragoza",
  "Real Oviedo": "Oviedo",
  "Real Murcia CF": "Real Murcia",
  "Málaga CF": "Málaga",
  "RCD Mallorca": "Mallorca",
  "Cádiz CF": "Cádiz",
  "Granada CF": "Granada",
  "SD Huesca": "Huesca",
  "CD Tenerife": "Tenerife",
  "Córdoba CF": "Córdoba",
  "CD Castellón": "Castellón",
  "Racing Club Ferrol": "Racing Ferrol",
  "Real Racing Club de Santander": "Racing Santander",
  "Deportivo Alavés": "Deportivo Alavés",
  "RC Deportivo La Coruña": "Deportivo La Coruña",
  "Sporting de Gijón": "Sporting Gijón",
  "Hércules CF": "Hércules",
  "Arenas Club de Getxo": "Arenas Club",
  "Athletic Fútbol Club de Palma": "Athletic de Palma",

  // Taliansko
  "AC Milan": "Milan",
  "FC Internazionale Milano": "Inter Milan",
  "AS Roma": "Roma",
  "ACF Fiorentina": "Fiorentina",
  "Atalanta BC": "Atalanta",
  "Juventus FC": "Juventus",
  "SS Lazio": "Lazio",
  "SSC Napoli": "Napoli",
  "UC Sampdoria": "Sampdoria",
  "Udinese Calcio": "Udinese",
  "Como 1907": "Como",

  // Francúzsko
  "Paris Saint-Germain FC": "PSG",
  "Olympique Lyonnais": "Olympique Lyon",
  "AS Monaco FC": "Monaco",
  "OGC Nice": "Nice",
  "FC Metz": "Metz",
  "RC Strasbourg Alsace": "Racing Strasbourg",
  "Stade Brestois 29": "Stade Brestois",

  // Holandsko
  "AFC Ajax": "Ajax",
  "AZ": "Alkmaar",
  "PSV": "PSV Eindhoven",
  "FC Utrecht": "Utrecht",
  "Feyenoord": "Feyenoord",
  "NEC": "Nijmegen",

  // Portugalsko
  "SL Benfica": "Benfica",
  "Sporting Clube de Portugal": "Sporting CP",
  "FC Porto": "Porto",
  "Vitória SC": "Vitória Guimarães",

  // Belgicko
  "Club Brugge KV": "Club Brugge",
  "RSC Anderlecht": "Anderlecht",
  "Royal Antwerp FC": "Royal Antwerp",

  // Škótsko
  "Celtic FC": "Celtic",
  "Rangers FC": "Rangers",

  // Česko
  "SK Slavia Praha": "Slávia Praha",
  "AC Sparta Praha": "Sparta Praha",
  "FC Viktoria Plzeň": "Viktoria Plzeň",
  "FC Hradec Králové": "Hradec Králové",
  "FK Dukla Praha": "Dukla Praha",

  // Slovensko
  "ŠK Slovan Bratislava": "Slovan Bratislava",

  // Chorvátsko
  "GNK Dinamo Zagreb": "GNK Dinamo Zagreb",

  // Srbsko
  "FK Crvena zvezda": "Crvena Zvezda",
  "FK Partizan": "Partizan",

  // Ukrajina
  "FC Dynamo Kyiv": "Dynamo Kyiv",
  "FC Shakhtar Donetsk": "Shakhtar Donetsk",

  // Grécko
  "Olympiacos FC": "Olympiacos",
  "Panathinaikos FC": "Panathinaikos",
  "PAOK FC": "PAOK Thessaloniki",

  // Turecko
  "Fenerbahçe SK": "Fenerbahce",
  "Galatasaray SK": "Galatasaray",
  "Beşiktaş JK": "Beşiktaş",
  "Trabzonspor": "Trabzonspor Kulübü",

  // Rakúsko
  "FK Austria Wien": "Austria Vienna",

  // Švajčiarsko
  "BSC Young Boys": "Young Boys",
  "FC Basel 1893": "Basel",
  "FC Zürich": "Zürich",
  "FC Lugano": "Lugano",

  // Dánsko
  "FC København": "Copenhagen",
  "Brøndby IF": "Bröndby",
  "AGF": "Aarhus",

  // Poľsko
  "Legia Warszawa": "Legia Warszawa",
  "Lech Poznań": "Lech Poznań",

  // Cyprus
  "APOEL FC": "APOEL",
  "AEK Larnaca FC": "AEK Larnaca",
  "Apollon Limassol FC": "Apollon Limassol",

  // Švédsko
  "AIK": "AIK",
  "IFK Göteborg": "Göteborg",

  // Maďarsko
  "Ferencvárosi TC": "Ferencvárosi",
  "ETO FC Győr": "ETO Győr",

  // Bulharsko
  "PFC CSKA Sofia": "CSKA Sofia",
  "Levski Sofia": "Levski Sofia",
  "Botev Plovdiv": "Botev Plovdiv",

  // Rumunsko
  "FCSB": "FCSB",

  // Bielorusko
  "FC BATE Borisov": "BATE Borisov",

  // Rusko
  "PFC CSKA Moskva": "CSKA Moscow",
  "FC Dynamo Moscow": "Dynamo Moscow",
  "FC Spartak Moscow": "Spartak Moscow",
  "FC Lokomotiv Moscow": "Lokomotiv Moscow",
  "FC Rubin Kazan": "Rubin Kazan",

  "ÍA Akranes": "Akranes",
  "Club América": "América",
  "Atlante FC": "Atlante",
  "Club Atlético Tetuán": "Atlético Tetuán",
  "Åtvidabergs FF": "Åtvidabergs"
  
};

const officialClubNameMap = Object.fromEntries(
  Object.entries(clubNameMap)
    .map(([official, display]) => [display, official])
);

if (typeof window !== "undefined") {
  window.getClubName = function(name) {
    return clubNameMap[name] || name;
  };

  window.getOfficialClubName = function(name) {
    return officialClubNameMap[name] || name;
  };

  window.CLUB_MAP = clubNameMap;
  window.OFFICIAL_CLUB_MAP = officialClubNameMap;
}

if (typeof module !== "undefined") {
  module.exports = clubNameMap;
}
