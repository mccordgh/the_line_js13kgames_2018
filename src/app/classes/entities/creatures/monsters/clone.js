import { Assets } from '../../../gfx/assets';
import { Creature } from '../creature';

const TILE_WIDTH = 64, TILE_HEIGHT = 64;

export class Clone extends Creature {
  constructor(_handler, _x, _y) {
    super(_handler, _x, _y, TILE_WIDTH, TILE_HEIGHT);
    this.assets = Assets.getAssets('creature');
    this.x = _x;
    this.y = _y;
    this.spawnX = _x;
    this.spawnY = _y;
    this.bounds.x = 10;
    this.bounds.y = 10;
    this.bounds.width = TILE_WIDTH  - (this.bounds.x * 2);
    this.bounds.height = TILE_HEIGHT - (this.bounds.y * 2);
    this.type = 'monster';
    this.patrol = this.getPatrolPattern();
    this.startX = _x;
    this.startY = _y;
    this.patrolLength = 100;
    this.dirMoving = 0;
    this.numberOfMoves = 0;
    this.lastAnimation = 'walk_down';
  }

  getPatrolPattern() {
    const patterns = ['vertical', 'horizontal'];

    return patterns[Math.floor(Math.random() * patterns.length)];
  }

  maybeChangePatrol() {
    if (Math.random() < 0.41) {
      this.patrol = this.patrol === 'vertical' ? 'horizontal' : 'vertical';
    }
  }

  checkIfOffMap() {
    const width = this.handler.getWorld().getWorldWidth() * TILE_WIDTH;
    const height = this.handler.getWorld().getWorldHeight() * TILE_HEIGHT;

    if (this.x < 1 || this.y < 1 || this.x > width || this.y > height) {
      this.x = this.spawnX;
      this.y = this.spawnY;
    }
  }

  setPatrolMovement(_dt) {
    if (this.patrol === 'vertical') {
      if (this.dirMoving === 0) {
        this.yMove = -this.speed * _dt
      } else {
        this.yMove = this.speed * _dt
      }
      this.numberOfMoves++;

      if (this.numberOfMoves > this.patrolLength) {
        this.dirMoving = this.dirMoving === 0 ? 1 : 0;
        this.numberOfMoves = 0;
        this.maybeChangePatrol();
      }

    } else if (this.patrol === 'horizontal') {
      if (this.dirMoving === 0) {
        this.xMove = -this.speed * _dt;
      } else {
        this.xMove = this.speed * _dt;
      }
      this.numberOfMoves++;

      if (this.numberOfMoves > this.patrolLength) {
        this.dirMoving = this.dirMoving === 0 ? 1 : 0;
        this.numberOfMoves = 0;
        this.maybeChangePatrol();
      }
    }
  }

  checkIfInWall() {
    const xx = Math.round(this.x / TILE_WIDTH);
    const yy = Math.round(this.y / TILE_HEIGHT);
    const tile = this.handler.getWorld().getTile(xx, yy);

    if (!tile.isSolid) return;

    const startX = xx - 1;
    const startY = yy - 1;
    const endX = xx + 1;
    const endY = yy + 1;

    for (let j = startY; j < endY; j++) {
      for (let i = startX; i < endX; i++) {
        if (!this.handler.getWorld().getTile(i, j).isSolid && !(i !== xx && j !== yy)) {
          this.x = i * TILE_WIDTH;
          this.y = j * TILE_HEIGHT;
          return;
        }
      }
    }
  }

  tick(_dt) {
    this.checkIfOffMap();
    this.checkIfInWall();

    this.setPatrolMovement(_dt);

    super.tick();

    this.move();

    // this.target = this.handler.getWorld().getEntityManager().getSingleEntity(this.targetType);
    // if (this.target) {
    //   if(this.target.y < this.y) {
    //     if (this.target.y - this.y > 10 || this.target.y - this.y < -10)
    //       this.yMove = -this.speed * _dt;
    //   }
    //   if (this.target.y > this.y) {
    //     if (this.target.y - this.y > 10 || this.target.y - this.y < -10)
    //       this.yMove = this.speed * _dt;
    //   }
    //   if(this.target.x < this.x) {
    //     if (this.target.x - this.x > 10 || this.target.x - this.x < -10)
    //       this.xMove = -this.speed * _dt;
    //   }
    //   if (this.target.x > this.x) {
    //     if (this.target.x - this.x > 10 || this.target.x - this.x < -10)
    //       this.xMove = this.speed * _dt;
    //   }
    // }
    // if (this.dead === 0)
    //   this.move();

    // if (this.xMove > 0)
    //   this.assets.animations.walk_right.tick();
    // if (this.xMove < 0)
    //   this.assets.animations.walk_left.tick();
    // if (this.yMove < 0)
    //   this.assets.animations.walk_up.tick();
    // if (this.yMove > 0)
    //   this.assets.animations.walk_down.tick();
    //
    // this.assets.animations.idle.tick();
  }

  render(_g){
    _g.myDrawImage(this.getCurrentAnimationFrame(), this.x - this.handler.getGameCamera().getxOffset(), this.y - this.handler.getGameCamera().getyOffset(), this.width, this.height);

    // ****** DRAW BOUNDING BOX DON'T DELETE!!
    // _g.fillStyle = "blue";
    // _g.fillRect(this.bounds.x + this.x - this.handler.getGameCamera().getxOffset(), this.bounds.y + this.y - this.handler.getGameCamera().getyOffset(), this.bounds.width, this.bounds.height);
    // ****** DRAW BOUNDING BOX DON'T DELETE!!
  }

  getInput(_dt) {
    //
  }

  // getCurrentAnimationFrame() {
  //   if (this.xMove < 0){
  //     return this.assets.animations.walk_left.getCurrentFrame();
  //   } else if (this.xMove > 0) {
  //     return this.assets.animations.walk_right.getCurrentFrame();
  //   } else if (this.yMove < 0){
  //     return this.assets.animations.walk_up.getCurrentFrame();
  //   } else if (this.yMove > 0){
  //     return this.assets.animations.walk_down.getCurrentFrame();
  //   } else {
  //     return this.assets.animations.idle.getCurrentFrame();
  //   }
  // }
}
