import { Assets } from '../../gfx/assets';
import { Tile } from '../tile';

export class Wall extends Tile {
  constructor(id) {
    super(Assets.getAssets('tiles').wall, id);
    this.isSolid = true;
  }
}
