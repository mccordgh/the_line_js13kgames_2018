import { Creature } from './creature';

let gA = 1;

export class Player extends Creature {
  constructor(handler, x, y){
    super(handler, x, y);
    this.item = null;
    this.lastAnim = 'pright';
    this.type = 'p';
    this.noCollide = [];
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
        if (gA > 0.02) gA -= 0.02;
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
    console.log({item})
    this.item = item;
    this.noCollide.push(item.type);
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
  }
}
