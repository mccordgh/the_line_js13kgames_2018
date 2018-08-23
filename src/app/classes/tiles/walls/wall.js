import { Assets } from '../../gfx/assets';
import { Tile } from '../tile';

export class Wall extends Tile {
  constructor(id) {
    super(Assets.getAssets('wall').wall, id);
    this.isSolid = true;
  }
}
