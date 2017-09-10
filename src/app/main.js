import { Game } from './classes/game';

window.TILE_HEIGHT = 64;
window.TILE_WIDTH = 64;
window.DEFAULT_LIGHT = 0.85;
window.CENTER_LIGHT = 0.3;
window.INNER_LIGHT = 0.5;
window.OUTER_LIGHT = 0.65;

let game = new Game('Me, Myself, and I, and i', 448, 448);

game.start();
