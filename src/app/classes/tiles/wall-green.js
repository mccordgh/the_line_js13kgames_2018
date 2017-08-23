import { Assets } from '../gfx/assets';
import { Tile } from './tile';

export class WallGreen extends Tile {
  constructor(_id) {
    super(Assets.getAssets('tiles').wallGreen, _id);
    this.isSolid = true;
  }
}
