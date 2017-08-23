import { Assets } from '../../gfx/assets';
import { Tile } from '../tile';

export class WallYellow extends Tile {
  constructor(_id) {
    super(Assets.getAssets('tiles').wallYellow, _id);
    this.isSolid = true;
  }
}
