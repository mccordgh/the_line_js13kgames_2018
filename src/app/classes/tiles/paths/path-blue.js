import { Assets } from '../../gfx/assets';
import { Tile } from '../tile';

export class PathBlue extends Tile {
  constructor(id) {
    super(Assets.getAssets('tiles').pathBlue, id);
  }
}
