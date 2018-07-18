# Lösningsexempel på uppgifter för MongoDB aggregation operations

## Importera

1. Klona repot
```bash
git clone https://github.com/javascriptst18/felix-mongodb-aggregation-solutions.git
```
2. `cd` in i mappen `felix-mongodb-aggregation-solutions` som skapas vid kloningen
```bash
cd felix-mongodb-aggregation-solutions
```
3. Öppna ett nytt terminalfönster och starta MongoDB's daemon med följande kommando:
```bash
mongod
```
> Om du sitter på Mac och får ett *error* beror det förmodligen på att du inte skrev in `sudo bash` först för att bli root.

4. Skriv in följande kommando i terminalen (inte i mongoshell) i det första terminalfönstret
```bash
mongoimport --drop -d savanna -c safari data/safari.json
```

> Kommandot tar bort databasen *savanna* om den redan finns, skapar  sedanen ny databas med namn *savanna*, och skapar därefter en ny collection som heter *safari* som fylls på med documents från files *safari.json*.

## Använd (välj ett alternativ)

**1. Mongoshell**

Öppna ett nytt terminalfönster och starta MongoDB's shell med kommandot:
```bash
mongo
```
Copy/paste därefter lösningarna från `solutions.js` in i terminalfönstret för att se resultatet.

**1. Terminalen**

Öppna ett nytt terminalfönster (mongod måste vara igång) och skriv följande kommando:
```bash
mongo < pipeline.js
```
Du måste stå i mappen `felix-mongodb-aggregation-solutions` för att det ska fungera.

> Om allt fungerar som det ska kommer terminalen visa resultatet av första lösningen. Notera att filen `pipeline.js` inte tolkas som en JavaScript-fil av terminalen, utan bara som en textfil. Du kan döpa om filen till vad som helst, e.g. `hello.world` och det ska fortfarande fungera.

För att se resultatet av de olika lösningarna får du gå in i filen `pipeline.js` och leta upp följande kod (ligger längst ner):
```json
db.safari.aggregate(pipeline1).pretty();
```
Här skickar vi in vår pipeline (en array med vår query) till aggregation-funktionen. Ändra *pipeline1* till det lösningsnummer du vill köra, e.g. *pipeline4*, *pipeline11* osv. Spara ändringarna i filen och kör sedan kommandot `mongo < pipeline.js` igen för att se det nya resulatet.
