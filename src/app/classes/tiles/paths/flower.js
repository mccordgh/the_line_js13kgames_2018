import { Tile } from '../tile';
import { Assets } from '../../gfx/assets';

export class Flower extends Tile {
  constructor(id) {
    super(id);
    this.isSolid = true;
    this.assets = Assets.getAssets('all').anim['grassright'];
  }

  render(g, x, y, size) {
    g.myDrawImage(this.assets.getStillFrame(1),  x, y, size, size);
  }
}
