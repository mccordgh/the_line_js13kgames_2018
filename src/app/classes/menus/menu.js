export class Menu {
  constructor(_handler) {
    this.handler = _handler;
    this.countSinceInput = 0;
  }

  tick(_dt) {
    this.countSinceInput++;
    if (this.countSinceInput > 8)
      this.getInput(_dt);

    this.render();
  }

  render() {
    alert ('all menus need a render!');
  }

  getInput() {
    alert ('all menus need getInput!');
  }

}
