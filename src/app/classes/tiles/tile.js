export class Tile {
  constructor(id, texture) {
    this.anim = false;
    this.isSolid = false;
    this.texture = texture;
    this.id = id;
  }

  render(g, x, y, size) {
    let t = this.anim ? this.texture.getCurrentFrame() : this.texture;

    g.myDrawImage(t, x, y, size);
  }

  getId() {
    return this.id;
  }
}
