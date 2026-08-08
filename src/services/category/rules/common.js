export const COMMON_TEXT_RULES = [
    {
        id: "text-food",
        category: "food",
        priority: 50,
        match: {
            keywords: [
                "restaurant",
                "cafetaria",
                "snackbar",
                "bakker",
                "bakkerij",
                "slager",
                "groente",
                "supermarkt",
                "boodschap",
                "albert heijn",
                "ah ",
            ],
        },
    },

    {
        id: "text-transport",
        category: "transport",
        priority: 60,
        match: {
            keywords: [
                "ov-chipkaart",
                "ov chipkaart",
                "ns groep",
                "ns reizigers",
                "trein",
                "bus",
                "tram",
                "parkeren",
                "parkeer",
                "benzine",
                "tankstation",
            ],
        },
    },

    {
        id: "text-leisure",
        category: "leisure",
        priority: 40,
        match: {
            keywords: [
                "spotify",
                "netflix",
                "disney",
                "bioscoop",
                "game",
            ],
        },
    },

    {
        id: "text-salary",
        category: "salary",
        priority: 80,
        match: {
            keywords: [
                "salaris",
                "loon",
                "werkgever",
                "payroll",
                "uitkering",
                "pensioen",
            ],
        },
    },

    {
        id: "text-energy",
        category: "energy",
        priority: 70,
        match: {
            keywords: [
                "energie",
                "stroom",
                "gas",
                "water",
                "vattenfall",
                "eneco",
            ],
        },
    },
];