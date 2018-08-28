import { StaticEntity } from "./static-entity";
import { Assets } from "../../gfx/assets";
import { join } from "path";

export default class Key extends StaticEntity {
    constructor(handler, x, y, type){
        super(handler, x, y);
        this.type = type;
        this.assets = Assets.getAssets('all');

        /* COLLISION BOUNDS */
        this.b.x = 16;
        this.b.y = 32;
        this.b.s = 32; // size
        /* COLLISION BOUNDS */

        console.log(this.assets);
      }

    tick() {
        console.log(this.type + ' key tick');
    }

    render(g) {
        console.log(this.type + ' key render');

    // ****** DRAW BOUNDING BOX DON'T DELETE!!
    g.fillStyle = this.type;
    g.fillRect(this.b.x + this.x, this.b.y + this.y, this.b.s, this.b.s);
    // ****** DRAW BOUNDING BOX DON'T DELETE!!
    }
}