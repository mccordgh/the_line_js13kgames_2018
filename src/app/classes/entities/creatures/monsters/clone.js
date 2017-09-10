import { Assets } from '../../../gfx/assets';
import { Creature } from '../creature';

export class Clone extends Creature {
  constructor(handler, x, y) {
    super(handler, x, y, TILE_WIDTH, TILE_HEIGHT);
    this.a = Assets.getAssets('tiles');
    this.x = x;
    this.y = y;
    this.spawnX = x;
    this.spawnY = y;
    this.type = 'monster';
    this.p = this.getPatrolPattern(); // patrol
    this.pL = 100; // patrolLength
    this.dM = 0; // directionMoving
    this.nom = 0; // numberOfMoves
    this.lA = 'cwalk_down'; // lastAnimation
  }

  getPatrolPattern() {
    let patterns = ['vertical', 'horizontal'];

    return patterns[Math.floor(Math.random() * patterns.length)];
  }

  maybeChangePatrol() {
    if (Math.random() < 0.30) this.p = this.p === 'vertical' ? 'horizontal' : 'vertical';
  }

  checkIfOffMap() {
    let width = this.handler.getWorld().getWorldWidth() * TILE_WIDTH;
    let height = this.handler.getWorld().getWorldHeight() * TILE_HEIGHT;

    if (this.x < 1 || this.y < 1 || this.x > width || this.y > height) {
      this.x = this.spawnX;
      this.y = this.spawnY;
    }
  }

  setPatrolMovement(dt) {
    if (this.p === 'vertical') {
      if (this.dM === 0) {
        this.yMove = -this.speed * dt
      } else {
        this.yMove = this.speed * dt
      }
      this.nom++;

      if (this.nom > this.pL) {
        this.dM = this.dM === 0 ? 1 : 0;
        this.nom = 0;
        this.maybeChangePatrol();
      }

    } else if (this.p === 'horizontal') {
      if (this.dM === 0) {
        this.xMove = -this.speed * dt;
      } else {
        this.xMove = this.speed * dt;
      }
      this.nom++;

      if (this.nom > this.pL) {
        this.dM = this.dM === 0 ? 1 : 0;
        this.nom = 0;
        this.maybeChangePatrol();
      }
    }
  }

  checkIfInWall() {
    let xx = Math.round(this.x / TILE_WIDTH);
    let yy = Math.round(this.y / TILE_HEIGHT);
    let tile = this.handler.getWorld().getTile(xx, yy);

    try {
      if (!tile.isSolid) return;
    } catch (e) {
      //
    }

    let startX = xx - 1;
    let startY = yy - 1;
    let endX = xx + 1;
    let endY = yy + 1;

    for (let j = startY; j < endY; j++) {
      for (let i = startX; i < endX; i++) {
        try {
          if (!this.handler.getWorld().getTile(i, j).isSolid && !(i !== xx && j !== yy)) {
            this.x = i * TILE_WIDTH;
            this.y = j * TILE_HEIGHT;
            return;
          }
        } catch (e) {
          //
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
    // g.fillRect(this.b.x + this.x - this.handler.getGameCamera().getxOffset(), this.b.y + this.y - this.handler.getGameCamera().getyOffset(), this.b.w, this.b.h);
    // ****** DRAW BOUNDING BOX DON'T DELETE!!
  }
}
