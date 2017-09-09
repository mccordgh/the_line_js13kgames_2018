import { Assets } from '../../gfx/assets';
import { Tile } from '../tile';

export class SwitchGreen extends Tile {
  constructor(id) {
    super(Assets.getAssets('tiles').switchGreen, id);
    this.isSolid = true;
    this.type = 'switch';
    this.color = 'green';
  }
}
