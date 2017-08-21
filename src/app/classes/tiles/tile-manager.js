import { Assets } from '../gfx/assets';
import { Path } from './path';
import { Wall } from './wall';
import { WallBlue } from './wall-blue';
import {WallYellow} from './wall-yellow';

const assets = Assets.getAssets("tiles");
const tiles = [];

tiles[0] = new Path(0);
tiles[1] = new Wall(1);
tiles[2] = new WallYellow(2);
tiles[3] = new WallBlue(3);

 export class TileManager {

  static getAssets() {
    return assets;
  }

  static getTiles() {
    return tiles;
  }
}

