import { Ending } from '../../menus/ending';
import { Entity } from '../entity';
import { Rectangle } from '../../gfx/shapes/rectangle';
import { World } from '../../worlds/world';


const DEFAULT_SPEED = 100,
  DEFAULT_HEALTH = 200,
  DEFAULT_CREATURE_WIDTH = 64,
  DEFAULT_CREATURE_HEIGHT = 64,
  TILE_WIDTH = 64,
  TILE_HEIGHT = 64;

export class Creature extends Entity {
  constructor(_handler, _x, _y) {
    super(_handler, _x, _y, DEFAULT_CREATURE_WIDTH, DEFAULT_CREATURE_HEIGHT);
    this.health = DEFAULT_HEALTH;
    this.speed = DEFAULT_SPEED;
    this.xMove = 0;
    this.yMove = 0;
  }

  tick() {
    if (this.yMove < 0)
      this.assets.animations.walk_up.tick();
    if (this.yMove > 0)
      this.assets.animations.walk_down.tick();
    if (this.xMove > 0)
      this.assets.animations.walk_right.tick();
    if (this.xMove < 0)
      this.assets.animations.walk_left.tick();
  }

  move() {
    if(Math.abs(this.xMove) > 0 || Math.abs(this.yMove) > 0){
      this.handler.getWorld().getSpatialGrid().remove(new Rectangle(this.x + this.bounds.x, this.y + this.bounds.y, this.bounds.width, this.bounds.height), this);
      if(!(this.checkEntityCollisions(this.xMove, 0)))
        this.moveX();
      if(!(this.checkEntityCollisions(0, this.yMove)))
        this.moveY();
      this.handler.getWorld().getSpatialGrid().insert(new Rectangle(this.x + this.bounds.x, this.y + this.bounds.y, this.bounds.width, this.bounds.height), this);
    }
  }

  moveX() {
    if (this.clipping) {
      this.x += this.xMove;
      return;
    }

    const tempX = this.xMove > 0
      ? parseInt((this.x + this.xMove + this.bounds.x + this.bounds.width) / TILE_WIDTH)
      : parseInt((this.x + this.xMove + this.bounds.x) / TILE_WIDTH);

    const c1 = parseInt((this.y + this.bounds.y) / TILE_HEIGHT);
    const c2 = parseInt((this.y + this.bounds.y + this.bounds.height) / TILE_HEIGHT);

    const setX = this.xMove > 0
      ? tempX * TILE_WIDTH - this.bounds.x - this.bounds.width - 1
      : tempX * TILE_WIDTH + TILE_WIDTH - this.bounds.x;

      if(!this.collisionWithTile(tempX, c1) && !this.collisionWithTile(tempX, c2)) {
      this.x += this.xMove;
    } else {
      this.x = setX;
      if (this.type === 'player') this.checkForSwitchOrTrigger(c1, c2, tempX);
    }
  }

  moveY() {
    if (this.clipping) {
      this.y += this.yMove;
      return;
    }

    const tempY = this.yMove > 0
      ? parseInt((this.y + this.yMove + this.bounds.y + this.bounds.height) / TILE_HEIGHT)
      : parseInt((this.y + this.yMove + this.bounds.y) / TILE_HEIGHT);

    const c1 = parseInt((this.x + this.bounds.x) / TILE_WIDTH);
    const c2 = parseInt((this.x + this.bounds.x + this.bounds.width) / TILE_WIDTH);

    const setY = this.yMove > 0
      ? tempY * TILE_HEIGHT - this.bounds.y - this.bounds.height - 1
      : tempY * TILE_HEIGHT + TILE_HEIGHT - this.bounds.y;

    if (!this.collisionWithTile(c1, tempY) && !this.collisionWithTile(c2, tempY)) {
      this.y += this.yMove;
    } else {
      this.y = setY;
      if (this.type === 'player') this.checkForSwitchOrTrigger(c1, c2, tempY);
    }
  }

  checkForSwitchOrTrigger(c1, c2, temp) {
    const tile1 = this.handler.getWorld().getTile(c1, temp);
    const tile2 = this.handler.getWorld().getTile(c2, temp);

    if (tile1.type === 'switch') {
      this.handler.getWorld().swapGreenAndBlueTiles(tile1.color);
    } else if (tile2.type === 'switch') {
      this.handler.getWorld().swapGreenAndBlueTiles(tile2.color);
    }

    if (tile1.type === 'exit' || tile2.type === 'exit') {
      if (this.handler.getWorld().level >= 4) {
        const ending = new Ending(this.handler);
        this.handler.getGame().getGameState().setState(ending);
      }

      this.handler.getWorld().changeLevel();
    }
  }

  collisionWithTile(_x, _y) {
    // try {
      return this.handler.getWorld().getTile(_x, _y).isSolid;
    // }
    // catch(e) {
    // }
  }

  getCurrentAnimationFrame() {
    if (this.yMove < 0){
      this.lastAnimation = "walk_up";
      return this.assets.animations.walk_up.getCurrentFrame();
    } else if (this.yMove > 0){
      this.lastAnimation = "walk_down";
      return this.assets.animations.walk_down.getCurrentFrame();
    } else if (this.xMove < 0){
      this.lastAnimation = "walk_left";
      return this.assets.animations.walk_left.getCurrentFrame();
    } else if (this.xMove > 0){
      this.lastAnimation = "walk_right";
      return this.assets.animations.walk_right.getCurrentFrame();
    } else {
      return this.assets.animations[this.lastAnimation].getCurrentFrame();
    }
  }
}
