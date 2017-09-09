import { Assets } from '../../gfx/assets';
import { Tile } from '../tile';

export class PathGreen extends Tile {
  constructor(id) {
    super(Assets.getAssets('tiles').pathGreen, id);
  }
}
