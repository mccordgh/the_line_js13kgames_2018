export class Menu {
  constructor(handler, world) {
    this.handler = handler;
    this.world = world;
  }

  tick(dt) {
      if (this.world) this.world.tick(dt);
      this.getInput();
  }

  render(g) {
      if (this.world) this.world.render(g);
  }
}
