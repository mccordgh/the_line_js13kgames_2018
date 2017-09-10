import { EntityManager } from '../entities/entity-manager';
import { Clone } from '../entities/creatures/monsters/clone';
import { MazeGenerator } from './maze-generator';
import { Player } from '../entities/creatures/player';
import { SpatialGrid } from '../utils/spatial-grid';
import { TileManager } from '../tiles/tile-manager';
import { LightManager } from '../lighting/light-manager';
import { Exit } from '../entities/statics/exit';
import { Dialogue } from "../dialogue/dialogue";
import {JournalPage} from "../entities/statics/journal-page";
import { JournalOne } from "../dialogue/journals/journal-one";
import { JournalTwo } from "../dialogue/journals/journal-two";
import { JournalThree } from "../dialogue/journals/journal-three";
import { JournalFour } from "../dialogue/journals/journal-four";

let yellowTilesDown = false, monstersCleared = false, yellowWallInterval = 0, yellowWallIntervalMax = 5 * 60, timeSpent = 0;

export class World {
  constructor(handler) {
    this.width = null;
    this.height = null;
    this.tiles = [];
    this.handler = handler;
    handler.setWorld(this);
    this.entityManager = new EntityManager(handler, new Player(handler, 20, 20));
    this.spatialGrid = new SpatialGrid(this.handler.getWidth() * TILE_WIDTH, this.handler.getHeight() * TILE_HEIGHT, 64);
    this.level = 1;
    this.loadWorld();
    this.lightManager = new LightManager(handler);
    this.dialogue = new Dialogue();
    this.init();
  }

  getLightManager() {
    return this.lightManager;
  }

  changeLevel() {
    this.setPlayerSpawn(this.spawnX, this.spawnY);
    this.level += 1;
    this.tiles = [];
    timeSpent = 0;
    this.lightManager.removeSources();
    this.entityManager.removeEntitiesByType('exit');
    this.entityManager.removeEntitiesByType('journal');

    if (!monstersCleared) this.entityManager.removeEntitiesByType('monster');

    monstersCleared = false;

    this.loadWorld();
    this.init();
  }

  init() {
    this.setPlayerSpawn(this.spawnX, this.spawnY);

    this.lightManager.init();
    this.lightManager.fillLightMap();

    if (this.level === 1) {
      this.entityManager.addEntity(new Clone(this.handler, 6 * TILE_WIDTH, 2 * TILE_WIDTH));
      this.lightManager.addSource(4, 5);
    }

    this.entityManager.addEntity(new Exit(this.handler, (this.width - 2) * TILE_WIDTH, (this.height - 2) * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT));
    this.addEvenSpreadOfLightSources(7);
    if (this.level !== 1) this.addEvenSpreadOfMonsters(6);
    this.spawnJournals();
  }

  spawnJournals() {
		let journals = [
		  new JournalOne(),
			new JournalTwo(),
			new JournalThree(),
			new JournalFour(),
		];

		this.entityManager.addEntity(new JournalPage(this.handler, 2 * TILE_WIDTH, 2 * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT, journals[this.level - 1]));
	}

  addEvenSpreadOfLightSources(spread) {
    for (let y = spread; y <= this.height; y += spread) {
      for (let x = spread; x <= this.width; x += spread) {
        if (this.height - y > 2 && this.width - x > 2) {
          this.lightManager.addSource(x, y);
        }
      }
    }
  }

  getWorldHeight() {
    return this.height;
  }

  getWorldWidth() {
    return this.width;
  }

  addEvenSpreadOfMonsters(spread) {
    for (let y = spread; y <= this.height; y += spread) {
      for (let x = spread; x <= this.width; x += spread) {
        if (this.height - y > 2 && this.width - x > 2) {
          this.entityManager.addEntity(new Clone(this.handler, x * TILE_WIDTH, y * TILE_WIDTH));
        }
      }
    }
  }

  setPlayerSpawn(x, y) {
    this.entityManager.getPlayer().setX(x);
    this.entityManager.getPlayer().setY(y);
  }

  loadWorld() {
    let pieces = this.fillWorld(this.level, 1, 1);
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (!this.tiles[x]) this.tiles[x] = [];
        this.tiles[x][y] = pieces[x][y];
      }
    }
  }

  fillWorld(level, spawnX, spawnY) {
    let maze = MazeGenerator.getRandomMaze(this.level, spawnX, spawnY);

    this.height = maze.mazeHeight;
    this.width = maze.mazeWidth;
    this.spawnX = maze.spawnX * TILE_WIDTH;
    this.spawnY = maze.spawnY * TILE_HEIGHT;

    return maze.pieces;
  }

  swapTilesByID(tileID, swapTileID) {
    for (let y = 1; y < this.height; y++) {
      for (let x = 1; x < this.width; x++) {
        if (this.tiles[x][y] === tileID) {
					this.tiles[x][y] = swapTileID;
        }
      }
    }
  }

  checkForWallSwap() {
    yellowWallInterval++;

    if (yellowWallInterval > yellowWallIntervalMax) {
      yellowWallInterval = 0;

      if (yellowTilesDown) {
        this.swapTilesByID(8, 7);
        this.swapTilesByID(4, 2);
      } else {
        this.swapTilesByID(7, 8);
        this.swapTilesByID(2, 4);
      }

      yellowTilesDown = !yellowTilesDown;
    }
  }

  tick(dt) {
    this.checkForWallSwap();
    this.entityManager.tick(dt);
    this.lightManager.tick(dt);
    this.dialogue.tick();

    if (!monstersCleared && this.level !== 1) {
      timeSpent++;

      if ((timeSpent / 60) >= 240) {
        alert('the monsters crumble all around you.');
        this.entityManager.removeEntitiesByType('monster');
        monstersCleared = true;
      }
    }
  }

  render(g) {
    let xStart = parseInt(Math.max(0, this.handler.getGameCamera().getxOffset() / TILE_WIDTH));
    let xEnd = parseInt(Math.min(this.width, (this.handler.getGameCamera().getxOffset() + this.handler.getWidth()) / TILE_WIDTH + 1));
    let yStart = parseInt(Math.max(0, this.handler.getGameCamera().getyOffset() / TILE_HEIGHT));
    let yEnd = parseInt(Math.min(this.height, (this.handler.getGameCamera().getyOffset() + this.handler.getHeight()) / TILE_HEIGHT + 1));

    this.drawTiles(xStart, xEnd, yStart, yEnd, g);
    this.entityManager.render(g);
    this.lightManager.render(xStart, xEnd, yStart, yEnd, g);
  }

  drawTiles(xStart, xEnd, yStart, yEnd, g) {
    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        if (this.getTile(x, y) !== undefined)
          this.getTile(x, y).render(g, x * TILE_WIDTH - this.handler.getGameCamera().getxOffset(), y * TILE_HEIGHT - this.handler.getGameCamera().getyOffset());
      }
    }
  }

  getTile(x, y) {
    try {
      return TileManager.getTiles()[this.tiles[x][y]];
    }
    catch(e) {
    }
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getEntityManager() {
    return this.entityManager;
  }

  getSpatialGrid() {
    return this.spatialGrid;
  }
}
