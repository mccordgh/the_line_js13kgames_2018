import { StaticEntity } from "./static-entity";
import { Assets } from "../../gfx/assets";

export default class Key extends StaticEntity {
    constructor(handler, x, y, color){
        super(handler, x, y);
        this.type = 'key';
        this.color = color;
        this.assets = Assets.getAssets('all').anim[`${this.color}_${this.type}right`];

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