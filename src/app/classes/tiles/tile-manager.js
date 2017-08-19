import { Assets } from '../gfx/assets';
import { Path } from './path';
import { Wall } from './wall';

const assets = Assets.getAssets("tiles");
const tiles = [];

tiles[0] = new Path(0);
tiles[1] = new Wall(1);

 export class TileManager {

  static getAssets() {
    // console.log(assets);
    return assets;
  }

  static getTiles() {
    return tiles;
  }
}

