export const characters = [
  { name: "John Doe", hasRing: false },
  { name: "Jane Smith", hasRing: false },
  { name: "Alice Johnson", hasRing: false },
];

export function stealRing(characters, owner) {
  return Array.from(characters).map((character) => {
    if (character.name === owner) {
      character.hasRing = true;
    } else {
      character.hasRing = false;
    }
    return character;
  });
}
