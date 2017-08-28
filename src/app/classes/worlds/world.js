import { EntityManager } from '../entities/entity-manager';
import { Ghost } from '../entities/creatures/monsters/ghost';
import { MazeGenerator } from './maze-generator';
import { Player } from '../entities/creatures/player';
import { SpatialGrid } from '../utils/spatial-grid';
import { TileManager } from '../tiles/tile-manager';
import { LightManager } from '../lighting/light-manager';


const WORLD_WIDTH = 39;
const WORLD_HEIGHT = 39;
const TILE_WIDTH = 64;
const TILE_HEIGHT = 64;
let yellowTilesDown = false;
let yellowWallInterval = 0;
const yellowWallIntervalMax = 3 * 60; // We want X seconds so we multiply that by our FPS which is 60
let switchTimer = 60;

export class World {
  constructor(_handler) {
    this.tiles = [];
    this.handler = _handler;
    _handler.setWorld(this);
    this.entityManager = new EntityManager(_handler, new Player(_handler, 20, 20));
    this.lightManager = new LightManager(_handler);
    this.spatialGrid = new SpatialGrid(this.handler.getWidth() * TILE_WIDTH, this.handler.getHeight() * TILE_HEIGHT, 64);
    this.level = 1;
    this.loadWorld();
    this.init();
  }

  init() {
    this.lightManager.addSource(4, 2);
    this.addRandomLightSources(10);
    this.setPlayerSpawn(this.spawnX, this.spawnY);
    this.populateEnemies(10);
  }

  addRandomLightSources(numberOfSources) {
    for (let i = 0; i < numberOfSources; i++) {
      const x = Math.floor(Math.random() * ((WORLD_WIDTH - 3) - 3 + 1)) + 3;
      const y = Math.floor(Math.random() * ((WORLD_HEIGHT - 3) - 3 + 1)) + 3;

      this.lightManager.addSource(x, y);
    }
  }

  getWorldHeight() {
    return WORLD_HEIGHT;
  }

  getWorldWidth() {
    return WORLD_WIDTH;
  }

  populateEnemies(number) {
    // this.entityManager.addEntity(new Ghost(this.handler, 3 * TILE_WIDTH, 1 * TILE_HEIGHT));

    for (let i = 3; i <= number * 2; i += 2) {
      const eSpawnX = TILE_WIDTH * i; // Math.round(i * 1.5);
      const eSpawnY = TILE_HEIGHT * i; //Math.round(i * 1.5);

      this.entityManager.addEntity(new Ghost(this.handler, eSpawnX, eSpawnY));
    }
  }

  setPlayerSpawn(x, y) {
    this.entityManager.getPlayer().setX(x);
    this.entityManager.getPlayer().setY(y);
  }

  loadWorld() {
    const pieces = this.fillWorld(WORLD_HEIGHT, WORLD_WIDTH, 1, 1);

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (!this.tiles[x]) this.tiles[x] = [];
        this.tiles[x][y] = pieces[x][y];
      }
    }
  }

  fillWorld(height, width, spawnX, spawnY) {
    const maze = MazeGenerator.getRandomMaze(height, width, spawnX, spawnY);

    this.height = maze.height;
    this.width = maze.width;
    this.spawnX = maze.spawnX * TILE_WIDTH;
    this.spawnY = maze.spawnY * TILE_HEIGHT;

    return maze.pieces;
  }

  swapGreenAndBlueTiles(color) {
    if (switchTimer < 60) return;

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
    for (let y = 1; y < this.height - 1; y++) {
      for (let x = 1; x < this.width - 1; x++) {
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
    if (_x < 0 || _y < 0) {
      // console.log(`dat weird x and y bug ${_x}, ${_y}`);
      return;
    }

    return TileManager.getTiles()[this.tiles[_x][_y]];
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
