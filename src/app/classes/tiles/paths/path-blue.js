import { Assets } from '../../gfx/assets';
import { Tile } from '../tile';

export class PathBlue extends Tile {
  constructor(_id) {
    super(Assets.getAssets('tiles').pathBlue, _id);
  }
}
