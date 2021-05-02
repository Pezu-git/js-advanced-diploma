/* eslint-disable linebreak-style */
import Character from '../Character.js';

export default class Vampire extends Character {
  constructor() {
    super();
    this.attack = 25;
    this.defence = 25;
    this.type = 'vampire';
  }
}
