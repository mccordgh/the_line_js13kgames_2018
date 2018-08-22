import { Assets } from '../../gfx/assets';
import { Tile } from '../tile';

export class Wall extends Tile {
  constructor(id) {
    // super(Assets.gA('tiles').path, id);
    super();
    this.isSolid = true;
  }

  render(g, x, y) {
    g.strokeStyle = '#FFFFFF';
    g.rect(x, y, TILE_SIZE, TILE_SIZE);
    g.stroke();
  }
}
