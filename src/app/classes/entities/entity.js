import { Ending } from '../menus/ending';
import { GameOver } from '../menus/game-over';
import { Rectangle } from '../gfx/shapes/rectangle';

export class Entity {
  constructor(handler, x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.handler = handler;
    this.b = new Rectangle(0, 0, width, height);
    // this.moveThrough = false;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getCollisionBounds() {
    return new Rectangle(parseInt(this.x + this.b.x),
      parseInt(this.y + this.b.y),
      this.b.s, this.b.s);
  }

  checkEntityCollisions(xOffset, yOffset) {
    // console.log(this.x + this.b.x + xOffset, this.y + this.b.y + yOffset, this.b.s, this.b.s, this)
    let candidates =  this.handler.getWorld().getSpatialGrid().retrieve(new Rectangle(this.x + this.b.x + xOffset, this.y + this.b.y + yOffset, this.b.s, this.b.s), this);

    // console.log(candidates);
    for(let i = 0; i < candidates.length; i++) {
      let e = candidates[i];
        // if (e.moveThrough) return false;

        if (e.getCollisionBounds(0, 0).intersects(this.getCollisionBounds(xOffset, yOffset))) {
            this.checkForCollisionEvents(this, e);

            return true;
        }
    }
    return false;
  }

  checkForCollisionEvents(e1, e2) {
    if (this.checkCollidingTypes(e1, e2, 'g', 'g')) return;

    let h = this.handler;
    let hG = h.getGame();
    let hW = h.getWorld();

    // if (this.checkCollidingTypes(e1, e2, 'player', 'exit')) {
    //   if (hW.level >= 4) {
    //     hW.dialogue.clear();

    //     let ending = new Ending(this.handler);
    //     hG.getGameState().setState(ending);
    //   }

    //   hW.changeLevel();
    //   return;
    // }
    console.log(e1.type, e2.type);
    if (this.checkCollidingTypes(e1, e2, 'p', 'g')) {
      this.handler.getWorld().getEntityManager().getPlayer().state = 2; // 2 = dead
    }
  }

  checkCollidingTypes(e1, e2, type1, type2) {
    return ((e1.type === type1 && e2.type === type2) || (e1.type === type2 && e2.type === type1));
  }

  setX(x) {
    this.x = x;
  }

  setY(y) {
    this.y = y;
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }
}
