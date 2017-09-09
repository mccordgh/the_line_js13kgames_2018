import { Assets } from '../../../gfx/assets';
import { Creature } from '../creature';

const TILE_WIDTH = 64, TILE_HEIGHT = 64;

export class Clone extends Creature {
  constructor(handler, x, y) {
    super(handler, x, y, TILE_WIDTH, TILE_HEIGHT);
    this.assets = Assets.getAssets('creature');
    this.x = x;
    this.y = y;
    this.spawnX = x;
    this.spawnY = y;
    this.bounds.x = 10;
    this.bounds.y = 10;
    this.bounds.width = TILE_WIDTH  - (this.bounds.x * 2);
    this.bounds.height = TILE_HEIGHT - (this.bounds.y * 2);
    this.type = 'monster';
    this.patrol = this.getPatrolPattern();
    this.startX = x;
    this.startY = y;
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

  setPatrolMovement(dt) {
    if (this.patrol === 'vertical') {
      if (this.dirMoving === 0) {
        this.yMove = -this.speed * dt
      } else {
        this.yMove = this.speed * dt
      }
      this.numberOfMoves++;

      if (this.numberOfMoves > this.patrolLength) {
        this.dirMoving = this.dirMoving === 0 ? 1 : 0;
        this.numberOfMoves = 0;
        this.maybeChangePatrol();
      }

    } else if (this.patrol === 'horizontal') {
      if (this.dirMoving === 0) {
        this.xMove = -this.speed * dt;
      } else {
        this.xMove = this.speed * dt;
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

  tick(dt) {
    this.checkIfOffMap();
    this.checkIfInWall();

    this.setPatrolMovement(dt);

    super.tick();

    this.move();
  }

  render(g){
    g.myDrawImage(this.getCurrentAnimationFrame(), this.x - this.handler.getGameCamera().getxOffset(), this.y - this.handler.getGameCamera().getyOffset(), this.width, this.height);

    // ****** DRAW BOUNDING BOX DON'T DELETE!!
    // g.fillStyle = "blue";
    // g.fillRect(this.bounds.x + this.x - this.handler.getGameCamera().getxOffset(), this.bounds.y + this.y - this.handler.getGameCamera().getyOffset(), this.bounds.width, this.bounds.height);
    // ****** DRAW BOUNDING BOX DON'T DELETE!!
  }
}
