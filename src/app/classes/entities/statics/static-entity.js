import { Entity } from '../entity';

export class StaticEntity extends Entity {
  constructor(handler, x, y){
    super(handler, x, y);
    this.assets = {};

    /* COLLISION BOUNDS */
      this.b.x = 0;
      this.b.y = 0;
      this.b.s = TILE_SIZE; // size
    /* COLLISION BOUNDS */
  }

  tick() {
    // if (this.anim) {
      // this.assets.tick();
    // }
  }

  render(g) {
    let frame = this.myFrame();
       
    // g.myDrawImage(this.assets.p[frame](), this.x, this.y, TILE_SIZE, TILE_SIZE);
    g.myDrawImage(this.assets[this.myFrame()](), this.x, this.y, TILE_SIZE, TILE_SIZE);
    
    // ****** DRAW BOUNDING BOX DON'T DELETE!!
    // g.fillStyle = 'white';
    // g.fillRect(this.b.x + this.x, this.b.y + this.y, this.b.s, this.b.s);
    // ****** DRAW BOUNDING BOX DON'T DELETE!!
  }
  
  myFrame() {
    // let p =this.pacified ? 'getStillFrame' : 'getCurrentFrame';
    // console.log(this.type, this.pacified, p);
    return this.pacified ? 'getStillFrame' : 'getCurrentFrame';
    // return p;
  }

}
