import { Assets } from '../gfx/assets';

const TILE_WIDTH = 16;
const TILE_HEIGHT = 16;
const tiles = [];

 export class Tile {
  constructor(_texture, _id) {
    this.isSolid = false;
    this.texture = _texture;
    this.id = _id;
    tiles[_id] = this;
    this.tiles = tiles;
    this.TILE_WIDTH = TILE_WIDTH;
    this.TILE_HEIGHT = TILE_HEIGHT;
    this.assets = Assets.getAssets("tiles");
  }

  tick(_dt) {
    //
  }

  render(_g, _x, _y) {
    _g.myDrawImage(this.texture, _x, _y, TILE_WIDTH, TILE_HEIGHT);
  }

  getId() {
    return this.id;
  }
}

