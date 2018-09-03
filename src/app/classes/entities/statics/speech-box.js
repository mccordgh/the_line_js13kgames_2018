import { StaticEntity } from "./static-entity";

let alive = 0;

export default class SpeechBox extends StaticEntity {
    constructor(handler, entity, text){
        super(handler, entity.x, entity.y);
        this.text = text;
        this.type = 'speech';
        this.hideAt = this.text.length * 40;
        this.entity = entity;

        /* COLLISION BOUNDS */
        this.b = { x:0, y:0, s:0 };
        // this.b.x = 16;
        // this.b.y = 32;
        // this.b.s = 32; // size
        /* COLLISION BOUNDS */
      }

    tick() {
        let e = this.handler.getWorld().getEntityManager();
        let p = e.getPlayer();

        if (alive < this.hideAt) alive++;

        if ((p.xMove != 0 || p.yMove != 0) && alive >= this.hideAt) {
            alive = 0;
            e.removeEntity(this);
        }
    }

   render(g) {
       let height = TILE_SIZE * 3;
       let offset = 16;
    //    let t = this.text;
    //    let text = this.text.substr(0, Math.floor(alive / 5));

       g.fillStyle = 'white';
       g.fillRect(0, GAME_SIZE - height, GAME_SIZE, height);

       g.fillStyle = 'black';
       g.fillRect(offset, GAME_SIZE - height + offset, GAME_SIZE - (offset * 2), height - (offset * 2));

    //    g.drawText(this.text.name + ':', TILE_SIZE, TILE_SIZE * 11 - (TILE_SIZE / 2), '');
       for (let i = 0; i < this.text.length; i++) {
           g.drawText(this.text[i], TILE_SIZE, TILE_SIZE * 10 + (i * 40), '#ffec27');
       }
   }
}