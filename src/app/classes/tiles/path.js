import { Tile } from './tile'

export class Path extends Tile {
  constructor(_id) {
    super(Tile.assets.path, _id);
  }
}
