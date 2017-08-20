import { Assets } from '../gfx/assets';
const TILE_WIDTH = 32, TILE_HEIGHT = 32;

export class Tile {
  constructor(_texture, _id) {
    // console.log(`Tile constructor: _texture: ${_texture}, _id: ${_id}`);
    this.isSolid = false;
    this.texture = _texture;
    this.id = _id;
    this.assets = Assets.getAssets("tiles");
  }

  tick(_dt) {
    //
  }

  render(_g, _x, _y) {
    // console.log(`tile rendering: _g: ${_g}, _x: ${_x}, _y: ${_y}`)
    // console.log(_x, _y);
    // console.log(this.texture, _x, _y, TILE_WIDTH, TILE_HEIGHT);
    // _g.myDrawImage(this.texture, 100, 100, 200, 200);
    _g.myDrawImage(this.texture, _x, _y, TILE_WIDTH, TILE_HEIGHT);
    // throw new Error();
  }

  getId() {
    return this.id;
  }
}
