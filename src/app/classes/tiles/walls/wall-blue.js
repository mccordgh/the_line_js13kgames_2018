import { Assets } from '../../gfx/assets';
import { Tile } from '../tile';

export class WallBlue extends Tile {
  constructor(_id) {
    super(Assets.getAssets('tiles').wallBlue, _id);
    this.isSolid = true;
  }
}
