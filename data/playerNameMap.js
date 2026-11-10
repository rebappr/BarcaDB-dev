const playerMap = {

    // Goalkeepers
    "Joan García": "Joan Garcia",
    "Wojciech Szczęsny": "Wojciech Szczesny",
    "Dominik Livaković": "Dominik Livakovic",

    // Defenders
    "Pau Cubarsí": "Pau Cubarsi",
    "Eric García": "Eric Garcia",
    "Gerard Martín": "Gerard Martin",
    "João Cancelo": "Joao Cancelo",
    "Andreas Christensen": "Andreas Christensen",
    "Jules Koundé": "Jules Kounde",
    "Alejandro Balde": "Alejandro Balde",
    "Xavi Espart": "Xavi Espart",

    // Midfielders
    "Pedri": "Pedri",
    "Rodri": "Rodri",
    "Gavi": "Gavi",
    "Marc Bernal": "Marc Bernal",
    "Fermín López": "Fermin Lopez",
    "Frenkie de Jong": "Frenkie de Jong",
    "Dani Olmo": "Dani Olmo",
    "Brian Fariñas Perez": "Brian Farinas",

    // Forwards
    "Lamine Yamal": "Lamine Yamal",
    "Gabriel Jesus": "Gabriel Jesus",
    "Raphinha": "Raphinha",
    "Karim Adeyemi": "Karim Adeyemi",
    "Anthony Gordon": "Anthony Gordon",
    "Hamza Abdelkarim": "Hamza Abdelkarim",

    // FBref encoding fixes
    "FermĂ­n LĂłpez": "Fermin Lopez",
    "JoĂŁo Cancelo": "Joao Cancelo",
    "Eric GarcĂ­a": "Eric Garcia",
    "Joan GarcĂ­a": "Joan Garcia",
    "Gerard MartĂ­n": "Gerard Martin",
    "Brian FariĂ±as Perez": "Brian Farinas",
    "Pau CubarsĂ­": "Pau Cubarsi",
    "Dominik LivakoviÄ‡": "Dominik Livakovic"

};

function normalizePlayerName(name){

    return playerMap[name] || name;

}

// Browser
if (typeof window !== "undefined") {

    window.playerMap = playerMap;
    window.normalizePlayerName = normalizePlayerName;

}

// Node.js
if (typeof module !== "undefined" && module.exports) {

    module.exports = playerMap;

}
