const TILE_WIDTH = 64;
const TILE_HEIGHT = 64;
const CENTER_LIGHT = 0.3;
const INNER_LIGHT = 0.5;
const OUTER_LIGHT = 0.65;
const DEFAULT_LIGHT = 0.75;

export class LightSource {
  constructor(_x, _y, _handler, _manager) {
    this.handler = _handler;
    this.manager = _manager;
    this.x = _x;
    this.y = _y;
    this.flickering = false;
    this.lastFlickerCounter = 0;
    this.flickerToggle = 0;
    this.flickerCount = 0;
    this.flickerTimes = 0;
    this.init();
  }

  init() {
    this.expandLight();
  }

  expandLight() {
    //outer border
    for (let y = -2; y < 3; y++) {
      for (let x = -2; x < 3; x++) {
        this.manager.lightMap[this.x + x][this.y + y] = Math.min(this.manager.lightMap[this.x + x][this.y + y], OUTER_LIGHT);
      }
    }

    //inner border
    for (let y = -1; y < 2; y++) {
      for (let x = -1; x < 2; x++) {
        this.manager.lightMap[this.x + x][this.y + y] = Math.min(this.manager.lightMap[this.x + x][this.y + y], INNER_LIGHT);
      }
    }

    // center of light source
    this.manager.lightMap[this.x][this.y] = CENTER_LIGHT;
  }

  dimLights(diff) {
    //outer border
    for (let y = -2; y < 3; y++) {
      for (let x = -2; x < 3; x++) {
        this.manager.lightMap[this.x + x][this.y + y] = Math.min(DEFAULT_LIGHT, OUTER_LIGHT + diff);
      }
    }

    //inner border
    for (let y = -1; y < 2; y++) {
      for (let x = -1; x < 2; x++) {
        this.manager.lightMap[this.x + x][this.y + y] = Math.min(DEFAULT_LIGHT, INNER_LIGHT + diff);
      }
    }

    // center of light source
    this.manager.lightMap[this.x][this.y] = Math.min(DEFAULT_LIGHT, CENTER_LIGHT + diff);
  }

  chanceToFlicker() {
    const chance = Math.random();
    if (chance < 0.85) return;

    this.lastFlickerCounter = 0;
    this.flickering = true;
  }

  flickerLights() {
    if (this.flickerCount === 0) {
      if (this.flickerToggle === 0) {
        this.dimLights(0.25);
        this.flickerToggle = 1;
      } else {
        this.expandLight();
        this.flickerToggle = 0;
      }
    }

    this.flickerCount++;

    if (this.flickerCount >= 5) {
      this.flickerCount = 0;
      this.flickerTimes++;
    }

    if (this.flickerTimes >= 6) {
      this.flickerTimes = 0;
      this.flickering = false;
    }
  }

  tick() {
    if (this.flickering) {
      this.flickerLights();
    } else {
      this.lastFlickerCounter++;

      if (this.lastFlickerCounter > 240) {
        this.chanceToFlicker();
      }
    }
  }

  render(_g) {
    const x = (this.x  * TILE_WIDTH) - this.handler.getGameCamera().getxOffset();
    const y = (this.y * TILE_HEIGHT) - this.handler.getGameCamera().getyOffset();

    //draw crappy torch for now
    _g.fillStyle = 'orange';
    _g.fillRect(x + 16, y + 8, 32, 32);
    _g.fillStyle = 'yellow';
    _g.fillRect(x + 24, y + 16, 16, 16);
    _g.fillStyle = 'brown';
    _g.fillRect(x + 24, y + 38, 16, 16);
    //crappy torch
  }
}
