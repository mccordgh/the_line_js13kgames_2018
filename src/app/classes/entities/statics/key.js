import { StaticEntity } from "./static-entity";
import { Assets } from "../../gfx/assets";

export default class Key extends StaticEntity {
    constructor(handler, x, y, type){
        super(handler, x, y);
        this.type = type;
        this.assets = Assets.getAssets('all').anim[this.type + 'right'];

        /* COLLISION BOUNDS */
        this.b.x = 16;
        this.b.y = 32;
        this.b.s = 32; // size
        /* COLLISION BOUNDS */
      }

    // getType() {
        // return this.type;
    // }
}