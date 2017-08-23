import { Entity } from '../entity';
import { Rectangle } from '../../gfx/shapes/rectangle';

const DEFAULT_SPEED = 90,
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
    this.dead = 0;
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
    const tempX = this.xMove > 0
      ? parseInt((this.x + this.xMove + this.bounds.x + this.bounds.width) / TILE_WIDTH)
      : parseInt((this.x + this.xMove + this.bounds.x) / TILE_WIDTH);

    const c1 = this.collisionWithTile(tempX, parseInt((this.y + this.bounds.y) / TILE_HEIGHT));
    const c2 = this.collisionWithTile(tempX, parseInt((this.y + this.bounds.y + this.bounds.height) / TILE_HEIGHT));

    const setX = this.xMove > 0
      ? tempX * TILE_WIDTH - this.bounds.x - this.bounds.width - 1
      : tempX * TILE_WIDTH + TILE_WIDTH - this.bounds.x;

    if (!c1 && !c2) {
      this.x += this.xMove;
    } else {
      this.x = setX;
    }
  }

  moveY() {
    let tempY;
    if (this.yMove > 0) {
      tempY = parseInt((this.y + this.yMove + this.bounds.y + this.bounds.height) / TILE_HEIGHT);
      if(!this.collisionWithTile(parseInt((this.x + this.bounds.x) / TILE_WIDTH), tempY) &&
        !this.collisionWithTile(parseInt((this.x + this.bounds.x + this.bounds.width) / TILE_WIDTH), tempY)) {
        this.y += this.yMove;
      } else {
        console.log('y down');
        this.y = tempY * TILE_HEIGHT - this.bounds.y - this.bounds.height - 1;
      }
    } else if (this.yMove < 0) {
      tempY = parseInt((this.y + this.yMove + this.bounds.y) / TILE_HEIGHT);
      if(!this.collisionWithTile(parseInt((this.x + this.bounds.x) / TILE_WIDTH), tempY) &&
        !this.collisionWithTile(parseInt((this.x + this.bounds.x + this.bounds.width) / TILE_WIDTH), tempY)) {
        this.y += this.yMove;
      } else {
        console.log('y up');
        this.y = tempY * TILE_HEIGHT + TILE_HEIGHT - this.bounds.y;
      }
    }
  }

  collisionWithTile(_x, _y) {
    return this.handler.getWorld().getTile(_x, _y).isSolid;
  }

  getHealth() {
    return this.health;
  }
  getSpeed() {
    return this.speed;
  }

  setHealth(_health) {
    this.health = _health;
  }

  setSpeed(_speed) {
    this.speed = _speed;
  }

  // takeDamage(_damage) {
  //   if (typeof this.healthbar !== undefined && !this.dead)
  //     this.health -= _damage;
  //   this.healthbar.update();
  //   if (this.health <= 0){
  //     this.assets.animations.death.tick();
  //   }
  // }
}
