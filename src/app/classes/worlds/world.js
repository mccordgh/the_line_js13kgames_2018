// import { mapOne } from './maps/map-one';
import { EntityManager } from '../entities/entity-manager';
import { MazeGenerator } from './maze-generator';
import { Player } from '../entities/creatures/player';
import { SpatialGrid } from '../utils/spatial-grid';
import { TileManager } from '../tiles/tile-manager';
// import { Utils } from '../utils/utils';
// const PATH = window.location.href;
const TILE_WIDTH = 64;
const TILE_HEIGHT = 64;
let blueTilesDown = false;
let yellowTilesDown = false;
let greenTilesDown = false;

export class World {
  constructor(_handler) {
    this.tiles = [];
    this.handler = _handler;
    _handler.setWorld(this);
    this.entityManager = new EntityManager(_handler, new Player(_handler, 20, 20));
    // this.loadWorld(CURRENT_PATH + _path);
    this.spatialGrid = new SpatialGrid(this.width * TILE_WIDTH, this.height * TILE_HEIGHT, 64);
    this.level = 1;
    this.blueTiles = [];
    this.yellowTiles = [];
    this.loadWorld();
    this.init();
  }

  init() {
    //CASTLE!
    // this.entityManager.addEntity(new Castle(_handler, TILE_WIDTH * 47, Tile.TILE_HEIGHT * 42));

    //PLAYER SET SPAWN
    this.entityManager.getPlayer().setX(this.spawnX);
    this.entityManager.getPlayer().setY(this.spawnY);

    //HUD INIT
    // this.hud = new HUD(_handler, this.entityManager.getPlayer());
  }

  loadWorld() {
    const pieces = this.fillWorld(40, 40, 1, 1);

    for(let y = 0; y < this.height; y++){
      for(let x = 0; x < this.width; x++){
        if(!this.tiles[x]) this.tiles[x] = [];
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

  getInput() {
    if (this.handler.getKeyManager().h) {
      if (yellowTilesDown)
        this.swapTilesByID(4, 2);
      else
        this.swapTilesByID(2, 4);

      yellowTilesDown = !yellowTilesDown;
    }
    if (this.handler.getKeyManager().j) {
      if (blueTilesDown)
        this.swapTilesByID(5, 3);
      else
        this.swapTilesByID(3, 5);

      blueTilesDown = !blueTilesDown;
    }
    if (this.handler.getKeyManager().k) {
      if (greenTilesDown)
        this.swapTilesByID(7, 8);
      else
        this.swapTilesByID(8, 7);

      greenTilesDown = !greenTilesDown;
    }
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

  tick(_dt) {
    this.getInput();
    this.entityManager.tick(_dt);
  }

  render(_g) {
    var xStart = parseInt(Math.max(0, this.handler.getGameCamera().getxOffset() / TILE_WIDTH));
    var xEnd = parseInt(Math.min(this.width, (this.handler.getGameCamera().getxOffset() + this.handler.getWidth()) / TILE_WIDTH + 1));
    var yStart = parseInt(Math.max(0, this.handler.getGameCamera().getyOffset() / TILE_HEIGHT));
    var yEnd = parseInt(Math.min(this.height, (this.handler.getGameCamera().getyOffset() + this.handler.getHeight()) / TILE_HEIGHT + 1));

    for(let y = yStart; y < yEnd; y++){
      for(let x = xStart; x < xEnd; x++){
        if (this.getTile(x,y) !== undefined)
          this.getTile(x, y).render(_g, x * TILE_WIDTH - this.handler.getGameCamera().getxOffset(), y * TILE_HEIGHT -  this.handler.getGameCamera().getyOffset());
      }
    }

    // throw new Error();
    // _g.fillstyle = 'white';
    // _g.fillRect(100, 100, 200, 200);
    // this.hud.render(_g);
    this.entityManager.render(_g);
    // tree.render(_g);
  }

  getTile(_x, _y) {
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

  // getRoundOver(){
  //   return roundOver;
  // }

  // setRoundOver(_bool){
  //   roundOver = _bool;
  // }
}
