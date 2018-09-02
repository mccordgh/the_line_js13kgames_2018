import { StaticEntity } from "./static-entity";
import { GameOver } from '../../menus/game-over';
import { Assets } from "../../gfx/assets";

export default class PropMachine extends StaticEntity {
    constructor(handler, x, y, num){
        super(handler, x, y);
        this.num = num;
        // this.target = null;
        this.keys = [];
        this.assets.left = Assets.getAssets('all').anim['prop' + this.num + 'left'];
        this.assets.right = Assets.getAssets('all').anim['prop' + this.num + 'right'];

        /* COLLISION BOUNDS */
        this.b.x = 32;
        this.b.y = 0;
        this.b.s = 64; // size
        /* COLLISION BOUNDS */
    }

    tick() {
        if (this.keys.length > 3) {
            ANIMATION_TIMER.stopMe();
            let gameOver = new GameOver(this.handler, 'machine');
            this.handler.getGame().getGameState().setState(gameOver)
        }
    }

    render(g) {
        // let t = this.anim ? this.texture.getCurrentFrame() : this.texture;
        g.myDrawImage(this.assets.left.getCurrentFrame(), this.x, this.y, TILE_SIZE, TILE_SIZE);
        g.myDrawImage(this.assets.right.getCurrentFrame(), this.x + TILE_SIZE, this.y, TILE_SIZE, TILE_SIZE);


        // ****** DRAW BOUNDING BOX DON'T DELETE!!
        // g.fillStyle = 'orange';
        // g.fillRect(this.b.x + this.x, this.b.y + this.y, this.b.s, this.b.s);
        // ****** DRAW BOUNDING BOX DON'T DELETE!!
    }

    addKey(item) {
        this.keys.push(item);
        ANIMATION_TIMER.keyAdded(this.keys.length - 1);
    }

    // tick() {
    //     if (this.target) {
    //     this.x = this.target.x + 4;
    //     this.y = this.target.y - 62;
    //     }
    // }

    // setTarget(e) {
    //     this.target = e;
    // }
    // getType() {
        // return this.type;
    // }
}