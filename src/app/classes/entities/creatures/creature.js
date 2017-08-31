import { Ending } from '../../menus/ending';
import { Entity } from '../entity';
import { Rectangle } from '../../gfx/shapes/rectangle';

const DEFAULT_SPEED = 120,
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
    this.init();
  }

  init() {
    //
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

    let tempX;
    if (this.xMove > 0) {
      tempX = parseInt((this.x + this.xMove + this.bounds.x + this.bounds.width) / TILE_WIDTH);
      const c1 = parseInt((this.y + this.bounds.y) / TILE_HEIGHT);
      const c2 = parseInt((this.y + this.bounds.y + this.bounds.height) / TILE_HEIGHT);
      if(!this.collisionWithTile(tempX, c1) && !this.collisionWithTile(tempX, c2)) {
        this.x += this.xMove;
      } else {
        this.x = tempX * TILE_WIDTH - this.bounds.x - this.bounds.width - 1;
        if (this.type === 'player') this.checkForSwitchOrTrigger(c1, c2, tempX);
      }
    } else if (this.xMove < 0) {
      tempX = parseInt((this.x + this.xMove + this.bounds.x) / TILE_WIDTH);
      const c1 = parseInt((this.y + this.bounds.y) / TILE_HEIGHT);
      const c2 = parseInt((this.y + this.bounds.y + this.bounds.height) / TILE_HEIGHT);
      if(!this.collisionWithTile(tempX, c1) && !this.collisionWithTile(tempX, c2)) {
        this.x += this.xMove;
      } else {
        this.x = tempX * TILE_WIDTH + TILE_WIDTH - this.bounds.x;
        if (this.type === 'player') this.checkForSwitchOrTrigger(c1, c2, tempX);
      }
    }
  }

  moveY() {
    if (this.clipping) {
      this.y += this.yMove;
      return;
    }

    let tempY;
    if (this.yMove > 0) {
      tempY = parseInt((this.y + this.yMove + this.bounds.y + this.bounds.height) / TILE_HEIGHT);
      const c1 = parseInt((this.x + this.bounds.x) / TILE_WIDTH);
      const c2 = parseInt((this.x + this.bounds.x + this.bounds.width) / TILE_WIDTH);
      if(!this.collisionWithTile(c1, tempY) &&
        !this.collisionWithTile(c2, tempY)) {
        this.y += this.yMove;
      } else {
        this.y = tempY * TILE_HEIGHT - this.bounds.y - this.bounds.height - 1;
        this.checkForSwitchOrTrigger(c1, c2, tempY);
      }
    } else if (this.yMove < 0) {
      tempY = parseInt((this.y + this.yMove + this.bounds.y) / TILE_HEIGHT);
      const c1 = parseInt((this.x + this.bounds.x) / TILE_WIDTH);
      const c2 = parseInt((this.x + this.bounds.x + this.bounds.width) / TILE_WIDTH);
      if(!this.collisionWithTile(c1, tempY) &&
        !this.collisionWithTile(c2, tempY)) {
        this.y += this.yMove;
      } else {
        this.y = tempY * TILE_HEIGHT + TILE_HEIGHT - this.bounds.y;
        this.checkForSwitchOrTrigger(c1, c2, tempY);
      }
    }
  }

  checkForSwitchOrTrigger(c1, c2, temp) {
    const tile1 = this.handler.getWorld().getTile(c1, temp);
    const tile2 = this.handler.getWorld().getTile(c2, temp);

    // console.log(tile1.type, tile2.type);

    if (tile1.type === 'switch') {
      this.handler.getWorld().swapGreenAndBlueTiles(tile1.color);
    } else if (tile2.type === 'switch') {
      this.handler.getWorld().swapGreenAndBlueTiles(tile2.color);
    }

    if (tile1.type === 'exit' || tile2.type === 'exit') {
      const ending = new Ending(this.handler);
      this.handler.getGame().getGameState().setState(ending);
    }
  }

  collisionWithTile(_x, _y) {
    // if (_x < 0 || _y < 0) {
      // console.log(`dat weird x and y bug ${_x}, ${_y}`);
      // return;
    // }
    try {
      return this.handler.getWorld().getTile(_x, _y).isSolid;
    }
    catch(e) {
      // console.log('Tile Error IN CREATURE Dummbbb');
      // console.log({_x, _y, world: this.handler.getWorld(), tile: this.handler.getWorld().getTile(_x, _y)});
    }
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
}
