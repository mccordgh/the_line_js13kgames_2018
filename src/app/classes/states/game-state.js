import { World } from '../worlds/world';

export class GameState {
  constructor(handler, world) {
    this.handler = handler;
    this.world = world;
  }

  tick(dt) {
      this.world.tick(dt);
  }

  render(g) {
      this.world.render(g);
  }
}
