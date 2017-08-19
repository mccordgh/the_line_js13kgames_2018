import { Assets } from '../gfx/assets';
import { Tile } from './tile';

export class Path extends Tile {
  constructor(_id) {
    super(Assets.getAssets('tiles').path, _id);
  }
}
