window.getPlayerPhoto = function(playerName){

    const map = {

        "Alejandro Balde": "alejandro-balde.webp",
        "Alex Campos": "alex-campos.webp",
        "Alvaro Cortes": "alvaro-cortes.webp",
        "Andreas Christensen": "andreas-christensen.webp",
        "Anthony Gordon": "anthony-gordon.webp",

        "Brian Farinas": "brian-farinas.webp",

        "Dani Olmo": "dani-olmo.webp",

        "Dominik Livakovic": "dominik-livakovic.webp",

        "Ebrima Tunkara": "ebrima-tunkara.webp",
        "Eder Aller": "eder-aller.webp",

        "Eric Garcia": "eric-garcia.webp",

        "Fermin Lopez": "fermin-lopez.webp",
        "Frenkie de Jong": "frenkie-de-jong.webp",

        "Gabriel Jesus": "gabriel-jesus.webp",
        "Gavi": "gavi.webp",

        "Gerard Martin": "gerard-martin.webp",
        "Guillem Victor": "guillem-victor.webp",

        "Hamza Abdelkarim": "hamza-abdelkarim.webp",

        "Iker Rodriguez": "iker-rodriguez.webp",

        "Joan Garcia": "joan-garcia.webp",
        "Joao Cancelo": "joao-cancelo.webp",
        "Jordi Pesquer": "jordi-pesquer.webp",

        "Jules Kounde": "jules-kounde.webp",

        "Karim Adeyemi": "karim-adeyemi.webp",

        "Lamine Yamal": "lamine-yamal.webp",

        "Marc Bernal": "marc-bernal.webp",

        "Orian Goren": "orian-goren.webp",

        "Pau Cubarsi": "pau-cubarsi.webp",

        "Pedri": "pedri.webp",

        "Raphinha": "raphinha.webp",

        "Rodri": "rodri.webp",

        "Wojciech Szczesny": "wojciech-szczesny.webp",

        "Xavi Espart": "xavi-espart.webp"

    };

    return map[playerName] || "default.webp";
};
