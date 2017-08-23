import { Assets } from '../../gfx/assets';
import { Tile } from '../tile';

export class PathYellow extends Tile {
  constructor(_id) {
    super(Assets.getAssets('tiles').pathYellow, _id);
  }
}
