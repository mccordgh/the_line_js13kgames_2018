import { Creature } from './creature';
// import { GameOver } from '../../menus/game-over';

let gA = 1, deathCount = 0, sirenCount = 0;

export class Player extends Creature {
  constructor(handler, x, y){
    super(handler, x, y);
    this.item = null;
    this.lastAnim = 'pright';
    this.type = 'p';
    // this.speed = 900;
    this.speed = 200;
    this.moveThrough = false;
    this.state = 1;
    this.sm = this.handler.getSoundManager();
  }

  tick(dt) {
    // console.log(this.x, this.y, this.b.x, this.b.y, this.b.s)
    super.tick(dt);
    switch (this.state) {
      case 1: // 1 = move
        this.xMove = this.yMove = 0;

        this.getInput(dt);
        this.move();
        break;

      case 2: // 2 = dead
      this.xMove = this.yMove = 0;
        if (deathCount++ > 120) {
          deathCount = 0;
          this.handler.getWorld().startAgain();
          // window.location.reload();
          // let gameOver = new GameOver(this.handler, 'dead');
          // ANIMATION_TIMER.stop = true;
          // this.handler.getGame().getGameState().setState(gameOver);
        }
    }
  }

  render(g) {
    switch (this.state) {
      case 1:
        g.myDrawImage(this.frame('p'), this.x, this.y, TILE_SIZE, TILE_SIZE);

        if (this.item && this.item.type == 'siren') {
          g.myDrawImage(this.a.anim['sright'].getCurrentFrame(), this.x, this.y - 16, TILE_SIZE, TILE_SIZE);

          if (sirenCount++ > 20) {
            // console.log('player siren');
            this.sm.play('siren');
            sirenCount = 0;
          }
        }
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

  dropItem() {
    this.item = null;
  }

  getInput(dt) {
    let manager = this.handler.getKeyManager();

    if(manager.up || manager.w || manager.z) {
      this.yMove = -this.speed * dt;
    }
    if (manager.down || manager.s) {
      this.yMove = this.speed * dt;
    }
    if(manager.left || manager.a || manager.q) {
      this.xMove = -this.speed * dt;
    }
    if (manager.right || manager.d) {
      this.xMove = this.speed * dt;
    }

    // if (hasSiren) {
    //   spaceInput = spaceInput > 30 ? 30 : spaceInput += 1;

    //   if (manager.space && spaceInput == 30) {
    //       this.sirenHat = !this.sirenHat;
    //       spaceInput = 0;
    //   }
    // }
  }
}
