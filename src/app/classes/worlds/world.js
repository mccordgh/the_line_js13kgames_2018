import { EntityManager } from '../entities/entity-manager';
import { Clone } from '../entities/creatures/monsters/clone';
import { MazeGenerator } from './maze-generator';
import { Player } from '../entities/creatures/player';
import { SpatialGrid } from '../utils/spatial-grid';
import { TileManager } from '../tiles/tile-manager';
import { LightManager } from '../lighting/light-manager';


const TILE_WIDTH = 64;
const TILE_HEIGHT = 64;
let yellowTilesDown = false, monstersCleared = false;
let yellowWallInterval = 0;
const yellowWallIntervalMax = 3 * 60; // We want X seconds so we multiply that by our FPS which is 60
let switchTimer = 60, timeSpent = 0;

export class World {
  constructor(_handler) {
    this.width = null;
    this.height = null;
    this.tiles = [];
    this.handler = _handler;
    _handler.setWorld(this);
    this.entityManager = new EntityManager(_handler, new Player(_handler, 20, 20));
    this.spatialGrid = new SpatialGrid(this.handler.getWidth() * TILE_WIDTH, this.handler.getHeight() * TILE_HEIGHT, 64);
    this.level = 1;
    this.loadWorld();
    this.lightManager = new LightManager(_handler);
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
    monstersCleared = false;
    this.lightManager.removeSources();

    this.loadWorld();
    this.init();
  }

  init() {
    this.setPlayerSpawn(this.spawnX, this.spawnY);

    this.lightManager.init();
    this.lightManager.fillLightMap();

    if (this.level === 1) {
      this.lightManager.addSource(3, 3);
    } else {
      this.addEvenSpreadOfLightSources(7);
      this.addEvenSpreadOfMonsters(8);
    }
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
    const pieces = this.fillWorld(this.level, 1, 1);
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (!this.tiles[x]) this.tiles[x] = [];
        this.tiles[x][y] = pieces[x][y];
      }
    }
  }

  fillWorld(level, spawnX, spawnY) {
    const maze = MazeGenerator.getRandomMaze(level, spawnX, spawnY);

    this.height = maze.mazeHeight;
    this.width = maze.mazeWidth;
    this.spawnX = maze.spawnX * TILE_WIDTH;
    this.spawnY = maze.spawnY * TILE_HEIGHT;

    return maze.pieces;
  }

  swapGreenAndBlueTiles(color) {
    if (switchTimer < 30) return;

    if (color === 'blue') {
      this.swapTilesByID(5, 3);
      this.swapTilesByID(8, 7);
      this.swapTilesByID(6, 9);
    } else if (color === 'green') {
      this.swapTilesByID(3, 5);
      this.swapTilesByID(7, 8);
      this.swapTilesByID(9, 6);
    }

    switchTimer = 0;
  }

  getInput() {
    //
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

      if (yellowTilesDown)
        this.swapTilesByID(4, 2);
      else
        this.swapTilesByID(2, 4);

      yellowTilesDown = !yellowTilesDown;
    }
  }

  tick(_dt) {
    this.getInput();
    this.checkForWallSwap();
    this.entityManager.tick(_dt);
    this.lightManager.tick(_dt);
    switchTimer++;

    if (!monstersCleared) {
      timeSpent++;

      if ((timeSpent / 60) >= 240) {
        alert('the monsters crumble all around you.');
        this.entityManager.removeEntitiesByType('monster');
        monstersCleared = true;
      }
    }
  }

  render(_g) {
    const xStart = parseInt(Math.max(0, this.handler.getGameCamera().getxOffset() / TILE_WIDTH));
    const xEnd = parseInt(Math.min(this.width, (this.handler.getGameCamera().getxOffset() + this.handler.getWidth()) / TILE_WIDTH + 1));
    const yStart = parseInt(Math.max(0, this.handler.getGameCamera().getyOffset() / TILE_HEIGHT));
    const yEnd = parseInt(Math.min(this.height, (this.handler.getGameCamera().getyOffset() + this.handler.getHeight()) / TILE_HEIGHT + 1));

    this.drawTiles(xStart, xEnd, yStart, yEnd, _g);
    this.entityManager.render(_g);
    this.lightManager.render(xStart, xEnd, yStart, yEnd, _g);
  }

  drawTiles(xStart, xEnd, yStart, yEnd, _g) {
    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        if (this.getTile(x, y) !== undefined)
          this.getTile(x, y).render(_g, x * TILE_WIDTH - this.handler.getGameCamera().getxOffset(), y * TILE_HEIGHT - this.handler.getGameCamera().getyOffset());
      }
    }
  }

  getTile(_x, _y) {
    try {
      return TileManager.getTiles()[this.tiles[_x][_y]];
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
