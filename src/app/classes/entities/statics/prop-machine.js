import { StaticEntity } from "./static-entity";
import { Assets } from "../../gfx/assets";

export default class PropMachine extends StaticEntity {
    constructor(handler, x, y, num){
        super(handler, x, y);
        this.num = num;
        this.assets.left = Assets.getAssets('all').anim['prop' + this.num + 'left'];
        this.assets.right = Assets.getAssets('all').anim['prop' + this.num + 'right'];

        /* COLLISION BOUNDS */
        this.b.x = 32;
        this.b.y = 0;
        this.b.s = 64; // size
        /* COLLISION BOUNDS */
    }

    tick() {}

    render(g) {
        let frame = this.myFrame();
        
        g.myDrawImage(this.assets.left[frame](), this.x, this.y, TILE_SIZE, TILE_SIZE);
        g.myDrawImage(this.assets.right[frame](), this.x + TILE_SIZE, this.y, TILE_SIZE, TILE_SIZE);

        // ****** DRAW BOUNDING BOX DON'T DELETE!!
        // g.fillStyle = 'orange';
        // g.fillRect(this.b.x + this.x, this.b.y + this.y, this.b.s, this.b.s);
        // ****** DRAW BOUNDING BOX DON'T DELETE!!
    }
}