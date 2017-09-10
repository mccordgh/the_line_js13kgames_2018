import { EntityManager } from '../entities/entity-manager';
import { Clone } from '../entities/creatures/monsters/clone';
import { MazeGenerator } from './maze-generator';
import { Player } from '../entities/creatures/player';
import { SpatialGrid } from '../utils/spatial-grid';
import { TileManager } from '../tiles/tile-manager';
import { LightManager } from '../lighting/light-manager';
import { Exit } from '../entities/statics/exit';
import { Switch } from "../entities/statics/switch";
import { Dialogue } from "../dialogue/dialogue";
import {JournalPage} from "../entities/statics/journal-page";
import { JournalOne } from "../dialogue/journals/journal-one";
import { JournalTwo } from "../dialogue/journals/journal-two";
import { JournalThree } from "../dialogue/journals/journal-three";
import { JournalFour } from "../dialogue/journals/journal-four";
import { JournalFive } from "../dialogue/journals/journal-five";
import { JournalSix } from "../dialogue/journals/journal-six";
import { JournalSeven } from "../dialogue/journals/journal-seven";

let yellowTilesDown = false, monstersCleared = false;
let yellowWallInterval = 0;
const yellowWallIntervalMax = 5 * 60; // We want X seconds so we multiply that by our FPS which is 60
let timeSpent = 0;

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
    this.entityManager.removeEntitiesByType('switch');
    this.entityManager.removeEntitiesByType('journal');

    if (!monstersCleared) this.entityManager.removeEntitiesByType('monster');

    monstersCleared = false;

    this.loadWorld();
    this.init();
  }

  spawnRandomRoomEntities() {
    //9 - SwitchGreen,  6 - SwitchBlue,  10 - Exit,  0 - path (empty room)
    const exit = new Exit(this.handler, (this.width - 2) * TILE_WIDTH, (this.height - 2) * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT);
		const switchSpawnTop = Math.random() < 0.5;

		const switchX = switchSpawnTop ? (this.width - 3) * TILE_WIDTH : 2 * TILE_WIDTH;
		const switchY = switchSpawnTop ? 2 * TILE_HEIGHT : (this.height - 3) * TILE_HEIGHT;

		this.entityManager.addEntity(new Switch(this.handler, switchX, switchY, TILE_WIDTH, TILE_HEIGHT));
		this.entityManager.addEntity(exit);

  }

  init() {
    this.setPlayerSpawn(this.spawnX, this.spawnY);

    this.lightManager.init();
    this.lightManager.fillLightMap();

    if (this.level === 1) {
      this.entityManager.addEntity(new Exit(this.handler, 7 * TILE_WIDTH, 7 * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT));
			this.entityManager.addEntity(new JournalPage(this.handler, 1 * TILE_WIDTH, 2 * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT, new JournalOne()));
			this.entityManager.addEntity(new Clone(this.handler, 6 * TILE_WIDTH, 2 * TILE_WIDTH));
			this.entityManager.addEntity(new Switch(this.handler, 4 * TILE_WIDTH, 4 * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT));
			this.lightManager.addSource(5, 3);
    } else {
      this.spawnRandomRoomEntities();
      this.addEvenSpreadOfLightSources(7);
      this.addEvenSpreadOfMonsters(7);
      this.spawnJournals();
    }
  }

  spawnJournals() {
		const journals = [
			new JournalTwo(),
			new JournalThree(),
			new JournalFour(),
			new JournalFive(),
			new JournalSix(),
			new JournalSeven(),
		];

  	const firstJournal = journals[(this.level * 2) - 4];
		const lastJournal = journals[(this.level * 2) - 3];


		this.entityManager.addEntity(new JournalPage(this.handler, 2 * TILE_WIDTH, 2 * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT, firstJournal));
		this.entityManager.addEntity(new JournalPage(this.handler, (this.width - 3) * TILE_WIDTH, (this.height - 3) * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT, lastJournal));
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
    if (color === 'green') {
      this.swapTilesByID(5, 3);
      this.swapTilesByID(8, 7);
      // this.swapTilesByID(6, 9);
    } else if (color === 'blue') {
      this.swapTilesByID(3, 5);
      this.swapTilesByID(7, 8);
      // this.swapTilesByID(9, 6);
    }
  }

  getInput() {
    //
  }

  swapTilesByID(tileID, swapTileID) {
    for (let y = 1; y < this.height; y++) {
      for (let x = 1; x < this.width; x++) {
        if (this.tiles[x][y] === tileID) {
					this.tiles[x][y] = this.handler.getWorld().getTile(x, y).disappear ? 0 : swapTileID;
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

  tick(dt) {
    this.getInput();
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
    const xStart = parseInt(Math.max(0, this.handler.getGameCamera().getxOffset() / TILE_WIDTH));
    const xEnd = parseInt(Math.min(this.width, (this.handler.getGameCamera().getxOffset() + this.handler.getWidth()) / TILE_WIDTH + 1));
    const yStart = parseInt(Math.max(0, this.handler.getGameCamera().getyOffset() / TILE_HEIGHT));
    const yEnd = parseInt(Math.min(this.height, (this.handler.getGameCamera().getyOffset() + this.handler.getHeight()) / TILE_HEIGHT + 1));

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
