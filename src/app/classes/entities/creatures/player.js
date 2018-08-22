import { Assets } from '../../gfx/assets';
import { Creature } from './creature';

export class Player extends Creature {
  constructor(handler, x, y){
    super(handler, x, y);
    // this.a = Assets.gA('tiles');
    this.x = x * TILE_SIZE;
    this.y = y * TILE_SIZE;
    // this.speed = 110;
    // this.type = 'player';
    // this.lA = 'pwalk_down';
  }

  tick(dt) {
    this.xMove = this.yMove = 0;
    // this.getInput(dt);
    super.tick(dt);
    this.move();
  }

  render(g) {
    g.fillStyle = "#FFFF00";
    g.fillRect(this.x, this.y, TILE_SIZE, TILE_SIZE);
    // g.myDrawImage(this.getCurrentAnimationFrame(), this.x, this.y, TILE_SIZE, TILE_SIZE);
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
