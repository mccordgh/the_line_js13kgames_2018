import { Creature } from '.././creature';

export class Guard extends Creature {
  constructor(handler, x, y){
    super(handler, x, y);
    this.lastAnim = 'gleft';
    this.state = 2;
    this.dirs = Math.random() < .5 ? ['w', 'e'] : ['n', 's'];
    this.dir = rndIndex(this.dirs);
    this.target = null;
  }

  tick(dt) {
    // this.xMove = this.yMove = 0;

    // this.getInput(dt);
    super.tick(dt);
    this.xMove = this.yMove = 0;

    switch (this.state) {
      case 1: // 1 = patrol
        this.speed = 70;
        this.patrol(dt);
        break;
      case 2: // 2 = chase
        this.target = this.handler.getWorld().getEntityManager().getPlayer();
        this.speed = 120;
        this.persue(dt);
        break;
        // this.move();
      }

    this.move();
  }

  render(g) {
    // g.myDrawImage(this.a.idle, this.x, this.y, TILE_SIZE, TILE_SIZE);
    g.myDrawImage(this.frame('g'), this.x, this.y, TILE_SIZE, TILE_SIZE);

    // ****** DRAW BOUNDING BOX DON'T DELETE!!
    // g.fillStyle = "red";
    // g.fillRect(this.b.x + this.x, this.b.y + this.y, this.b.s, this.b.s);
    // ****** DRAW BOUNDING BOX DON'T DELETE!!
  }

  persue(dt) {
    let p = this.target;

    if (p.x < this.x) {
      this.dir = 'w';
    }

    if (p.x > this.x) {
      this.dir = 'e';
    }

    if (p.y < this.y) {
      this.dir = 's';
    }

    if (p.y < this.y) {
      this.dir = 'n';
    }

    this.patrol(dt);
  }

  patrol(dt) {
    let d = this.dir;
    //up
    if (d == 'n') {
      this.yMove = -this.speed * dt;
    }
    //down
    if (d == 's') {
      this.yMove = this.speed * dt;
    }
    //left
    if (d == 'w') {
      this.xMove = -this.speed * dt;
    }
    //right
    if (d == 'e') {
      this.xMove = this.speed * dt;
    }
  }

  changeDirection(prev = null) {
    let d = Array.from(this.dirs);

    if (prev) {
      let index = d.indexOf(prev);

      d.splice(index, 1);
    }

    this.dir = rndIndex(d);
  }

  // getInput(dt) {
  //   let manager = this.handler.getKeyManager();

  //   if(manager.up || manager.w || manager.z) {
  //     this.yMove = -this.speed * dt;
  //   }
  //   if (manager.down || manager.s) {
  //     this.yMove = this.speed * dt;
  //   }
  //   if(manager.left || manager.a || manager.q) {
  //     this.xMove = -this.speed * dt;
  //   }
  //   if (manager.right || manager.d) {
  //     this.xMove = this.speed * dt;
  //   }
  // }
}
