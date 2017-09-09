import { Assets } from '../../gfx/assets';
import { Tile } from '../tile';

export class WallGreen extends Tile {
  constructor(id) {
    super(Assets.getAssets('tiles').wallGreen, id);
    this.isSolid = true;
  }
}
