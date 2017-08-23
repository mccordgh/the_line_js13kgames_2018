import { Assets } from '../../gfx/assets';
import { Tile } from '../tile';

export class SwitchGreen extends Tile {
  constructor(_id) {
    super(Assets.getAssets('tiles').switchGreen, _id);
    this.isSolid = true;
  }
}
