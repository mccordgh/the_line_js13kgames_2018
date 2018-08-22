import { Assets } from '../../../gfx/assets';
import { Creature } from '../creature';

export class Clone extends Creature {
  constructor(handler, x, y) {
    super(handler, x, y, TILE_SIZE, TILE_SIZE);
    this.a = Assets.gA('tiles');
    this.x = x;
    this.y = y;
    this.sX = x;
    this.sY = y;
    this.type = 'monster';
    this.p = this.getPatrolPattern(); // patrol
    this.pL = 100; // patrolLength
    this.dM = 0; // directionMoving
    this.nom = 0; // numberOfMoves
    this.lA = 'cwalk_down'; // lastAnimation
  }

  getPatrolPattern() {
    return ['vertical', 'horizontal'][Math.floor(Math.random() * 2)];
  }

  mCP() {
    if (Math.random() < 0.30) this.p = this.p === 'vertical' ? 'horizontal' : 'vertical';
  }

  cM() {
    let width = this.handler.getWorld().getWorldWidth() * TILE_SIZE;
    let height = this.handler.getWorld().getWorldHeight() * TILE_SIZE;

    if (this.x < 1 || this.y < 1 || this.x > width || this.y > height) {
      this.x = this.sX;
      this.y = this.sY;
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
        this.mCP();
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
        this.mCP();
      }
    }
  }

  cW() {
    let xx = Math.round(this.x / TILE_SIZE);
    let yy = Math.round(this.y / TILE_SIZE);
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
            this.x = i * TILE_SIZE;
            this.y = j * TILE_SIZE;
            return;
          }
        } catch (e) {
          //
        }
      }
    }
  }

  tick(dt) {
    this.cM();
    this.cW();
    this.setPatrolMovement(dt);
    super.tick();
    this.move();
  }

  render(g){
    g.myDrawImage(this.getCurrentAnimationFrame(), this.x - this.handler.getGameCamera().getxOffset(), this.y - this.handler.getGameCamera().getyOffset(), this.width, this.height);
  }
}
