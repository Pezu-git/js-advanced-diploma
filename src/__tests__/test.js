/* eslint-disable no-undef */
import Magician from '../js/Magician.js';
import Daemon from '../js/Daemon.js';
import Character from '../js/Character.js';

test('magi1_test', () => {
  const merlin = new Magician();
  merlin.attack = 100;
  merlin.distance = 2;
  merlin.stoned = true;
  expect(merlin.attack).toBe(85);
});
test('magi_test2', () => {
  const merlin = new Magician();
  merlin.attack = 100;
  merlin.distance = 11;
  merlin.stoned = false;
  expect(merlin.attack).toBe(0);
});

test('daemon_test', () => {
  const ad = new Daemon();
  ad.attack = 100;
  ad.distance = 4;
  ad.stoned = false;
  expect(ad.attack).toBe(70);
});

test('Character_test', () => {
  const archer = new Character();
  archer.attack = 100;
  archer.distance = 2;
  expect(archer.attack).toBe(100);
});
test('getStoned_test', () => {
  const merlin = new Magician();
  merlin.stoned = true;
  expect(merlin.stoned).toBe(true);
});
