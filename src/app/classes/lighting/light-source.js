const TILE_WIDTH = 64;
const TILE_HEIGHT = 64;
const CENTER_LIGHT = 0.2;
const INNER_LIGHT = 0.5;
const OUTER_LIGHT = 0.75;

export class LightSource {
  constructor(_x, _y, _handler, _manager) {
    this.handler = _handler;
    this.manager = _manager;
    this.x = _x;
    this.y = _y;
    this.init();
  }

  init() {
    this.expandLight();
  }

  expandLight() {
    //center of light source
    this.manager.lightMap[this.x][this.y] = CENTER_LIGHT;

    //tiles around the inner ring
    this.manager.lightMap[this.x - 1][this.y - 1] = INNER_LIGHT;
    this.manager.lightMap[this.x][this.y - 1] = INNER_LIGHT;
    this.manager.lightMap[this.x + 1][this.y - 1] = INNER_LIGHT;
    this.manager.lightMap[this.x - 1][this.y] = INNER_LIGHT;
    this.manager.lightMap[this.x + 1][this.y] = INNER_LIGHT;
    this.manager.lightMap[this.x - 1][this.y + 1] = INNER_LIGHT;
    this.manager.lightMap[this.x][this.y + 1] = INNER_LIGHT;
    this.manager.lightMap[this.x + 1][this.y + 1] = INNER_LIGHT;

    //tiles around the outer ring
    this.manager.lightMap[this.x - 2][this.y - 2] = OUTER_LIGHT;
    this.manager.lightMap[this.x - 1][this.y - 2] = OUTER_LIGHT;
    this.manager.lightMap[this.x][this.y - 2] = OUTER_LIGHT;
    this.manager.lightMap[this.x + 1][this.y - 2] = OUTER_LIGHT;
    this.manager.lightMap[this.x + 2][this.y - 2] = OUTER_LIGHT;
    this.manager.lightMap[this.x + 2][this.y - 1] = OUTER_LIGHT;
    this.manager.lightMap[this.x + 2][this.y] = OUTER_LIGHT;
    this.manager.lightMap[this.x + 2][this.y + 1] = OUTER_LIGHT;
    this.manager.lightMap[this.x + 2][this.y + 2] = OUTER_LIGHT;
    this.manager.lightMap[this.x + 2][this.y + 2] = OUTER_LIGHT;

    this.manager.lightMap[this.x - 2][this.y - 1] = OUTER_LIGHT;
    this.manager.lightMap[this.x - 2][this.y] = OUTER_LIGHT;
    this.manager.lightMap[this.x - 2][this.y + 1] = OUTER_LIGHT;
    this.manager.lightMap[this.x - 2][this.y + 2] = OUTER_LIGHT;

    this.manager.lightMap[this.x - 1][this.y + 2] = OUTER_LIGHT;
    this.manager.lightMap[this.x][this.y + 2] = OUTER_LIGHT;
    this.manager.lightMap[this.x + 1][this.y + 2] = OUTER_LIGHT;
  }

  tick(xStart, xEnd, yStart, yEnd) {
    // console.log(this.x, this.y);
    // const centerTile = this.handler.getWorld().getTile(this.x, this.y);
    // centerTile.light = Math.random();
    // for (let y = yStart; y < yEnd; y++) {
    //   for (let x = xStart; x < xEnd; x++) {
    //     const targetTile = this.handler.getWorld().getTile(x, y);

        // if (targetTile) {
          // targetTile.light = Math.random();
        // }
      // }
    // }
  }

  render(_g) {
    _g.fillStyle = 'yellow';
    _g.fillRect((this.x  * TILE_WIDTH) - this.handler.getGameCamera().getxOffset() + 16, (this.y * TILE_HEIGHT) - this.handler.getGameCamera().getyOffset() + 16, 32, 32);
  }
}
