import { Assets } from '../../gfx/assets';
import { Tile } from '../tile';

export class Wall extends Tile {
  constructor(id) {
    super(id, Assets.getAssets('all').anim['wright']);
    this.anim = true;
    this.isSolid = true;
  }
}
