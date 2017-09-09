import { Assets } from '../../gfx/assets';
import { Tile } from '../tile';

export class WallBlue extends Tile {
  constructor(id) {
    super(Assets.getAssets('tiles').wallBlue, id);
    this.isSolid = true;
  }
}
