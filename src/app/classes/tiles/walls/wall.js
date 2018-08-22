import { Tile } from '../tile';

export class Wall extends Tile {
  constructor(id) {
    super();
    this.isSolid = true;
  }

  render(g, x, y) {
    g.fillStyle = 'white';
    g.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  }
}
