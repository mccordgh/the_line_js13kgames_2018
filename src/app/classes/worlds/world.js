import { EntityManager } from '../entities/entity-manager';
import { Clone } from '../entities/creatures/monsters/clone';
import { MazeGenerator } from './maze-generator';
import { Player } from '../entities/creatures/player';
import { SpatialGrid } from '../utils/spatial-grid';
import { TileManager } from '../tiles/tile-manager';
import { LightManager } from '../lighting/light-manager';
import { Exit } from '../entities/statics/exit';
import { GameOver } from '../menus/game-over';
import { JournalOne } from '../dialogue/journals/journal-one';
import { JournalTwo } from "../dialogue/journals/journal-two";
import { JournalThree } from "../dialogue/journals/journal-three";
import { JournalFour } from "../dialogue/journals/journal-four";

let yellowTilesDown = false, yellowWallInterval = 0, yellowWallIntervalMax = 3 * 60,
  timeSpent = 0, tm = 5, ts = 0, tc = 0, cleared, flashWarning = false, flashOn = true;

export class World {
  constructor(handler) {
    this.death = 0;
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
    this.dialogue = handler.getGame().d;
    this.init();
  }

  getLightManager() {
    return this.lightManager;
  }

  changeLevel() {
    this.setPlayerSpawn(this.spawnX, this.spawnY);
    this.level += 1;
    this.tiles = [];
    flashWarning = false;
    yellowWallInterval = 0;

    this.lightManager.removeSources();
    this.entityManager.removeEntitiesByType('exit');
    this.entityManager.removeEntitiesByType('journal');
    this.entityManager.removeEntitiesByType('monster');

    this.loadWorld();
    this.init();
  }

  init() {
    timeSpent = (tm * 60) + ts;
    cleared = false;

    this.setPlayerSpawn(this.spawnX, this.spawnY);

    this.lightManager.init();
    this.lightManager.fillLightMap();

    if (this.level === 1) {
      this.lightManager.addSource(3, 3);
    }

    let endX, endY;

    if (this.level === 1) {
      endX = this.width - 2;
      endY = this.width - 2;
    } else {
      endX = Math.random() < .5 ? 2 : this.width - 2;
      endY = Math.random() < .5 ? 2 : this.height - 2;

      if (endX === 2 && endY === 2) endX = this.width - 2;
    }

    this.entityManager.addEntity(new Exit(this.handler,  endX * TILE_WIDTH, endY * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT));
    this.addEvenSpreadOfLightSources(5);
    if (this.level !== 1) this.addEvenSpreadOfMonsters(5);

    if (this.level <= 4) {
      let j = [
        new JournalOne(),
        new JournalTwo(),
        new JournalThree(),
        new JournalFour(),
      ][this.level - 1];

      let d = this.dialogue.aW;
      d(j.text);
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
    let pieces = this.fillWorld();
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (!this.tiles[x]) this.tiles[x] = [];
        this.tiles[x][y] = pieces[x][y];
      }
    }
  }

  fillWorld() {
    let maze = MazeGenerator.getRandomMaze(this.level, 1, 1);

    this.height = maze.mazeHeight;
    this.width = maze.mazeWidth;
    this.spawnX = maze.spawnX * TILE_WIDTH;
    this.spawnY = maze.spawnY * TILE_HEIGHT;

    return maze.pieces;
  }

  swapWalls(tile, swap) {
    for (let y = 1; y < this.height; y++) {
      for (let x = 1; x < this.width; x++) {
        if (this.tiles[x][y] === tile) {
					this.tiles[x][y] = swap;
        }
      }
    }
  }

  checkForWallSwap() {
    yellowWallInterval++;

    //check if it's 1 second before time to swap, so we can flash a warning
    if (yellowWallInterval > (yellowWallIntervalMax - 60) && yellowWallInterval < yellowWallIntervalMax) {
      flashWarning = true;
    }

    //check if it's time to swap
    if (yellowWallInterval > yellowWallIntervalMax) {
      flashWarning = false;
      this.handler.getSM().play('wall');
      yellowWallInterval = 0;

      if (yellowTilesDown) {
        this.swapWalls(4, 2);
      } else {
        this.swapWalls(2, 4);
      }

      yellowTilesDown = !yellowTilesDown;
    }
  }

  plusTime() {
    tc++;

    if (tc === 60) {
      ts = ts === 0 ? 59 : ts -= 1;
      if (ts === 59) tm--;
      tc = 0;
    }

    if (ts <= 0 && tm <= 0) {
      let gameOver = new GameOver(this.handler);
      this.dialogue.clear();
      this.handler.getGame().getGameState().setState(gameOver);
    }
  }

  tick(dt) {
    if (this.death > 0) {
      if (this.death === 1) {
        this.entityManager.removeEntity(this.entityManager.getPlayer());
        this.dialogue.clear();
        this.dialogue.aW('+It looks like this one, wasn\'t quick enough.+');
      } else if (this.death === 220) {
        let gameOver = new GameOver(this.handler);
        this.handler.getGame().getGameState().setState(gameOver);
      }
      this.death++;
    } else {
      this.checkForWallSwap();
      this.entityManager.tick(dt);
      this.lightManager.tick(dt);
      this.plusTime();

      if (!cleared && this.level !== 1 && timeSpent - (tm * 60 + ts) > 75) {
          this.dialogue.aW('(the monsters start to crumble all around you.)');
          this.entityManager.removeEntitiesByType('monster');
          cleared = true;
      }
    }
  }

  render(g) {
    // if (this.death === 0) {
      let xStart = parseInt(Math.max(0, this.handler.getGameCamera().getxOffset() / TILE_WIDTH));
      let xEnd = parseInt(Math.min(this.width, (this.handler.getGameCamera().getxOffset() + this.handler.getWidth()) / TILE_WIDTH + 1));
      let yStart = parseInt(Math.max(0, this.handler.getGameCamera().getyOffset() / TILE_HEIGHT));
      let yEnd = parseInt(Math.min(this.height, (this.handler.getGameCamera().getyOffset() + this.handler.getHeight()) / TILE_HEIGHT + 1));

      for (let y = yStart; y < yEnd; y++) {
        for (let x = xStart; x < xEnd; x++) {
          const tile = this.getTile(x, y);

          if (tile) {
            tile.render(g, x * TILE_WIDTH - this.handler.getGameCamera().getxOffset(), y * TILE_HEIGHT - this.handler.getGameCamera().getyOffset());
          }

          if (flashWarning && (tile.id === 4 || tile.id === 2)) {
            if (flashOn) {
              console.log('flash');
              g.fillColor = 'white';
              g.fillRect(x * TILE_WIDTH - this.handler.getGameCamera().getxOffset(), y * TILE_HEIGHT - this.handler.getGameCamera().getyOffset(), TILE_WIDTH, TILE_HEIGHT);
            }
          }
        }
      }

      flashOn = !flashOn;

      this.entityManager.render(g);
      this.lightManager.render(xStart, xEnd, yStart, yEnd, g);

      g.drawText({
        fillColor: 'white',
        text: (tm.toString().length === 1 ? '0' + tm : tm) + ':' + (ts.toString().length === 1 ? '0' + ts : ts),
        fontSize: 40,
        x: 174,
        y: 50,
      });
    // }
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
