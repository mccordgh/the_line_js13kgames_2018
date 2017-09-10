import { Assets } from '../gfx/assets';
import { Path } from './paths/path';
import { PathYellow } from './paths/path-yellow';
import { Wall } from './walls/wall';
import { WallYellow } from './walls/wall-yellow';
// import { PathGreen } from './paths/path-green';
// import { WallGreen } from './walls/wall-green';

let assets = Assets.getAssets("tiles");
let tiles = [];

tiles[0] = new Path(0);
tiles[1] = new Wall(1);
tiles[2] = new WallYellow(2);
tiles[4] = new PathYellow(4);
// tiles[7] = new PathGreen(7);
// tiles[8] = new WallGreen(8);

 export class TileManager {

  static getAssets() {
    return assets;
  }

  static getTiles() {
    return tiles;
  }
}

