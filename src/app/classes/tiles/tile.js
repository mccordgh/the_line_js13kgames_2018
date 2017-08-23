import { Assets } from '../gfx/assets';
const TILE_WIDTH = 48, TILE_HEIGHT = 48;

export class Tile {
  constructor(_texture, _id) {
    this.isSolid = false;
    this.texture = _texture;
    this.id = _id;
    this.assets = Assets.getAssets("tiles");
  }

  render(_g, _x, _y) {
    _g.myDrawImage(this.texture, _x, _y, TILE_WIDTH, TILE_HEIGHT);
  }

  getId() {
    return this.id;
  }
}
