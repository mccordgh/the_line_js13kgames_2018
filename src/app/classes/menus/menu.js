export class Menu {
  constructor(handler) {
    this.handler = handler;
    this.cI = 0;
    this.c = 0;
  }

  tick() {
    this.cI++;
    if (this.cI > 8 && this.c > 479)
      this.getInput();

    this.render();
  }

  draw(g, text) {
    if (this.c < 480) this.c++;

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

      if (this.c > 119) g.drawText({
        fillColor: 'yellow',
        text: text[1],
        fontSize: 22,
        x: 200,
        y: 225,
      });

      if (this.c > 239) g.drawText({
        fillColor: 'yellow',
        text: text[2],
        fontSize: 18,
        x: 125,
        y: 275,
      });

      if (this.c > 479) g.drawText({
        fillColor: 'white',
        text: text[3],
        fontSize: 32,
        x: 150,
        y: 350,
      });
    }
  }
}
