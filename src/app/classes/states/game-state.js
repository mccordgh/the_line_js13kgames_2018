import { World } from '../worlds/world';

export class GameState {
  constructor(_handler) {
    this.handler = _handler;
    this.world = new World(_handler);
  }

  tick(_dt) {
      this.world.tick(_dt);
  }

  render(_g) {
      this.world.render(_g);
  }
}
