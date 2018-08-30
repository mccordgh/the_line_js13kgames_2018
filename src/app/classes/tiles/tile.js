export class Tile {
  constructor(id, texture) {
    this.anim = false;
    this.isSolid = false;
    this.texture = texture;
    this.id = id;
  }

  // tick() {
    // if (this.anim) {
      // this.texture.tick();
    // }
  // }

  render(g, x, y) {
    let t = this.anim ? this.texture.getCurrentFrame() : this.texture;

    g.myDrawImage(t, x, y, TILE_SIZE, TILE_SIZE);
  }

  getId() {
    return this.id;
  }
}
