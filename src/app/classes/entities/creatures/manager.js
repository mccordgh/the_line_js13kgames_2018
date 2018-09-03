import { Creature } from './creature';

export class Manager extends Creature {
  constructor(handler, x, y, lastAnim = 'pright'){
    super(handler, x, y);
    this.lastAnim = lastAnim;
    this.type = 'w';
    this.speed = 100;
    this.moveThrough = false;
  }

  tick(dt) {
    super.tick(dt);
  }

  render(g) {
    g.myDrawImage(this.frame('p'), this.x, this.y, TILE_SIZE, TILE_SIZE);

    // ****** DRAW BOUNDING BOX DON'T DELETE!!
    // g.fillStyle = "green";
    // g.fillRect(this.b.x + this.x, this.b.y + this.y, this.b.s, this.b.s);
    // ****** DRAW BOUNDING BOX DON'T DELETE!!
  }

  getRndSpeech() {
    return 'Manager: ' + rndIndex([
      'I\'m the manager!',
    ]);
  }
}
