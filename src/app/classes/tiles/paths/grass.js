import { Tile } from '../tile';
import { Assets } from '../../gfx/assets';

export class Grass extends Tile {
  constructor(id) {
    super(id);
    this.isSolid = false;
    this.assets = Assets.getAssets('all').anim['grassright'];
  }

  render(g, x, y, size) {
    g.myDrawImage(this.assets.getStillFrame(0),  x, y, size, size);
  }
}
