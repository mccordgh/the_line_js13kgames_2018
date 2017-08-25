import { Assets } from '../../gfx/assets';
import { Creature } from './creature';
import { Rectangle } from '../../gfx/shapes/rectangle';
// var lastAnimation = "walk_down";//, attackCounter = 0, lastAttackCounter = 0;
const TILE_HEIGHT = 64, TILE_WIDTH = 64;
let getDevInput = false, inputCounter = 0;

export class Player extends Creature {
  constructor(_handler, _x, _y){
    super(_handler, _x, _y);
    this.assets = Assets.getAssets('creatures');
    this.x = _x;
    this.y = _y;
    this.speed = 350;
    this.bounds.x = 6;
    this.bounds.y = 6;
    this.bounds.width = TILE_WIDTH - (this.bounds.x * 2);
    this.bounds.height = TILE_HEIGHT - (this.bounds.y * 2);
    this.type = 'player';
    this.clipping = false;
    this.invincible = false;
    this.superSpeed = false;
  }

  tick(_dt) {
      this.getInput(_dt);
      this.move();
      if (this.superSpeed) {
        this.move();
        this.move();
      }
      this.handler.getGameCamera().centerOnEntity(this);
      // if (this.yMove < 0)
      //   this.assets.animations.walk_up.tick();
      // if (this.yMove > 0)
      //   this.assets.animations.walk_down.tick();
      // if (this.xMove > 0)
      //   this.assets.animations.walk_right.tick();
      // if (this.xMove < 0)
      //   this.assets.animations.walk_left.tick();
  }

  render(_g) {
    _g.myDrawImage(this.getCurrentAnimationFrame(), this.x - this.handler.getGameCamera().getxOffset(), this.y - this.handler.getGameCamera().getyOffset(), TILE_WIDTH, TILE_HEIGHT);

    // ****** DRAW BOUNDING BOX DON'T DELETE!!
    // _g.fillStyle = "red";
    // _g.fillRect(this.bounds.x + this.x - this.handler.getGameCamera().getxOffset(), this.bounds.y + this.y - this.handler.getGameCamera().getyOffset(), this.bounds.width, this.bounds.height);
    // ****** DRAW BOUNDING BOX DON'T DELETE!!
  }

  getInput(_dt) {
    this.xMove = 0;
    this.yMove = 0;

    if(this.handler.getKeyManager().up) {
      this.yMove = -this.speed * _dt;
    }
    if (this.handler.getKeyManager().down) {
      this.yMove = this.speed * _dt;
    }
    if(this.handler.getKeyManager().left) {
      this.xMove = -this.speed * _dt;
    }
    if (this.handler.getKeyManager().right) {
      this.xMove = this.speed * _dt;
    }

    if (!getDevInput) inputCounter++;

    if (inputCounter > 15 || getDevInput) {
      getDevInput = true;
      inputCounter = 0;
      if (this.handler.getKeyManager().i) {
        //invincible
        const msg = this.invincible ? 'invincibility disabled' : 'invincibility enabled';

        this.handler.devMessage(msg);

        this.invincible = !this.invincible;

        getDevInput = false;
      }

      if (this.handler.getKeyManager().c) {
        //clipping
        const msg = this.clipping ? 'clipping disabled' : 'clipping enabled';

        this.handler.devMessage(msg);

        this.clipping = !this.clipping;
        getDevInput = false;
      }

      if (this.handler.getKeyManager().x) {
        //super speed
        const msg = this.superSpeed ? 'super speed disabled' : 'super speed enabled';

        this.handler.devMessage(msg);

        this.superSpeed = !this.superSpeed;
        getDevInput = false;
      }
    }
  }

  getCurrentAnimationFrame() {
    return this.assets.playerDown;
    // if (this.yMove < 0){
    //   lastAnimation = "walk_up";
    //   return this.assets.animations.walk_up.getCurrentFrame();
    // } else if (this.yMove > 0){
    //   lastAnimation = "walk_down";
    //   return this.assets.animations.walk_down.getCurrentFrame();
    // } else if (this.xMove < 0){
    //   lastAnimation = "walk_left";
    //   return this.assets.animations.walk_left.getCurrentFrame();
    // } else if (this.xMove > 0){
    //   lastAnimation = "walk_right";
    //   return this.assets.animations.walk_right.getCurrentFrame();
    // } else {
    //   return this.assets.animations[lastAnimation].getCurrentFrame();
    // }
  }
}
