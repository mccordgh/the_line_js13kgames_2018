import { Creature } from '.././creature';

export class Guard extends Creature {
  constructor(handler, x, y){
    super(handler, x, y);
    this.lastAnim = 'gleft';
    this.state = 2;
    this.patrolDirs = Math.random() < .5 ? ['w', 'e'] : ['n', 's'];
    this.dir = {}
    this.resetDir();
    this.target = null;
  }

  tick(dt) {
    // this.xMove = this.yMove = 0;

    // this.getInput(dt);
    super.tick(dt);
    this.xMove = this.yMove = 0;

    switch (this.state) {
      case 1: // 1 = patrol
        let p = this.patrolDirs;
        this.speed = 70;
        this.dir[p[0]] = true;
        this.dir[p[1]] = true;
        this.patrol(dt);
        this.move();
        break;
      case 2: // 2 = chase
        this.target = this.handler.getWorld().getEntityManager().getPlayer();
        this.speed = 60;
        this.persue();
        this.patrol(dt);
        this.move();
        this.resetDir();
        break;
        // this.move();
      }

    // this.move();
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
    let closeOnX = (Math.abs(p.x - this.x) < 8);
    let closeOnY = (Math.abs(p.y - this.y) < 8);

    this.dir.n = (p.y < this.y) && !closeOnY;
    this.dir.e = (p.x > this.x) && !closeOnX;
    this.dir.s = (p.y > this.y) && !closeOnY;
    this.dir.w = (p.x < this.x) && !closeOnX;
  }

  resetDir() {
    this.dir = {
      n: false,
      e: false,
      s: false,
      w: false
    }
  }

  patrol(dt) {
    let d = this.dir;

    //north
    if (d.n) {
      this.yMove = -this.speed * dt;
    }

    //east
    if (d.e) {
      this.xMove = this.speed * dt;
    }

    //south
    if (d.s) {
      this.yMove = this.speed * dt;
    }

    //west
    if (d.w) {
      this.xMove = -this.speed * dt;
    }
  }

  changeDirection(prev = null) {
    console.log('change dir!');
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
