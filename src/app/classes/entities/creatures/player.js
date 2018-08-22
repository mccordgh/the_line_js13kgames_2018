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
    this.getInput();
    super.tick(dt);
    this.move();
  }

  render(g) {
    g.fillStyle = "#FFFF00";
    g.fillRect(this.x, this.y, TILE_SIZE, TILE_SIZE);
    // g.myDrawImage(this.getCurrentAnimationFrame(), this.x, this.y, TILE_SIZE, TILE_SIZE);
  }

  getInput() {
    let manager = this.handler.getKeyManager();

    if(manager.w || manager.z) {
      this.yMove = -TILE_SIZE;
    }

    if (manager.s) {
      this.yMove = TILE_SIZE;
    }

    if(manager.left || manager.a || manager.q) {
      this.xMove = -TILE_SIZE;
    }

    if (manager.right || manager.d) {
      this.xMove = TILE_SIZE;
    }
  }
}
