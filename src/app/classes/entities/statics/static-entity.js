import { Entity } from '../entity';

export class StaticEntity extends Entity {
  constructor(handler, x, y){
    super(handler, x, y);
  }

  tick() {
    // if (this.anim) {
      this.assets.tick();
    // }
  }

  render(g) {
    // let t = this.anim ? this.texture.getCurrentFrame() : this.texture;

    g.myDrawImage(this.assets.getCurrentFrame(), this.x, this.y, TILE_SIZE, TILE_SIZE);

    // ****** DRAW BOUNDING BOX DON'T DELETE!!
    g.fillStyle = 'white';
    g.fillRect(this.b.x + this.x, this.b.y + this.y, this.b.s, this.b.s);
    // ****** DRAW BOUNDING BOX DON'T DELETE!!
  }
}
