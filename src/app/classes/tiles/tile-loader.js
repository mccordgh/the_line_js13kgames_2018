import { Path } from './path';
import { Wall } from './wall';

export class TileLoader {
  constructor() {
    this.pathTile = new Path(0);
    this.wallTile = new Wall(1);
  }
}
