import { LightSource } from '../entities/statics/light-source';

export class LightManager {
  constructor(handler) {
    this.handler = handler;
    this.init();
  }

  init() {
    this.s = [];
    this.LM = [];
    this.fillLightMap();
  }

  fillLightMap() {
    let xEnd = this.handler.getWorld().getWorldWidth();
    let yEnd = this.handler.getWorld().getWorldHeight();

    for (let y = 0; y < yEnd; y++) {
      for (let x = 0; x < xEnd; x++) {
        if (!this.LM[x]) this.LM[x] = [];

        this.LM[x][y] = DEFAULT_LIGHT;
      }
    }
  }

  tick() {
    this.s.forEach((source) => {
      source.tick();
    });
  }

  render(xStart, xEnd, yStart, yEnd, g) {
    this.s.forEach((source) => {
      source.render(g);
    });

    this.drawLightBlocks(xStart, xEnd, yStart, yEnd, g);
  }

 drawLightBlocks(xStart, xEnd, yStart, yEnd, g) {
   g.fillStyle = 'black';

   for (let y = yStart; y < yEnd; y++) {
     for (let x = xStart; x < xEnd; x++) {
       g.globalAlpha = this.LM[x][y];

       g.fillRect(x * TILE_WIDTH - this.handler.getGameCamera().getxOffset(), y * TILE_HEIGHT - this.handler.getGameCamera().getyOffset(), TILE_WIDTH, TILE_HEIGHT);
     }
   }

   g.globalAlpha = 1.0;
 }
  //
  addSource(x, y) {
    let newSource = new LightSource(this.handler, x * TILE_WIDTH, y * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT, this);
    this.handler.getWorld().getEntityManager().addEntity(newSource);
    this.s.push(newSource);
  }

  setLight(x, y, lightAmount) {
    this.LM[x][y] = lightAmount;
  }

  removeSources() {
    this.handler.getWorld().getEntityManager().removeEntitiesByType('light');

    this.s = [];
  }
}
