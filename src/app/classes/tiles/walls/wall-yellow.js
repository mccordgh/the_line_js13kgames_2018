import { Assets } from '../../gfx/assets';
import { Tile } from '../tile';

export class WallYellow extends Tile {
  constructor(id) {
    super(Assets.getAssets('tiles').wallYellow, id);
    this.isSolid = true;
    this.disappear = true;
  }
}
