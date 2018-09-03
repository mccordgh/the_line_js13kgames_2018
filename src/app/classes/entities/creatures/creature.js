import { Assets } from '../../gfx/assets';
import { Entity } from '../entity';
import { Rectangle } from '../../gfx/shapes/rectangle';

export class Creature extends Entity {
  constructor(handler, x, y) {
    super(handler, x, y, TILE_SIZE, TILE_SIZE);
    this.xMove = 0;
    this.yMove = 0;
    this.type = 'g';
    this.handler = handler;

    this.a = Assets.getAssets('all');

    // this.speed = 20;
    this.lastAnim = this.type + 'right';
    this.state = 1 // 1 = move

    /* COLLISION BOUNDS */
    this.b.x = 16;
    this.b.y = 32;
    this.b.s = 32; // size
    /* COLLISION BOUNDS */

    this.dirs = {
      1: { mod: -4, y: 11 * TILE_SIZE }, // north
      2: { mod: 1, x: 0.5 * TILE_SIZE }, // east
      3: { mod: 4, y: 0.5 * TILE_SIZE }, // south
      4: { mod: -1, x: 11 * TILE_SIZE } // west
    }
  }

  tick() {}

  move() {
    if (this.moveThrough) {
      this.moveX();
      this.moveY();
      return;
    }

    let os = this.isOffScreen();

    if (os && this.type == 'p') {
      this.handler.getWorld().changeRooms(os);

      return;
    }

    if (os && this.type == 'g') {
      this.offScreen = true;
      this.changeDirection();
    }

    if(Math.abs(this.xMove) > 0 || Math.abs(this.yMove) > 0){
      this.handler.getWorld().getSpatialGrid().remove(new Rectangle(this.x + this.b.x, this.y + this.b.y, this.b.s, this.b.s), this);
      if(!(this.checkEntityCollisions(this.xMove, 0)))
        this.moveX();
      if(!(this.checkEntityCollisions(0, this.yMove)))
        this.moveY();
      this.handler.getWorld().getSpatialGrid().insert(new Rectangle(this.x + this.b.x, this.y + this.b.y, this.b.s, this.b.s), this);
    }
  }

  moveX() {
    let tempX = this.xMove > 0
      ? parseInt((this.x + this.xMove + this.b.x + this.b.s) / TILE_SIZE)
      : parseInt((this.x + this.xMove + this.b.x) / TILE_SIZE);

    let c1 = parseInt((this.y + this.b.y) / TILE_SIZE);
    let c2 = parseInt((this.y + this.b.y + this.b.s) / TILE_SIZE);

    let setX = this.xMove > 0
      ? tempX * TILE_SIZE - this.b.x - this.b.s - 1
      : tempX * TILE_SIZE + TILE_SIZE - this.b.x;

      if (this.moveThrough) {
        this.x += this.xMove;
        return;
      }

      if(!this.collisionWithTile(tempX, c1) && !this.collisionWithTile(tempX, c2)) {
        this.x += this.xMove;
      } else {
        if (this.type == 'g') this.changeDirection();
        this.x = setX;
      }
    }

    moveY() {
      let tempY = this.yMove > 0
      ? parseInt((this.y + this.yMove + this.b.y + this.b.s) / TILE_SIZE)
      : parseInt((this.y + this.yMove + this.b.y) / TILE_SIZE);

      let c1 = parseInt((this.x + this.b.x) / TILE_SIZE);
      let c2 = parseInt((this.x + this.b.x + this.b.s) / TILE_SIZE);

      let setY = this.yMove > 0
      ? tempY * TILE_SIZE - this.b.y - this.b.s - 1
      : tempY * TILE_SIZE + TILE_SIZE - this.b.y;

      if (this.moveThrough) {
        this.y += this.yMove;
        return;
      }
      
      if (!this.collisionWithTile(c1, tempY) && !this.collisionWithTile(c2, tempY)) {
        this.y += this.yMove;
      } else {
        if (this.type == 'g') this.changeDirection();
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

  isOffScreen() {
    let t = TILE_SIZE;

    return (this.y + t < 0) ? this.dirs[1] : // 1 = north
      (this.x > GAME_SIZE) ? this.dirs[2] : // 2 = east
      (this.y > GAME_SIZE) ? this.dirs[3] : // 3 = south
      (this.x + t < 0) ? this.dirs[4] : // 4 = west
      0;
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

  speak(n = 'Worker: ') {
    return n + rndIndex([
      'You did it!',
      'What... What happened?!',
      "Let's find the exit!",
    ]);
  }
}
