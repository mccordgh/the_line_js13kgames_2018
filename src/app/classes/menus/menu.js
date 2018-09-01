export class Menu {
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

  // constructor(handler) {
  //   this.handler = handler;
  //   this.c = 0;
  // }

  // tick() {
  //   this.getInput();
  //   this.render();
  // }

  // draw(g, text) {
  //   if (this.c < 999) this.c++;
  //   let x = 2 * TILE_SIZE;
  //   let y = 2 * TILE_SIZE;

  //   if (g) {
  //     g.drawText(text[0], x, y);

  //     if (this.c > 59) g.drawText(text[1], x, y + TILE_SIZE);

  //     if (this.c > 119 && text[2]) g.drawText(text[2], x, y + ( + TILE_SIZE * 2));

  //     if (this.c > 179 && text[3]) g.drawText(text[3], x, y + ( + TILE_SIZE * 4));
  //     // if (this.c > 59) g.drawText({
      //   fillColor: 'yellow',
      //   text: text[1],
      //   fontSize: 22,
      //   x,
      //   y: 225,
      // });

      // if (this.c > 119) g.drawText({
      //   fillColor: 'yellow',
      //   text: text[2],
      //   fontSize: 18,
      //   x,
      //   y: 275,
      // });

      // if (this.c > 239) g.drawText({
      //   fillColor: 'white',
      //   text: text[3],
      //   fontSize: 24,
      //   x,
      //   y: 350,
      // });
    // }
  // }
}
