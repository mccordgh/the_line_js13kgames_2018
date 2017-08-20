import { Entity } from '../entity';
import { Rectangle } from '../../gfx/shapes/rectangle';

const DEFAULT_SPEED = 90,
  DEFAULT_HEALTH = 200,
  DEFAULT_CREATURE_WIDTH = 64,
  DEFAULT_CREATURE_HEIGHT = 64,
  TILE_WIDTH = 64,
  TILE_HEIGHT = 64;
  // dying = 0,
  // deathInterval = 0,
  // tempEntity = null;

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
    var tempX;
    if (this.xMove > 0) {
      tempX = parseInt((this.x + this.xMove + this.bounds.x + this.bounds.width) / TILE_WIDTH);
      if(!this.collisionWithTile(tempX, parseInt((this.y + this.bounds.y) / TILE_HEIGHT)) &&
        !this.collisionWithTile(tempX, parseInt((this.y + this.bounds.y + this.bounds.height) / TILE_HEIGHT))) {
        this.x += this.xMove;
      } else {
        this.x = tempX * TILE_WIDTH - this.bounds.x - this.bounds.width - 1;
      }
    } else if (this.xMove < 0) {
      tempX = parseInt((this.x + this.xMove + this.bounds.x) / TILE_WIDTH);
      if(!this.collisionWithTile(tempX, parseInt((this.y + this.bounds.y) / TILE_HEIGHT)) &&
        !this.collisionWithTile(tempX, parseInt((this.y + this.bounds.y + this.bounds.height) / TILE_HEIGHT))) {
        this.x += this.xMove;
      } else {
        this.x = tempX * TILE_WIDTH + TILE_WIDTH - this.bounds.x;
      }
    }
  }

  moveY() {
    var tempY;
    if (this.yMove > 0) {
      tempY = parseInt((this.y + this.yMove + this.bounds.y + this.bounds.height) / TILE_HEIGHT);
      if(!this.collisionWithTile(parseInt((this.x + this.bounds.x) / TILE_WIDTH), tempY) &&
        !this.collisionWithTile(parseInt((this.x + this.bounds.x + this.bounds.width) / TILE_WIDTH), tempY)) {
        this.y += this.yMove;
      } else {
        this.y = tempY * TILE_HEIGHT - this.bounds.y - this.bounds.height - 1;
      }
    } else if (this.yMove < 0) {
      tempY = parseInt((this.y + this.yMove + this.bounds.y) / TILE_HEIGHT);
      if(!this.collisionWithTile(parseInt((this.x + this.bounds.x) / TILE_WIDTH), tempY) &&
        !this.collisionWithTile(parseInt((this.x + this.bounds.x + this.bounds.width) / TILE_WIDTH), tempY)) {
        this.y += this.yMove;
      } else {
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

  takeDamage(_damage) {
    if (typeof this.healthbar !== undefined && !this.dead)
      this.health -= _damage;
    this.healthbar.update();
    if (this.health <= 0){
      this.assets.animations.death.tick();
    }
  }
}

// Creature.DEFAULT_SPEED = DEFAULT_SPEED;
// Creature.DEFAULT_HEALTH = DEFAULT_HEALTH;
// Creature.DEFAULT_CREATURE_WIDTH = DEFAULT_CREATURE_WIDTH;
// Creature.DEFAULT_CREATURE_HEIGHT = DEFAULT_CREATURE_HEIGHT;
