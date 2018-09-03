import { StaticEntity } from './static-entity';

export class Exit extends StaticEntity {
  constructor(handler, x, y) {
    super(handler, x, y);
    this.type = 'exit';
    this.b.x = 0;
    this.b.y = 0;
    this.b.s = TILE_SIZE;
    // console.log(this.x, this.y);
  }

  tick(){}

  render(g) {
    for (let i = 0; i < 2; i++) {
        g.fillStyle = i == 0 ? '#ffec27' : 'white';
        
        g.globalAlpha = .4;
        g.fillRect(this.x, this.y, this.b.s, this.b.s);

        g.globalAlpha = .3;
        g.fillRect(this.x, this.y - TILE_SIZE, this.b.s, this.b.s);
        g.fillRect(this.x, this.y + TILE_SIZE, this.b.s, this.b.s);

        g.globalAlpha = .2;
        g.fillRect(this.x, this.y - (TILE_SIZE * 2), this.b.s, this.b.s);
        g.fillRect(this.x, this.y + (TILE_SIZE * 2), this.b.s, this.b.s);
    }

    g.globalAlpha = 1;

    // ****** DRAW BOUNDING BOX DON'T DELETE!!
    // g.fillStyle = "yellow";
    // g.fillRect(this.b.x + this.x, this.b.y + this.y, this.b.s, this.b.s);
    // ****** DRAW BOUNDING BOX DON'T DELETE!!
  }
}
