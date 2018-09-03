import { Creature } from './creature';

let sleepCount = 0;

export class Manager extends Creature {
  constructor(handler, x, y, lastAnim = 'maright'){
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
    this.pacified = false;

    if (this.pacified) {
        g.myDrawImage(this.frame('ma'), this.x, this.y, TILE_SIZE, TILE_SIZE);
        return;
    }

    g.myDrawImage(this.a.anim[this.lastAnim].getStillFrame(1),this.x, this.y, TILE_SIZE, TILE_SIZE);
    g.fillStyle = 'white';
    g.fillRect(this.x + 16, this.y + 16, 24, 8);

    let z = '';
    sleepCount++;

    if (sleepCount > 30) {
        z = 'Z';
    }

    if (sleepCount > 60) {
        z = 'Zz';
    }

    if (sleepCount > 90) {
        z = 'Zzz';
    }

    if (sleepCount > 120) {
        z = '';
        sleepCount = 0;
    }

    g.drawText(z, this.x + 8, this.y);

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
