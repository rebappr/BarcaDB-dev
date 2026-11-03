window.countryFlags = {
    "Argentina":"🇦🇷",
    "Belgium":"🇧🇪",
    "Brazil":"🇧🇷",
    "Croatia":"🇭🇷",
    "Denmark":"🇩🇰",
    "England":"",
    "France":"🇫🇷",
    "Germany":"🇩🇪",
    "Italy":"🇮🇹",
    "Morocco":"🇲🇦",
    "Netherlands":"🇳🇱",
    "Norway":"🇳🇴",
    "Poland":"🇵🇱",
    "Portugal":"🇵🇹",
    "Spain":"🇪🇸",
    "Sweden":"🇸🇪",
    "Switzerland":"🇨🇭",
    "Turkey":"🇹🇷",
    "Uruguay":"🇺🇾",
    "United States":"🇺🇸",
    "Wales":"🏴"
};

window.getCountryFlag = function(country){
    return window.countryFlags[country] || "🌍";
};
