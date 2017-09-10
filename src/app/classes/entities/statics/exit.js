import { Assets } from '../../gfx/assets';
import { StaticEntity } from './static-entity';

export class Exit extends StaticEntity {
  constructor(handler, x, y, width, height) {
    super(handler, x, y, width, height);
    this.a = Assets.getAssets('tiles');
    this.type = 'exit';
    this.b.x = 15;
    this.b.y = 15;
    this.b.w = this.width - 30;
    this.b.height = this.height - 30;
  }

  tick(){
    //
  }

  render(g) {
    g.myDrawImage(this.a.exit,
      this.x - this.handler.getGameCamera().getxOffset(),
      this.y - this.handler.getGameCamera().getyOffset(),
      this.width,
      this.height);

    // ****** DRAW BOUNDING BOX DON'T DELETE!!
    // g.fillStyle = "white";
    // g.fillRect(this.b.x + this.x - this.handler.getGameCamera().getxOffset(), this.b.y + this.y - this.handler.getGameCamera().getyOffset(), this.b.w, this.b.height);
    // ****** DRAW BOUNDING BOX DON'T DELETE!!
  }
}
