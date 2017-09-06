import { Assets } from '../gfx/assets';
const TILE_WIDTH = 64, TILE_HEIGHT = 64;

export class Tile {
  constructor(_texture, _id) {
    this.isSolid = false;
    this.texture = _texture;
    this.id = _id;
    // this.light = 0.6;
    this.assets = Assets.getAssets("tiles");
  }

  render(_g, _x, _y) {
    _g.myDrawImage(this.texture, _x, _y, TILE_WIDTH, TILE_HEIGHT);
  }

  getId() {
    return this.id;
  }
}
