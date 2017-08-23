import { Assets } from '../../gfx/assets';
import { Tile } from '../tile';

export class SwitchBlue extends Tile {
  constructor(_id) {
    super(Assets.getAssets('tiles').switchBlue, _id);
    this.isSolid = true;
  }
}
