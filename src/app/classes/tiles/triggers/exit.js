import { Assets } from '../../gfx/assets';
import { Tile } from '../tile';

export class Exit extends Tile {
  constructor(id) {
    super(Assets.getAssets('tiles').exit, id);
    this.isSolid = true;
    this.type = 'exit';
  }
}
