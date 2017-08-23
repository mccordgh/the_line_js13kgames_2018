import { Assets } from '../../gfx/assets';
import { Tile } from '../tile';

export class Wall extends Tile {
  constructor(_id) {
    super(Assets.getAssets('tiles').wall, _id);
    this.isSolid = true;
  }
}
