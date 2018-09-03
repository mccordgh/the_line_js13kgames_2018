import { Path } from './paths/path';
import { Wall } from './walls/wall';
import { Grass } from './paths/grass';
import { Flower } from './paths/flower';

let tiles = [];

tiles[0] = new Path(0);
tiles[1] = new Wall(1);
tiles[2] = new Grass(2);
tiles[3] = new Flower(3);

 export class TileManager {
  static getAssets() {
    return assets;
  }

  static getTiles() {
    return tiles;
  }
}

