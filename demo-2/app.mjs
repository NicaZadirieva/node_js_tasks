import { characters, stealRing } from "./characters.mjs";
let myCharacters = characters;

myCharacters = stealRing(myCharacters, "John Doe");

for (const character of myCharacters) {
  console.log(character);
}
