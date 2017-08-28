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
    alert ('overwrite this menu render bro');
  }

  getInput() {
    alert ('overwrite this menu input bro');
  }

}
