import { Entity } from '../entity';
import { Rectangle } from '../../gfx/shapes/rectangle';

let n;

export class Creature extends Entity {
  constructor(handler, x, y) {
    super(handler, x, y, TILE_SIZE, TILE_SIZE);
    this.speed = 40;
    this.xMove = 0;
    this.yMove = 0;

    /* COLLISION BOUNDS */
    this.b.x = 16;
    this.b.y = 32;
    this.b.size = 32;
    /* COLLISION BOUNDS */
  }

  tick() {
    this.a.anim[this.lastAnim].tick();
    // n = this.type === 'player' ? 'p' : 'c';

    // if (this.yMove < 0)
    //   this.a.animations[n + 'walk_up'].tick();
    // if (this.yMove > 0)
    //   this.a.animations[n + 'walk_down'].tick();
    // if (this.xMove > 0)
    //   this.a.animations[n + 'walk_right'].tick();
    // if (this.xMove < 0)
    //   this.a.animations[n + 'walk_left'].tick();
  }

  move() {
    if(Math.abs(this.xMove) > 0 || Math.abs(this.yMove) > 0){
      this.handler.getWorld().getSpatialGrid().remove(new Rectangle(this.x + this.b.x, this.y + this.b.y, this.b.size, this.b.size), this);
      if(!(this.checkEntityCollisions(this.xMove, 0)))
        this.moveX();
      if(!(this.checkEntityCollisions(0, this.yMove)))
        this.moveY();
      this.handler.getWorld().getSpatialGrid().insert(new Rectangle(this.x + this.b.x, this.y + this.b.y, this.b.size, this.b.size), this);
    }
  }

  moveX() {
    let tempX = this.xMove > 0
      ? parseInt((this.x + this.xMove + this.b.x + this.b.size) / TILE_SIZE)
      : parseInt((this.x + this.xMove + this.b.x) / TILE_SIZE);

    let c1 = parseInt((this.y + this.b.y) / TILE_SIZE);
    let c2 = parseInt((this.y + this.b.y + this.b.size) / TILE_SIZE);

    let setX = this.xMove > 0
      ? tempX * TILE_SIZE - this.b.x - this.b.size - 1
      : tempX * TILE_SIZE + TILE_SIZE - this.b.x;

      if(!this.collisionWithTile(tempX, c1) && !this.collisionWithTile(tempX, c2)) {
      this.x += this.xMove;
    } else {
      this.x = setX;
    }
  }

  moveY() {
    let tempY = this.yMove > 0
      ? parseInt((this.y + this.yMove + this.b.y + this.b.size) / TILE_SIZE)
      : parseInt((this.y + this.yMove + this.b.y) / TILE_SIZE);

    let c1 = parseInt((this.x + this.b.x) / TILE_SIZE);
    let c2 = parseInt((this.x + this.b.x + this.b.size) / TILE_SIZE);

    let setY = this.yMove > 0
      ? tempY * TILE_SIZE - this.b.y - this.b.size - 1
      : tempY * TILE_SIZE + TILE_SIZE - this.b.y;

    if (!this.collisionWithTile(c1, tempY) && !this.collisionWithTile(c2, tempY)) {
      this.y += this.yMove;
    } else {
      this.y = setY;
    }
  }

  collisionWithTile(x, y) {
    // try {
      return this.handler.getWorld().getTile(x, y).isSolid;
    // }
    // catch(e) {
    // }
  }

  frame(type) {
    if (this.xMove < 0){
      this.lastAnim = type + "left";
      return this.a.anim[this.lastAnim].getCurrentFrame();
    }

    if (this.xMove > 0) {
	    this.lastAnim = type + "right";
	    return this.a.anim[this.lastAnim].getCurrentFrame();
    }

    return this.a.anim[this.lastAnim].getCurrentFrame();
  }
}
