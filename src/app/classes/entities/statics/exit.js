import { Assets } from '../../gfx/assets';
import { StaticEntity } from './static-entity';

export class Exit extends StaticEntity {
  constructor(handler, x, y, width, height) {
    super(handler, x, y, width, height);
    this.assets = Assets.getAssets('tiles');
    this.type = 'exit';
    this.bounds.x = 10;
    this.bounds.y = 10;
    this.bounds.width = this.width - 20;
    this.bounds.height = this.height - 20;
  }

  tick(){
    //
  }

  render(_g) {
    _g.myDrawImage(this.assets.exit,
      this.x - this.handler.getGameCamera().getxOffset(),
      this.y - this.handler.getGameCamera().getyOffset(),
      this.width,
      this.height);

    // ****** DRAW BOUNDING BOX DON'T DELETE!!
    // _g.fillStyle = "white";
    // _g.fillRect(this.bounds.x + this.x - this.handler.getGameCamera().getxOffset(), this.bounds.y + this.y - this.handler.getGameCamera().getyOffset(), this.bounds.width, this.bounds.height);
    // ****** DRAW BOUNDING BOX DON'T DELETE!!
  }
}
