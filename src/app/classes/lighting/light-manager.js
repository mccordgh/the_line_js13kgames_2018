import { LightSource } from '../entities/statics/light-source';

const TILE_HEIGHT = 64;
const TILE_WIDTH = 64;
const DEFAULT_LIGHT = 0.85;
const CENTER_LIGHT = 0.3;

export class LightManager {
  constructor(handler) {
    this.handler = handler;
    this.init();
  }

  init() {
    this.sources = [];
    this.lightMap = [];
    this.fillLightMap();
  }

  fillLightMap() {
    const xEnd = this.handler.getWorld().getWorldWidth();
    const yEnd = this.handler.getWorld().getWorldHeight();

    for (let y = 0; y < yEnd; y++) {
      for (let x = 0; x < xEnd; x++) {
        if (!this.lightMap[x]) this.lightMap[x] = [];

        this.lightMap[x][y] = DEFAULT_LIGHT;
      }
    }
  }

  tick() {
    this.sources.forEach((source) => {
      source.tick();
    });
  }

  render(xStart, xEnd, yStart, yEnd, g) {
    this.sources.forEach((source) => {
      source.render(g);
    });

    this.drawLightBlocks(xStart, xEnd, yStart, yEnd, g);
  }

 drawLightBlocks(xStart, xEnd, yStart, yEnd, g) {
   g.fillStyle = 'black';

   for (let y = yStart; y < yEnd; y++) {
     for (let x = xStart; x < xEnd; x++) {
       const tile = this.handler.getWorld().getTile(x, y).type;
       g.globalAlpha =  (tile === 'switch' || tile === 'exit') ? CENTER_LIGHT : this.lightMap[x][y];

       g.fillRect(x * TILE_WIDTH - this.handler.getGameCamera().getxOffset(), y * TILE_HEIGHT - this.handler.getGameCamera().getyOffset(), TILE_WIDTH, TILE_HEIGHT);
     }
   }

   g.globalAlpha = 1.0;
 }
  //
  addSource(x, y) {
    const newSource = new LightSource(this.handler, x * TILE_WIDTH, y * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT, this);
    this.handler.getWorld().getEntityManager().addEntity(newSource);
    this.sources.push(newSource);
  }

  setLight(x, y, lightAmount) {
    this.lightMap[x][y] = lightAmount;
  }

  removeSources() {
    this.handler.getWorld().getEntityManager().removeEntitiesByType('light');

    this.sources = [];
  }
  //
  // removeSource(source) {
  //   const index = this.sources.indexOf(source);
  //
  //   this.sources.splice(index, 1);
  // }
}
