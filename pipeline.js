// Väljer rätt databas att leta i
use savanna;


// Du hittar aggregate-funktionen längst ner.
// Ändra 'pipelineX' så att X motsvarar den lösning du vill köra.
// I terminalen (inte i mongoshell) skriv in:
// mongo < pipeline.js
// notera att du måste stå i mappen felix-mongodb-aggregation-solutions 
// för att kommandot ska funka.

// Uppgift 3.1
// Hur många djur finns det av varje färg?
const pipeline1 = [
  {$group: {
    _id: {color: "$color"}, 
    total: {$sum: 1}
    }
  },
  {$sort: {total: 1}}
];


// Uppgift 3.2
// Sortera på färg
const pipeline2 = [
  {$project: {_id: 0, color: "$color", animal: "$name"}},
  {$sort: {color: 1}}
];


// Uppgift 3.3
// Sortera på antal djur
const pipeline3 = [
  {$group: {
    _id: {color: "$color"}, 
    total: {$sum: 1}
    }
  },
  {$sort: {total: -1}}
];


// Uppgift 4
// Vi grupper djuren på färg igen 
// Räknar ut medelvikten per grupp
// Sortera på vikt i fallande ordning
const pipeline4 = [
  {$group: {
    _id: {color: "$color"},
    average_weight: {$avg: "$weight"}
    }
  },
  {$sort: {average_weight: -1}}
];


// Uppgift 5
// Visa det tyngsta djurets vikt för varje färg
// Visa det lättaste djurets vikt för varje färg
const pipeline5 = [
  {$group: {
    _id: {color: "$color"},
    max_weight: {$max: "$weight"},
    min_weight: {$min: "$weight"}
    }
  },
  {$sort: {max_weight: -1}},
];


// Uppgift 6
// Vad är medelvikten för varje familj i suborder Caniformia?
// Lösning 1:
const pipeline61 = [
  {$match: {suborder: "Caniformia"}},
  {$group: {
    _id: {family: "$family"},
    average_weight: {$avg: "$weight"}
    }
  },
  {$sort: {average_weight: -1}},
];
// Lösning 2:
const pipeline62 = [
  {$match: {suborder: "Caniformia", family: {$exists: true, $ne: null}}},
  {$group: {
    _id: {family: "$family"},
    average_weight: {$avg: "$weight"}
    }
  },
  {$sort: {average_weight: -1}},
];


// Uppgift 7
// Vad kan man använda $project till?
const pipeline7 = [
  {$project: {_id: 0, animal: "$name", color: "$color", weight: "$weight"}},
  {$sort: {weight: -1}}
];


// Uppgift 8
// Visa ett fält Average female weight som visar det per djur
const pipeline8 = [
  {$match: {min_weight_female: {$exists: true}}},
  {$project: {_id: 0, animal: "$name", average_female_weight: {$avg: ["$min_weight_female", "$max_weight_female"]}}},
  {$sort: {average_female_weight: -1}},
];


// Uppgift 9
// Lista alla djurens namn men de djur som väger 1000 kg eller mer ska ha sina namn i stora bokstäver
// Döp om fältet vi visar till Info
const pipeline9 = [
  {$project: {
    _id: 0, 
    info: {$cond: {
      if: {$gte: ["$weight", 1000]}, then: {$toUpper: "$name"}, 
      else: "$name"}}}
  }
];


// Uppgift 10
// Den har jag tydligen glömt att göra...


// Uppgift 11
// Skriv en fråga som ger följande utskrift:
// "Info": "NAME the COLOR SUBORDER"
const pipeline11 = [
  {$match: {suborder: {$exists: true}}},
  {$project: {
    _id: 0,
    Info: { 
      $concat: [{$toUpper: "$name"}, " the ", "$color", " ", "$suborder"]}}
  },
  {$sort: {Info: 1}}
];


// Uppgift 12
// Skriv en fråga som visar alla djur som inte är växt- eller allätare dvs ger följande utskrift:
// "Carnivore": "ANIMAL", "WEIGHT" : WEIGHT
const pipeline12 = [
  {$match: {order: "Carnivora"}},
  {$project: {
    _id: 0,
    Carnivora: "$name",
    Type: "$order",
    Weight: {$avg: "$weight"}}
  },
  {$sort: {Carnivora: 1}}
];


// pass pipeline to our aggregation query
// replace pipelineX with the solution number you want to run
db.safari.aggregate(pipeline1).pretty();
