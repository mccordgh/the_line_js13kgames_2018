import { Assets } from '../../gfx/assets';
import { Tile } from '../tile';

export class SwitchBlue extends Tile {
  constructor(id) {
    super(Assets.getAssets('tiles').switchBlue, id);
    this.isSolid = true;
    this.type = 'switch';
    this.color = 'blue';
  }
}
