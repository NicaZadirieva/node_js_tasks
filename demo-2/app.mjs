// import { characters, stealRing } from "./characters.mjs";

async function main() {
  // неблокирующий импорт
  const { characters, stealRing } = await import("./characters.mjs");
  let myCharacters = characters;

  myCharacters = stealRing(myCharacters, "John Doe");

  for (const character of myCharacters) {
    console.log(character);
  }
}

main();
