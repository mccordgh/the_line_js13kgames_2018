// import { Ending } from '../menus/ending';
// import { GameOver } from '../menus/game-over';
import { Rectangle } from '../gfx/shapes/rectangle';

export class Entity {
  constructor(handler, x, y) {
    this.x = x * TILE_SIZE;
    this.y = y * TILE_SIZE;
    this.handler = handler;
    this.b = new Rectangle(0, 0, TILE_SIZE, TILE_SIZE);
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

  getCollisionBounds(xOffset, yOffset) {
    return new Rectangle(parseInt(this.x + this.b.x + xOffset),
      parseInt(this.y + this.b.y + yOffset),
      this.b.s, this.b.s);
  }

  checkEntityCollisions(xOffset, yOffset) {
    // console.log(this.x + this.b.x + xOffset, this.y + this.b.y + yOffset, this.b.s, this.b.s, this)
    let candidates =  this.handler.getWorld().getSpatialGrid().retrieve(new Rectangle(this.x + this.b.x, this.y + this.b.y, this.b.s, this.b.s), this);

    // console.log(candidates);
    for(let i = 0; i < candidates.length; i++) {
      let e = candidates[i];
        // console.log('HERE', this.type, this.noCollide, this.noCollide.find(ent => ent.type === e.type));

        // if the player is colliding with an entity of the type in his no collision list
        // if (this.type === 'p' && this.noCollide.find(type => type === e.type)) {
        //   return false;
        // }

        if (e.getCollisionBounds(0, 0).intersects(this.getCollisionBounds(xOffset, yOffset))) {
          this.checkForCollisionEvents(this, e);

          return true;
        }
    }
    return false;
  }

  checkForCollisionEvents(e1, e2) {
    // if two guards bump, ignore
    if (this.checkCollidingTypes(e1, e2, 'g', 'g')) return;

    let h = this.handler;
    let hG = h.getGame();
    let hW = h.getWorld();
    let player = e1.type === 'p' ? e1 : e2;

    // if (this.checkCollidingTypes(e1, e2, 'player', 'exit')) {
    //   if (hW.level >= 4) {
    //     hW.dialogue.clear();

    //     let ending = new Ending(this.handler);
    //     hG.getGameState().setState(ending);
    //   }

    //   hW.changeLevel();
    //   return;
    // }
    // console.log(e1.type, e2.type);

    // if player and guard bump
    if (this.checkCollidingTypes(e1, e2, 'p', 'g')) {
      player.state = 2; // 2 = dead
    }

    // if player and a key bump
    if (this.checkCollidingTypes(e1, e2, 'p', 'key')) {
      let item = e1.type === 'key' ? e1 : e2;
      if (player.item || item.locked) return;


      player.setItem(item);
      item.setTarget(player);
    }

    // if player and the machine bump
    if (this.checkCollidingTypes(e1, e2, 'p', 'm')) {
      if (!player.item) return;

      let machine = e1.type === 'm' ? e1 : e2;
      let item = player.item;
      // console.log({player, machine, item});

      item.setTarget(machine);
      item.locked = true;
      machine.addKey(item);
      player.dropItem(item);
      // this.handler.getWorld().add
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
