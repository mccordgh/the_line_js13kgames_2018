import { StaticEntity } from './static-entity';
import {Assets} from '../../gfx/assets';

const TILE_WIDTH = 64;
const TILE_HEIGHT = 64;
const CENTER_LIGHT = 0.3;
const INNER_LIGHT = 0.5;
const OUTER_LIGHT = 0.65;
const DEFAULT_LIGHT = 0.75;

export class LightSource extends StaticEntity {
  constructor(handler, x, y, width, height) {
    super(handler, x, y, width, height);
    this.manager = this.handler.getWorld().getLightManager();
    this.posX = Math.floor(x / TILE_WIDTH);
    this.posY = Math.floor(y / TILE_HEIGHT);
    this.bounds.x = 0;
    this.bounds.y = 0;
    this.bounds.width = 0;
    this.bounds.height = 0;
    this.flickering = false;
    this.lastFlickerCounter = 0;
    this.flickerToggle = 0;
    this.flickerCount = 0;
    this.flickerTimes = 0;
    this.flickerLength = 0;
    this.moveThrough = true;
    this.assets = Assets.getAssets('tiles');
    this.type = 'light';
    this.init();
  }

  init() {
    this.makeSureOnWall();
    this.expandLight();
  }

  makeSureOnWall() {
    const xx = this.posX;
    const yy = this.posY;
    const tile = this.handler.getWorld().getTile(xx, yy);

    if (tile.id === 1) return;

    for (let y = yy - 1; y < yy + 1; y++) {
      for (let x = xx - 1; x < xx + 1; x++) {
        if (this.handler.getWorld().getTile(x, y).id === 1) {
          this.posX = x;
          this.posY = y;
          return;
        }
      }
    }
  }

  expandLight() {
    //outer border
    for (let y = -2; y < 3; y++) {
      for (let x = -2; x < 3; x++) {
        this.manager.lightMap[this.posX + x][this.posY + y] = Math.min(this.manager.lightMap[this.posX + x][this.posY + y], OUTER_LIGHT);
      }
    }

    //inner border
    for (let y = -1; y < 2; y++) {
      for (let x = -1; x < 2; x++) {
        this.manager.lightMap[this.posX + x][this.posY + y] = Math.min(this.manager.lightMap[this.posX + x][this.posY + y], INNER_LIGHT);
      }
    }

    // center of light source
    this.manager.lightMap[this.posX][this.posY] = CENTER_LIGHT;
  }

  dimLights(diff) {
    //outer border
    for (let y = -2; y < 3; y++) {
      for (let x = -2; x < 3; x++) {
        this.manager.lightMap[this.posX + x][this.posY + y] = Math.min(DEFAULT_LIGHT, OUTER_LIGHT + diff);
      }
    }

    //inner border
    for (let y = -1; y < 2; y++) {
      for (let x = -1; x < 2; x++) {
        this.manager.lightMap[this.posX + x][this.posY + y] = Math.min(DEFAULT_LIGHT, INNER_LIGHT + diff);
      }
    }

    // center of light source
    this.manager.lightMap[this.posX][this.posY] = Math.min(DEFAULT_LIGHT, CENTER_LIGHT + diff);
  }

  chanceToFlicker() {
    const chance = Math.random();
    if (chance < 0.85) return;

    const max = 8;
    const min = 4;

    this.lastFlickerCounter = 0;
    this.flickerLength = Math.floor(Math.random() * (max - min + 1)) + min;
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

    if (this.flickerCount >= this.flickerLength) {
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

  render(g) {
    // const x = this.x - this.handler.getGameCamera().getxOffset();
    // const y = this.y - this.handler.getGameCamera().getyOffset();
		//
		// g.myDrawImage(this.assets.lantern, x, y, this.width, this.height);
		g.myDrawImage(this.assets.lantern,
			this.x - this.handler.getGameCamera().getxOffset(),
			this.y - this.handler.getGameCamera().getyOffset(),
			this.width,
			this.height);

		// ****** DRAW BOUNDING BOX DON'T DELETE!!
		// g.fillStyle = "white";
		// g.fillRect(this.bounds.x + this.x - this.handler.getGameCamera().getxOffset(), this.bounds.y + this.y - this.handler.getGameCamera().getyOffset(), this.bounds.width, this.bounds.height);
		// ****** DRAW BOUNDING BOX DON'T DELETE!!
	}
}
