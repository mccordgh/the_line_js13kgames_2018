import { Assets } from '../../gfx/assets';
import { Tile } from '../tile';

export class PathYellow extends Tile {
  constructor(id) {
    super(Assets.getAssets('tiles').pathYellow, id);
  }
}
