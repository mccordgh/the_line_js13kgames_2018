import { Assets } from '../gfx/assets';
const TILE_WIDTH = 64, TILE_HEIGHT = 64;

export class Tile {
  constructor(texture, id) {
    this.isSolid = false;
    this.texture = texture;
    this.id = id;
    this.disappear = false;
    this.assets = Assets.getAssets("tiles");
  }

  render(g, x, y) {
    g.myDrawImage(this.texture, x, y, TILE_WIDTH, TILE_HEIGHT);
  }

  getId() {
    return this.id;
  }
}
