import { Assets } from '../gfx/assets';
import { Tile } from './tile';

export class PathGreen extends Tile {
  constructor(_id) {
    super(Assets.getAssets('tiles').pathGreen, _id);
  }
}
