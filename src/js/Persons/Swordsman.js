/* eslint-disable linebreak-style */
import Character from '../Character.js';

export default class Swordsman extends Character {
  constructor() {
    super();
    this.attack = 40;
    this.defence = 10;
    this.type = 'sworsman';
  }
}
