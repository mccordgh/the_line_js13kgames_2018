import { StaticEntity } from './static-entity';
import {Assets} from '../../gfx/assets';

export class LightSource extends StaticEntity {
  constructor(handler, x, y, width, height) {
    super(handler, x, y, width, height);
    this.m = this.handler.getWorld().getLightManager();
    this.posX = Math.floor(x / TILE_WIDTH);
    this.posY = Math.floor(y / TILE_HEIGHT);
    this.b.x = 0;
    this.b.y = 0;
    this.b.w = 0;
    this.b.h = 0;
    this.fl = false;
    this.lastFlickerCounter = 0;
    this.flickerToggle = 0;
    this.flickerCount = 0;
    this.flickerTimes = 0;
    this.flickerLength = 0;
    this.moveThrough = true;
    this.a = Assets.getAssets('tiles');
    this.type = 'light';
    this.init();
  }

  init() {
    this.makeSureOnWall();
    this.expandLight();
  }

  makeSureOnWall() {
    let xx = this.posX;
    let yy = this.posY;
    let tile = this.handler.getWorld().getTile(xx, yy);

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

  expandLight(diff = 0) {
    //outer border
    for (let y = -2; y < 3; y++) {
      for (let x = -2; x < 3; x++) {
        this.m.LM[this.posX + x][this.posY + y] = diff > 0
          ? Math.min(DEFAULT_LIGHT, OUTER_LIGHT + diff)
          : Math.min(this.m.LM[this.posX + x][this.posY + y], OUTER_LIGHT);
      }
    }

    //inner border
    for (let y = -1; y < 2; y++) {
      for (let x = -1; x < 2; x++) {
        this.m.LM[this.posX + x][this.posY + y] = diff > 0
          ? Math.min(DEFAULT_LIGHT, INNER_LIGHT + diff)
          : Math.min(this.m.LM[this.posX + x][this.posY + y], INNER_LIGHT);
      }
    }

    // center of light source
    this.m.LM[this.posX][this.posY] = diff > 0
      ? Math.min(DEFAULT_LIGHT, CENTER_LIGHT + diff)
      : CENTER_LIGHT;
  }

  chanceToFlicker() {
    if (Math.random() < 0.85) return;

    let max = 12;
    let min = 6;

    this.lastFlickerCounter = 0;
    this.flickerLength = Math.floor(Math.random() * (max - min + 1)) + min;
    this.fl = true;
  }

  flickerLights() {
    if (this.flickerCount === 0) {
      if (this.flickerToggle === 0) {
        this.expandLight(0.25);
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
      this.fl = false;
    }
  }

  tick() {
    if (this.fl) {
      this.flickerLights();
    } else {
      this.lastFlickerCounter++;

      if (this.lastFlickerCounter > 240) {
        this.chanceToFlicker();
      }
    }
  }

  render(g) {
		g.myDrawImage(this.a.lantern,
			this.x - this.handler.getGameCamera().getxOffset(),
			this.y - this.handler.getGameCamera().getyOffset(),
			this.width,
			this.height);

		// ****** DRAW BOUNDING BOX DON'T DELETE!!
		// g.fillStyle = "white";
		// g.fillRect(this.b.x + this.x - this.handler.getGameCamera().getxOffset(), this.b.y + this.y - this.handler.getGameCamera().getyOffset(), this.b.w, this.b.h);
		// ****** DRAW BOUNDING BOX DON'T DELETE!!
	}
}
