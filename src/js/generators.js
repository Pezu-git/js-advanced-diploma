import PositionedCharacter from './PositionedCharacter.js';
/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  // console.log(allowedTypes);
  while (true) {
    const randomTeam = Math.floor(Math.random() * allowedTypes.length);
    const randomLevel = 1 + Math.floor(Math.random() * maxLevel);
    yield new allowedTypes[randomTeam](randomLevel);
  }
}
export function findPosition(type, boardSize = 8) {
  return new Array(boardSize).fill(0).reduce((acc, prev, index) => {
    if (type === 'player') {
      acc.push(index * boardSize, index * boardSize + 1);
    } else {
      acc.push(index * boardSize + boardSize - 2, index * boardSize + boardSize - 1);
    }
    return acc;
  }, []);
}

export function generateTeam(allowedTypes, maxLevel, characterCount, boardSize) {
  const playerPosition = findPosition('player', boardSize);
  const npcPosition = findPosition('npc', boardSize);
  let position;
  let index;
  const teams = [];
  for (let key = 0; key < characterCount; key += 1) {
    const { value } = characterGenerator(allowedTypes, maxLevel).next();
    if (value.isPlayer) {
      index = Math.floor(Math.random() * playerPosition.length);
      position = playerPosition[index];
      playerPosition.splice(index, 1);
    } else {
      index = Math.floor(Math.random() * npcPosition.length);
      position = npcPosition[index];
      npcPosition.splice(index, 1);
    }
    teams.push(new PositionedCharacter(value, position));
  }
  return teams;
}
