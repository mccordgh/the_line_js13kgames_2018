import { Ending } from '../menus/ending';
import { GameOver } from '../menus/game-over';
import { Rectangle } from '../gfx/shapes/rectangle';

export class Entity {
  constructor(_handler, _x, _y, _width, _height) {
    this.x = _x;
    this.y = _y;
    this.width = _width;
    this.height = _height;
    this.handler = _handler;
    this.bounds = new Rectangle(0, 0, _width, _height);
    this.target = null;
  }

  tick(_dt) {
    throw("Entities must have a tick function!");
  }
  render(_g) {
    throw("Entities must have a render function!");
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
        if (e.getCollisionBounds(0, 0).intersects(this.getCollisionBounds(xOffset, yOffset))) {
            this.checkForCollisionEvents(this, e);

            return true;
        }
    }
    return false;
  }

  checkForCollisionEvents(e1, e2) {
    if (this.checkCollidingTypes(e1, e2, 'monster', 'monster')) return;

    if (this.checkCollidingTypes(e1, e2, 'player', 'journal')) {
      if (e1.type === 'journal') {
        e1.triggerEntry();
        this.handler.getWorld().entityManager.removeEntity(e1);
      } else {
        e2.triggerEntry();
				this.handler.getWorld().entityManager.removeEntity(e2);
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
      if (this.handler.getWorld().level >= 4) {
        const ending = new Ending(this.handler);
        this.handler.getGame().getGameState().setState(ending);
      }

      this.handler.getWorld().changeLevel();
      return;
    }

    if (this.checkCollidingTypes(e1, e2, 'player', 'monster')) {
      if (e1.invincible || e2.invincible) return;

      const gameOver = new GameOver(e1.handler);
      e1.handler.getGame().getGameState().setState(gameOver);
    }
  }

  checkCollidingTypes(e1, e2, type1, type2) {
    return ((e1.type === type1 && e2.type === type2) || (e1.type === type2 && e2.type === type1));
      }

  setX(_x) {
    this.x = _x;
  }

  setY(_y) {
    this.y = _y;
  }

  setWidth(_width) {
    this.width = _width;
  }

  setHeight(_height) {
    this.height = _height;
  }
}
