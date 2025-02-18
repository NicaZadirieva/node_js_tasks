const { characters, stealRing } = require("./characters.js");
let myCharacters = characters;

myCharacters = stealRing(myCharacters, "John Doe");

for (const character of myCharacters) {
  console.log(character);
}
