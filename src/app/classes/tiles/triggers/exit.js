import { Assets } from '../../gfx/assets';
import { Tile } from '../tile';

export class Exit extends Tile {
  constructor(_id) {
    super(Assets.getAssets('tiles').exit, _id);
    this.isSolid = true;
    this.type = 'exit';
  }
}
