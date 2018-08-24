import { Assets } from '../../../gfx/assets';
import { Creature } from '.././creature';

export class Guard extends Creature {
  constructor(handler, x, y){
    super(handler, x, y);
    this.a = Assets.getAssets('all');
    this.x = x * TILE_SIZE;
    this.y = y * TILE_SIZE;
    this.speed = 140;
    this.lastAnim = (Math.random() < .5) ? 'gright' : 'gleft';
  }

  tick(dt) {
    // this.xMove = this.yMove = 0;

    // this.getInput(dt);
    super.tick(dt);
    // this.move();
  }

  render(g) {
    // g.myDrawImage(this.a.idle, this.x, this.y, TILE_SIZE, TILE_SIZE);
    g.myDrawImage(this.frame('g'), this.x, this.y, TILE_SIZE, TILE_SIZE);

    // ****** DRAW BOUNDING BOX DON'T DELETE!!
    // g.fillStyle = "red";
    // g.fillRect(this.b.x + this.x, this.b.y + this.y, this.b.s, this.b.s);
    // ****** DRAW BOUNDING BOX DON'T DELETE!!
  }

  // getInput(dt) {
  //   let manager = this.handler.getKeyManager();

  //   if(manager.up || manager.w || manager.z) {
  //     this.yMove = -this.speed * dt;
  //   }
  //   if (manager.down || manager.s) {
  //     this.yMove = this.speed * dt;
  //   }
  //   if(manager.left || manager.a || manager.q) {
  //     this.xMove = -this.speed * dt;
  //   }
  //   if (manager.right || manager.d) {
  //     this.xMove = this.speed * dt;
  //   }
  // }
}
