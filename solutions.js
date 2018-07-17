/**
 * MongoDB Aggregation Operations
 * Förslag på lösningar.
 * Felix H W
 */


// Uppgift 3.1
// Hur många djur finns det av varje färg?
db.safari.aggregate({$group: {_id: {color: "$color"}, total: {$sum: 1}}}, {$sort: {total: 1}}).pretty();


// Uppgift 3.2
// Sortera på färg
db.safari.aggregate({$project: {_id: 0, color: "$color", animal: "$name"}}, {$sort: {color: 1}}).pretty();


// Uppgift 3.3
// Sortera på antal djur
db.safari.aggregate({$group: {_id: {color: "$color"}, total: {$sum: 1}}}, {$sort: {total: -1}}).pretty();


// Uppgift 4
// Vi grupper djuren på färg igen 
// Räknar ut medelvikten per grupp
// Sortera på vikt i fallande ordning
db.safari.aggregate({$group: {_id: {color: "$color"}, average_weight: {$avg: "$weight"}}}, {$sort: {average_weight: -1}}).pretty();


// Uppgift 5
// Visa det tyngsta djurets vikt för varje färg
// Visa det lättaste djurets vikt för varje färg
db.safari.aggregate({$group: {_id: {color: "$color"}, max_weight: {$max: "$weight"}, min_weight: {$min: "$weight"}}}, {$sort: {max_weight: -1}}).pretty();


// Uppgift 6
// Vad är medelvikten för varje familj i suborder Caniformia?
// Lösning 1
db.safari.aggregate({$match: {suborder: "Caniformia"}}, {$group: {_id: {family: "$family"}, average_weight: {$avg: "$weight"}}}, {$sort: {average_weight: -1}}).pretty();
// Lösning 2
db.safari.aggregate({$match: {suborder: "Caniformia", family: {$exists: true, $ne: null}}}, {$group: {_id: {family: "$family"}, average_weight: {$avg: "$weight"}}}, {$sort: {average_weight: -1}}).pretty();


// Uppgift 7
// Vad kan man använda $project till?
// Här kan lösa det lite hur man vill, beroende på vad man vill få ut med sin project...
db.safari.aggregate({$project: {_id: 0, animal: "$name", color: "$color", weight: "$weight"}}, {$sort: {weight: -1}}).pretty();


// Uppgift 8
// Visa ett fält Average female weight som visar det per djur
db.safari.aggregate({$match: {min_weight_female: {$exists: true}}}, {$project: {_id: 0, animal: "$name", average_female_weight: {$avg: ["$min_weight_female", "$max_weight_female"]}}}, {$sort: {average_female_weight: -1}}).pretty();


// Uppgift 9
// Lista alla djurens namn men de djur som väger 1000 kg eller mer ska ha sina namn i stora bokstäver
// Döp om fältet vi visar till Info
db.safari.aggregate({$project: {_id: 0, info: {$cond: {if: {$gte: ["$weight", 1000]}, then: {$toUpper: "$name"}, else: "$name"}}}}).pretty();


// Uppgift 10
// Den har jag tydligen glömt att göra...


// Uppgift 11
// Skriv en fråga som ger följande utskrift:
// "Info": "NAME the COLOR SUBORDER"
db.safari.aggregate({$match: {suborder: {$exists: true}}}, {$project: {_id: 0, Info: {$concat: [{$toUpper: "$name"}, " the ", "$color", " ", "$suborder"]}}}, {$sort: {Info: 1}}).pretty();


// Uppgift 12
// Skriv en fråga som visar alla djur som inte är växt- eller allätare dvs ger följande utskrift:
// "Carnivore": "ANIMAL", "WEIGHT" : WEIGHT
db.safari.aggregate({$match: {order: "Carnivora"}}, {$project: {_id: 0, Carnivora: "$name", Type: "$order", Weight: {$avg: "$weight"}}}, {$sort: {Carnivora: 1}}).pretty();