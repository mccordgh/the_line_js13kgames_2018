export class Menu {
  constructor(handler) {
    this.handler = handler;
    this.countSinceInput = 0;
  }

  tick(dt) {
    this.countSinceInput++;
    if (this.countSinceInput > 8)
      this.getInput(dt);

    this.render();
  }

  render() {
    alert ('all menus need a render!');
  }

  getInput() {
    alert ('all menus need getInput!');
  }

}
