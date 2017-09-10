import { Entity } from '../entity';
import { Rectangle } from '../../gfx/shapes/rectangle';

let n;

export class Creature extends Entity {
  constructor(handler, x, y) {
    super(handler, x, y,64, 64);
    this.speed = 60;
    this.xMove = 0;
    this.yMove = 0;
    this.b.x = 16;
    this.b.y = 24;
    this.b.w = 32;
    this.b.height = 39;
  }

  tick() {
    n = this.type === 'player' ? 'p' : 'c';

    if (this.yMove < 0)
      this.a.animations[n + 'walk_up'].tick();
    if (this.yMove > 0)
      this.a.animations[n + 'walk_down'].tick();
    if (this.xMove > 0)
      this.a.animations[n + 'walk_right'].tick();
    if (this.xMove < 0)
      this.a.animations[n + 'walk_left'].tick();
  }

  move() {
    if(Math.abs(this.xMove) > 0 || Math.abs(this.yMove) > 0){
      this.handler.getWorld().getSpatialGrid().remove(new Rectangle(this.x + this.b.x, this.y + this.b.y, this.b.w, this.b.height), this);
      if(!(this.checkEntityCollisions(this.xMove, 0)))
        this.moveX();
      if(!(this.checkEntityCollisions(0, this.yMove)))
        this.moveY();
      this.handler.getWorld().getSpatialGrid().insert(new Rectangle(this.x + this.b.x, this.y + this.b.y, this.b.w, this.b.height), this);
    }
  }

  moveX() {
    if (this.clipping) {
      this.x += this.xMove;
      return;
    }

    let tempX = this.xMove > 0
      ? parseInt((this.x + this.xMove + this.b.x + this.b.w) / TILE_WIDTH)
      : parseInt((this.x + this.xMove + this.b.x) / TILE_WIDTH);

    let c1 = parseInt((this.y + this.b.y) / TILE_HEIGHT);
    let c2 = parseInt((this.y + this.b.y + this.b.height) / TILE_HEIGHT);

    let setX = this.xMove > 0
      ? tempX * TILE_WIDTH - this.b.x - this.b.w - 1
      : tempX * TILE_WIDTH + TILE_WIDTH - this.b.x;

      if(!this.collisionWithTile(tempX, c1) && !this.collisionWithTile(tempX, c2)) {
      this.x += this.xMove;
    } else {
      this.x = setX;
    }
  }

  moveY() {
    if (this.clipping) {
      this.y += this.yMove;
      return;
    }

    let tempY = this.yMove > 0
      ? parseInt((this.y + this.yMove + this.b.y + this.b.height) / TILE_HEIGHT)
      : parseInt((this.y + this.yMove + this.b.y) / TILE_HEIGHT);

    let c1 = parseInt((this.x + this.b.x) / TILE_WIDTH);
    let c2 = parseInt((this.x + this.b.x + this.b.w) / TILE_WIDTH);

    let setY = this.yMove > 0
      ? tempY * TILE_HEIGHT - this.b.y - this.b.height - 1
      : tempY * TILE_HEIGHT + TILE_HEIGHT - this.b.y;

    if (!this.collisionWithTile(c1, tempY) && !this.collisionWithTile(c2, tempY)) {
      this.y += this.yMove;
    } else {
      this.y = setY;
    }
  }

  collisionWithTile(x, y) {
    try {
      return this.handler.getWorld().getTile(x, y).isSolid;
    }
    catch(e) {
    }
  }

  getCurrentAnimationFrame() {
    n = this.type === 'player' ? 'p' : 'c';

    if (this.xMove < 0){
      this.lA = n + "walk_left";
      return this.a.animations[n + "walk_left"].getCurrentFrame();
    } else if (this.xMove > 0) {
	    this.lA = n + "walk_right";
	    return this.a.animations[n + "walk_right"].getCurrentFrame();
    } else if (this.yMove < 0){
      this.lA = n + "walk_up";
      return this.a.animations[n + "walk_up"].getCurrentFrame();
    } else if (this.yMove > 0){
      this.lA = n + "walk_down";
      return this.a.animations[n + "walk_down"].getCurrentFrame();
    } else {
      return this.a.animations[this.lA].getCurrentFrame();
    }
  }
}
