import { Tile } from '../tile';

export class Path extends Tile {
  constructor(id) {
    super(id);
    this.isSolid = false;
  }

  render() {}
}
