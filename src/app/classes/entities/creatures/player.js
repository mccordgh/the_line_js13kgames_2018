import { Assets } from '../../gfx/assets';
import { Creature } from './creature';
import { Rectangle } from '../../gfx/shapes/rectangle';


const TILE_HEIGHT = 64, TILE_WIDTH = 64;
let getDevInput = false, inputCounter = 0;

export class Player extends Creature {
  constructor(_handler, _x, _y){
    super(_handler, _x, _y);
    this.assets = Assets.getAssets('sprites');
    this.x = _x;
    this.y = _y;
    this.speed = 90;
    this.bounds.x = 14;
    this.bounds.y = 24;
    this.bounds.width = 36;
    this.bounds.height = 39;
    this.type = 'player';
    this.clipping = false;
    this.invincible = false;
    this.superSpeed = false;
    this.allCheats = false;
    this.lastAnimation = 'walk_down';
  }

  tick(_dt) {
    this.xMove = this.yMove = 0;

    this.getInput(_dt);

    super.tick(_dt);

    this.move();
    if (this.superSpeed) {
      this.move();
      this.move();
    }

    this.handler.getGameCamera().centerOnEntity(this);
  }

  render(_g) {
    _g.myDrawImage(this.getCurrentAnimationFrame(), this.x - this.handler.getGameCamera().getxOffset(), this.y - this.handler.getGameCamera().getyOffset(), TILE_WIDTH, TILE_HEIGHT);

    // ****** DRAW BOUNDING BOX DON'T DELETE!!
    // _g.fillStyle = "green";
    // _g.fillRect(this.bounds.x + this.x - this.handler.getGameCamera().getxOffset(), this.bounds.y + this.y - this.handler.getGameCamera().getyOffset(), this.bounds.width, this.bounds.height);
    // ****** DRAW BOUNDING BOX DON'T DELETE!!
  }

  getInput(_dt) {
    const manager = this.handler.getKeyManager();

    if(manager.up || manager.w || manager.z) {
      this.yMove = -this.speed * _dt;
    }
    if (manager.down || manager.s) {
      this.yMove = this.speed * _dt;
    }
    if(manager.left || manager.a || manager.q) {
      this.xMove = -this.speed * _dt;
    }
    if (manager.right || manager.d) {
      this.xMove = this.speed * _dt;
    }

    if (!getDevInput) inputCounter++;

    if (inputCounter > 15 || getDevInput) {
      getDevInput = true;
      inputCounter = 0;
      if (manager.one) {
        //all cheats
        const msg = this.allCheats ? ' ALL CHEATS disabled ' : ' ALL CHEATS enabled ';

        this.handler.devMessage(msg);

        this.allCheats = !this.allCheats;

        this.clipping = this.allCheats;
        this.invincible = this.allCheats;
        this.superSpeed = this.allCheats;

        getDevInput = false;
      }

      if (manager.three) {
        //invincible
        const msg = this.invincible ? ' invincibility disabled ' : ' invincibility enabled ';

        this.handler.devMessage(msg);

        this.invincible = !this.invincible;

        getDevInput = false;
      }

      if (manager.two) {
        //clipping
        const msg = this.clipping ? ' clipping disabled ' : ' clipping enabled ';

        this.handler.devMessage(msg);

        this.clipping = !this.clipping;
        getDevInput = false;
      }

      if (manager.four) {
        //super speed
        const msg = this.superSpeed ? ' super speed disabled ' : ' super speed enabled ';

        this.handler.devMessage(msg);

        this.superSpeed = !this.superSpeed;
        getDevInput = false;
      }
    }
  }

  // getCurrentAnimationFrame() {
  //   if (this.yMove < 0){
  //     lastAnimation = "walk_up";
  //     return this.assets.animations.walk_up.getCurrentFrame();
  //   } else if (this.yMove > 0){
  //     lastAnimation = "walk_down";
  //     return this.assets.animations.walk_down.getCurrentFrame();
  //   } else if (this.xMove < 0){
  //     lastAnimation = "walk_left";
  //     return this.assets.animations.walk_left.getCurrentFrame();
  //   } else if (this.xMove > 0){
  //     lastAnimation = "walk_right";
  //     return this.assets.animations.walk_right.getCurrentFrame();
  //   } else {
  //     return this.assets.animations[lastAnimation].getCurrentFrame();
  //   }
  // }
}
