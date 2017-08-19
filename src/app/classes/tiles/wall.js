import { Tile } from './tile'

export class Wall extends Tile {
  constructor(_id) {
    super(Tile.assets.path, _id);
    this.isSolid = true;
  }
}
