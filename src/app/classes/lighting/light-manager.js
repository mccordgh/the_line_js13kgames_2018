import { LightSource } from './light-source';

const TILE_HEIGHT = 64;
const TILE_WIDTH = 64;
const DEFAULT_LIGHT = 0.85;
const CENTER_LIGHT = 0.3;

export class LightManager {
  constructor(_handler) {
    this.handler = _handler;
    this.sources = [];
    this.lightMap = [];
    this.init();
  }

  init() {
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
    // this.sources.forEach((source) => {
    //   source.tick(xStart, xEnd, yStart, yEnd);
    // });
  }

  render(xStart, xEnd, yStart, yEnd, _g) {
    this.sources.forEach((source) => {
      source.render(_g);
    });

    this.drawLightBlocks(xStart, xEnd, yStart, yEnd, _g);
  }

 drawLightBlocks(xStart, xEnd, yStart, yEnd, _g) {
   _g.fillStyle = 'black';

   for (let y = yStart; y < yEnd; y++) {
     for (let x = xStart; x < xEnd; x++) {
       const tile = this.handler.getWorld().getTile(x, y).type;

       _g.globalAlpha =  (tile === 'switch' || tile === 'exit') ? CENTER_LIGHT : this.lightMap[x][y];

       _g.fillRect(x * TILE_WIDTH - this.handler.getGameCamera().getxOffset(), y * TILE_HEIGHT - this.handler.getGameCamera().getyOffset(), TILE_WIDTH, TILE_HEIGHT);
     }
   }

   _g.globalAlpha = 1.0;
 }
  //
  addSource(x, y) {
    this.sources.push(new LightSource(x, y, this.handler, this));
  }

  setLight(x, y, lightAmount) {
    this.lightMap[x][y] = lightAmount;
  }
  //
  // removeSource(_source) {
  //   const index = this.sources.indexOf(_source);
  //
  //   this.sources.splice(index, 1);
  // }
}
