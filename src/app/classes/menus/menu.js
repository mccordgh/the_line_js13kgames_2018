export class Menu {
  constructor(handler) {
    this.handler = handler;
    this.c = 0;
  }

  tick() {
    this.getInput();
    this.render();
  }

  draw(g, text) {
    if (this.c < 240) this.c++;

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

      if (this.c > 59) g.drawText({
        fillColor: 'yellow',
        text: text[1],
        fontSize: 22,
        x: 200,
        y: 225,
      });

      if (this.c > 119) g.drawText({
        fillColor: 'yellow',
        text: text[2],
        fontSize: 18,
        x: 125,
        y: 275,
      });

      if (this.c > 239) g.drawText({
        fillColor: 'white',
        text: text[3],
        fontSize: 24,
        x: 100,
        y: 350,
      });
    }
  }
}
