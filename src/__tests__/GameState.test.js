/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import GameState from '../js/GameState.js';

test('Проверяем, что GameState вернет null, если ничего не передать в класс', () => {
  expect(GameState.from()).toBe(null);
});
