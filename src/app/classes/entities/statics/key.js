import { StaticEntity } from "./static-entity";
import { Assets } from "../../gfx/assets";

export default class Key extends StaticEntity {
    constructor(handler, x, y, color, prop = false){
        super(handler, x, y);
        this.type = 'key';
        this.target = null;
        this.color = color;
        this.locked = false;
        this.assets = Assets.getAssets('all').anim[`${this.color}_${this.type}right`];
        this.prop = prop;

        this.typePos = {
            p: { x: 4, y: -64 },
            m: {
                p: {},
                g: {x: 64},
                y: {x: 64, y: 64},
                b: {y: 64},
            },
        }
        /* COLLISION BOUNDS */
        // this.b.x = 16;
        // this.b.y = 32;
        // this.b.s = 32; // size
        /* COLLISION BOUNDS */
      }

    tick() {
        let t = this.target ? this.target.type : this.target;
        let tp = this.typePos;

        if (t) {
            // console.log(t, t.type, this.xOffset(t.type), this.yOffset(t.type))
            this.x = this.target.x + this.xOffset(t, tp);
            this.y = this.target.y + this.yOffset(t, tp);
        }
    }

    xOffset(t, tp) {
        let obj = {
            p: tp.p.x,
            m: tp.m[this.color].x || 0,
        }

        return obj[t];
    }

    yOffset(t, tp) {
        let obj = {
            p: tp.p.y,
            m: tp.m[this.color].y || 0,
        }

        return obj[t];
    }

    setTarget(e) {
        this.target = e;
        this.b = {x: 0, y: 0, s: 0};
    }
    // getType() {
        // return this.type;
    // }
}