import { StaticEntity } from "./static-entity";
import { Assets } from "../../gfx/assets";

export default class Key extends StaticEntity {
    constructor(handler, x, y, color){
        super(handler, x, y);
        this.type = 'key';
        this.target = null;
        this.color = color;
        this.assets = Assets.getAssets('all').anim[`${this.color}_${this.type}right`];

        /* COLLISION BOUNDS */
        this.b.x = 16;
        this.b.y = 32;
        this.b.s = 32; // size
        /* COLLISION BOUNDS */
      }

    tick() {
        if (this.target) {
        this.x = this.target.x + 4;
        this.y = this.target.y - 62;
        }
    }

    setTarget(e) {
        this.target = e;
    }
    // getType() {
        // return this.type;
    // }
}