export class Menu {
  constructor(handler) {
    this.handler = handler;
    this.countSinceInput = 0;
  }

  tick() {
    this.countSinceInput++;
    if (this.countSinceInput > 8)
      this.getInput();

    this.render();
  }

  draw(g, text) {
    if (g) {
      g.fillStyle = "black";
      g.fillRect(0, 0, 600, 600);

      g.drawText({
        fillColor: 'red',
        text: text[0],
        fontSize: 32,
        x: 150,
        y: 150,
      });

      g.drawText({
        fillColor: 'yellow',
        text: text[1],
        fontSize: 22,
        x: 200,
        y: 225,
      });

      g.drawText({
        fillColor: 'yellow',
        text: text[2],
        fontSize: 18,
        x: 125,
        y: 275,
      });

      g.drawText({
        fillColor: 'white',
        text: text[3],
        fontSize: 32,
        x: 150,
        y: 350,
      });
    }
  }
}
