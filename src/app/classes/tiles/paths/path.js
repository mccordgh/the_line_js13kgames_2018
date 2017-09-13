import { Assets } from '../../gfx/assets';
import { Tile } from '../tile';

export class Path extends Tile {
  constructor(id) {
    super(Assets.gA('tiles').path, id);
  }
}
