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
    this.bounds = new Rectangle(0, 0, width, height);
    this.moveThrough = false;
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

  getCollisionBounds(xOffset, yOffset) {
    return new Rectangle(parseInt(this.x + this.bounds.x + xOffset),
      parseInt(this.y + this.bounds.y + yOffset),
      this.bounds.width, this.bounds.height);
  }

  checkEntityCollisions(xOffset, yOffset) {
    const candidates =  this.handler.getWorld().getSpatialGrid().retrieve(new Rectangle(this.x + this.bounds.x + xOffset, this.y + this.bounds.y + yOffset, this.bounds.width, this.bounds.height), this);

    for(let i = 0; i < candidates.length; i++) {
      const e = candidates[i];
        if (e.moveThrough) return false;

        if (e.getCollisionBounds(0, 0).intersects(this.getCollisionBounds(xOffset, yOffset))) {
            this.checkForCollisionEvents(this, e);

            return true;
        }
    }
    return false;
  }

  checkForCollisionEvents(e1, e2) {
    if (this.checkCollidingTypes(e1, e2, 'monster', 'monster')) return;

    const h = this.handler;
    const hG = h.getGame();
    const hW = h.getWorld();
    const eM = hW.entityManager;

    if (this.checkCollidingTypes(e1, e2, 'player', 'journal')) {
      if (e1.type === 'journal') {
        e1.triggerEntry();
        eM.removeEntity(e1);
      } else {
        e2.triggerEntry();
				eM.removeEntity(e2);
			}
    }

    if (this.checkCollidingTypes(e1, e2, 'switch', 'player')) {
      if (e1.type === 'switch') {
        e1.toggleSwitch();
      } else {
        e2.toggleSwitch();
      }
    }

    if (this.checkCollidingTypes(e1, e2, 'player', 'exit')) {
      if (hW.level >= 4) {
        hW.dialogue.clear();

        const ending = new Ending(this.handler);
        hG.getGameState().setState(ending);
      }

      hW.changeLevel();
      return;
    }

    if (this.checkCollidingTypes(e1, e2, 'player', 'monster')) {
      if (e1.invincible || e2.invincible) return;

			hW.dialogue.clear();

			const gameOver = new GameOver(e1.handler);
      hG.getGameState().setState(gameOver);
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
