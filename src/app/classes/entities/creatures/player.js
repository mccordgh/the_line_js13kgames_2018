import { Creature } from './creature';
import { GameOver } from '../../menus/game-over';

let gA = 1, deathCount = 0;

export class Player extends Creature {
  constructor(handler, x, y){
    super(handler, x, y);
    this.item = null;
    this.lastAnim = 'pright';
    this.type = 'p';
    this.speed = 900;
    this.moveThrough = false;
    this.state = 1;
  }

  tick(dt) {
    super.tick(dt);
    switch (this.state) {
      case 1: // 1 = move
        this.xMove = this.yMove = 0;

        this.getInput(dt);
        this.move();
        break;

      case 2: // 2 = dead
        if (deathCount ++ > 240) {
          window.location.reload();
          // let gameOver = new GameOver(this.handler, 'dead');
          // ANIMATION_TIMER.stopMe();
          // this.handler.getGame().getGameState().setState(gameOver);
        }
    }
  }

  render(g) {
    switch (this.state) {
      case 1:
        g.myDrawImage(this.frame('p'), this.x, this.y, TILE_SIZE, TILE_SIZE);
        break;

      case 2:
        g.globalAlpha = gA;
        g.myDrawImage(this.frame('p'), this.x, this.y, TILE_SIZE, TILE_SIZE);
        g.globalAlpha = 1;
    }

    // ****** DRAW BOUNDING BOX DON'T DELETE!!
    // g.fillStyle = "green";
    // g.fillRect(this.b.x + this.x, this.b.y + this.y, this.b.s, this.b.s);
    // ****** DRAW BOUNDING BOX DON'T DELETE!!
  }

  setItem(item) {
    this.item = item;
    // this.noCollide.push(item.type);
  }

  dropItem(item) {
    this.item = null;
    // this.noCollide.shift();
    // console.log('drop', this.noCollide);
  }

  getInput(dt) {
    let manager = this.handler.getKeyManager();

    if(manager.w || manager.z) {
      this.yMove = -this.speed * dt;
    }
    if (manager.s) {
      this.yMove = this.speed * dt;
    }
    if(manager.a || manager.q) {
      this.xMove = -this.speed * dt;
    }
    if (manager.d) {
      this.xMove = this.speed * dt;
    }
  }
}
