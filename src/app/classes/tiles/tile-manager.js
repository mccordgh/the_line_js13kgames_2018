import { Assets } from '../gfx/assets';
import { Exit } from './triggers/exit';
import { Path } from './paths/path';
import { PathBlue } from './paths/path-blue';
import { PathYellow } from './paths/path-yellow';
import { Wall } from './walls/wall';
import { WallBlue } from './walls/wall-blue';
import { WallYellow } from './walls/wall-yellow';
import { SwitchBlue } from './switches/switch-blue';
import { PathGreen } from './paths/path-green';
import { WallGreen } from './walls/wall-green';
import { SwitchGreen } from './switches/switch-green';

const assets = Assets.getAssets("tiles");
const tiles = [];

tiles[0] = new Path(0);
tiles[1] = new Wall(1);
tiles[2] = new WallYellow(2);
tiles[3] = new WallBlue(3);
tiles[4] = new PathYellow(4);
tiles[5] = new PathBlue(5);
// tiles[6] = new SwitchBlue(6);
tiles[7] = new PathGreen(7);
tiles[8] = new WallGreen(8);
// tiles[9] = new SwitchGreen(9);
// tiles[10] = new Exit(10);

 export class TileManager {

  static getAssets() {
    return assets;
  }

  static getTiles() {
    return tiles;
  }
}

