import { Game } from './game';

export class Launcher {
  constructor(title, width, height) {
    this.title = title;
    this.width = width;
    this.height = height;
  }

  start() {
    this.game = new Game(this.title, this.width, this.height);
    this.game.start();
  }
}
