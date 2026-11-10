const competitionMap = {
  // Domestic
  "Primera Division": "La Liga",
  "La Liga": "La Liga",
  "Campeonato Nacional de Liga de Primera División": "La Liga",

  "Copa del Rey": "Copa del Rey",
  "Copa de S.M. el Rey": "Copa del Rey",

  "Super Cup": "Supercopa de España",
  "Supercopa de España": "Supercopa de España",

  // Historic Spain
  "Copa de la Coronación": "Copa de la Coronación",
  "Copa de La Liga": "Copa de La Liga",
  "Qualification for La Liga": "Qualification for La Liga",

  // UEFA
  "UEFA Champions League": "UEFA Champions League",
  "Champions League": "UEFA Champions League",

  "European Cup": "European Cup",

  "UEFA Europa League": "UEFA Europa League",
  "Europa League": "UEFA Europa League",

  "UEFA Cup": "UEFA Cup",

  "Cup Winners' Cup": "Cup Winners' Cup",
  "UEFA Cup Winners' Cup": "Cup Winners' Cup",

  "UEFA Super Cup": "UEFA Super Cup",
  "Super Cup (Europe)": "UEFA Super Cup",

  // FIFA
  "FIFA Club World Cup": "FIFA Club World Cup",
  "Club World Cup": "FIFA Club World Cup",

  // Historic Europe
  "Inter-Cities Fairs Cup": "Inter-Cities Fairs Cup",
  "Fairs Cup": "Inter-Cities Fairs Cup"
};

function getCompetitionName(name) {
  return competitionMap[name] || name;
}
