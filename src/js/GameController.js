/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-useless-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import { generateTeam, findPosition } from './generators.js';
import { calcStep, canStep } from './utils.js';
import cursors from './cursors.js';
import themes from './themes.js';
import Team from './Team.js';
import GamePlay from './GamePlay.js';
import GameState from './GameState.js';
import Character from './Character.js';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.state = GameState.from({});
    this.boardSize = 8;
  }

  init() {
    this.clickOnCells();
    this.enterOnCell();
    this.leaveOnCell();

    // TODO: add event listeners to gamePlay events
    const playerTeams = generateTeam(new Team().playerTeams, 1, 2, this.gamePlay.boardSize);
    const npcTeams = generateTeam(new Team().npcTeams, 1, 2, this.gamePlay.boardSize);
    this.updateState({
      currentLevel: 1,
      teams: [...playerTeams, ...npcTeams],
      numberOfPoints: 0,
      playerTurn: true,
    });
    this.gamePlay.drawUi('prairie');
    this.gamePlay.redrawPositions(this.state.teams);
    // TODO: load saved stated from stateService
  }

  updateState(object) {
    this.state = { ...this.state };
    for (const objectKey in object) {
      if (object.hasOwnProperty(objectKey)) {
        if (object[objectKey] instanceof Array) {
          object[objectKey] = [...object[objectKey]];
        } else if (object[objectKey] instanceof Object) {
          object[objectKey] = { ...object[objectKey] };
        }
        this.state[objectKey] = object[objectKey];
      }
    }
    return this.state;
  }

  clickOnCells() {
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
  }

  // Клик мышью по ячейке поля

  onCellClick(index) {
    const thisCharacter = this.state.teams.find((character) => character.position === index);
    const thisCell = this.state.teams.some((char) => char.position === index);

    if (thisCell) {
      if (thisCharacter && thisCharacter.character.isPlayer) {
        this.selectedChar = thisCharacter;
        this.step = this.selectedChar.character.step;
        this.gamePlay.cells.forEach((cell) => cell.classList.remove('selected-yellow'));
        this.gamePlay.selectCell(index);
        this.prevSelectedCharIndex = index;
        this.gamePlay.setCursor(cursors.pointer);
      }
    }

    if (!thisCell && this.selectedChar) {
      const thisStep = calcStep(index, this.prevSelectedCharIndex, this.boardSize);
      if (canStep(index, this.prevSelectedCharIndex, this.boardSize, thisStep, this.step) && thisStep <= this.step) {
        this.selectedChar.position = index;
        this.gamePlay.cells.forEach((cell) => cell.classList.remove('selected-yellow'));
        this.gamePlay.redrawPositions(this.state.teams);
      }
    }
  }

  enterOnCell() {
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
  }

  // Вход указателя мыши в ячейку поля
  onCellEnter(index) {
    const thisStep = calcStep(index, this.prevSelectedCharIndex, this.boardSize);
    if (this.state.teams.some((char) => char.position === index)) {
      const message = `level:${this.selectedChar.character.level}, attack: ${this.selectedChar.character.attack}, defence: ${this.selectedChar.character.defence}, health: ${this.selectedChar.character.health}`;
      this.gamePlay.showCellTooltip(message, index);
    }
    if (canStep(index, this.prevSelectedCharIndex, this.boardSize, thisStep, this.step) && thisStep <= this.step) {
      this.gamePlay.selectCell(index, 'green');
      this.gamePlay.setCursor(cursors.pointer);
    }
  }

  leaveOnCell() {
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
  }

  // Выход указателя мыши из ячейки поля
  onCellLeave(index) {
    this.gamePlay.setCursor(cursors.pointer);
    this.gamePlay.cells.forEach((cell) => cell.classList.remove('selected-green', 'selected-red'));
    this.gamePlay.hideCellTooltip(index);
  }
}
