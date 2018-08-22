import { Assets } from '../../gfx/assets';
import { Tile } from '../tile';

export class Path extends Tile {
  constructor(id) {
    // super(Assets.gA('tiles').path, id);
    super();
  }

  render(g, x, y) {
    g.strokeStyle = 'white';
    g.rect(x, y, TILE_SIZE, TILE_SIZE);
    g.stroke();
    // g.fillStyle = 'blue';
    // g.fill();
  }
}
