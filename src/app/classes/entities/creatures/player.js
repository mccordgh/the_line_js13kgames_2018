import { Assets } from '../../gfx/assets';
import { Creature } from './creature';
import { Rectangle } from '../../gfx/shapes/rectangle';


let getDevInput = false, inputCounter = 0;

export class Player extends Creature {
  constructor(handler, x, y){
    super(handler, x, y);
    this.assets = Assets.getAssets('tiles');
    this.x = x;
    this.y = y;
    this.speed = 140;
    this.bounds.x = 14;
    this.bounds.y = 24;
    this.bounds.width = 36;
    this.bounds.height = 39;
    this.type = 'player';
    this.clipping = false;
    this.invincible = false;
    this.superSpeed = false;
    this.allCheats = false;
    this.lastAnimation = 'pwalk_down';
  }

  tick(dt) {
    this.xMove = this.yMove = 0;

    this.getInput(dt);

    super.tick(dt);

    this.move();
    if (this.superSpeed) {
      this.move();
      this.move();
    }

    this.handler.getGameCamera().centerOnEntity(this);
  }

  render(g) {
    g.myDrawImage(this.getCurrentAnimationFrame(), this.x - this.handler.getGameCamera().getxOffset(), this.y - this.handler.getGameCamera().getyOffset(), TILE_WIDTH, TILE_HEIGHT);

    // ****** DRAW BOUNDING BOX DON'T DELETE!!
    // g.fillStyle = "green";
    // g.fillRect(this.bounds.x + this.x - this.handler.getGameCamera().getxOffset(), this.bounds.y + this.y - this.handler.getGameCamera().getyOffset(), this.bounds.width, this.bounds.height);
    // ****** DRAW BOUNDING BOX DON'T DELETE!!
  }

  getInput(dt) {
    let manager = this.handler.getKeyManager();

    if(manager.up || manager.w || manager.z) {
      this.yMove = -this.speed * dt;
    }
    if (manager.down || manager.s) {
      this.yMove = this.speed * dt;
    }
    if(manager.left || manager.a || manager.q) {
      this.xMove = -this.speed * dt;
    }
    if (manager.right || manager.d) {
      this.xMove = this.speed * dt;
    }
  }
}
