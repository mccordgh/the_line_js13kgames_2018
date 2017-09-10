import { Assets } from '../gfx/assets';

export class Tile {
  constructor(texture, id) {
    this.isSolid = false;
    this.texture = texture;
    this.id = id;
    this.assets = Assets.getAssets("tiles");
  }

  render(g, x, y) {
    g.myDrawImage(this.texture, x, y, TILE_WIDTH, TILE_HEIGHT);
  }

  getId() {
    return this.id;
  }
}
