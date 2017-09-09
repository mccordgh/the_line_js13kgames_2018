import { World } from '../worlds/world';

export class GameState {
  constructor(handler) {
    this.handler = handler;
    this.world = new World(handler);
  }

  tick(dt) {
      this.world.tick(dt);
  }

  render(g) {
      this.world.render(g);
  }
}
