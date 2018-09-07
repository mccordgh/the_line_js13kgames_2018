import { StaticEntity } from "./static-entity";
import { Assets } from "../../gfx/assets";

export default class Desk extends StaticEntity {
    constructor(handler, entity){
        super(handler, entity.x, entity.y);
        this.x = entity.x;
        this.y = entity.y
        this.assets = Assets.getAssets('all').anim['deskright'];

        /* COLLISION BOUNDS */
        this.b.x = 64;
        this.b.y = 0;
        this.b.s = 64; // size
        /* COLLISION BOUNDS */
    }

    tick() {}

    render(g) {
        g.myDrawImage(this.assets.getStillFrame(), this.x, this.y, TILE_SIZE, TILE_SIZE);
        g.myDrawImage(this.assets.getStillFrame(1), this.x + TILE_SIZE, this.y, TILE_SIZE, TILE_SIZE);

        // ****** DRAW BOUNDING BOX DON'T DELETE!!
        // g.fillStyle = 'blue';
        // g.fillRect(this.b.x + this.x, this.b.y + this.y, this.b.s, this.b.s);
        // ****** DRAW BOUNDING BOX DON'T DELETE!!
    }
}