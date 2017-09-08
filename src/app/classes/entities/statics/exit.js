import { Assets } from '../../gfx/assets';
import { StaticEntity } from './static-entity';

export class Exit extends StaticEntity {
  constructor(_id) {
    super(Assets.getAssets('tiles').exit, _id);
    this.isSolid = true;
    this.type = 'exit';
  }
}
