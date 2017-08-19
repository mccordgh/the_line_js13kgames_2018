import { mapOne } from './maps/map-one';
import { TileManager } from '../tiles/tile-manager';
// import { Utils } from '../utils/utils';
const PATH = window.location.href;

export class World {
  constructor(_path, _handler) {
    this.tiles = [];
    this.handler = _handler;
    _handler.setWorld(this);
    // this.entityManager = new EntityManager(_handler, new Player(_handler, 20, 20));
    // this.loadWorld(CURRENT_PATH + _path);
    this.loadWorld(PATH + 'src/res/world.wrd');
    // this.spatialGrid = new SpatialGrid(this.width * Tile.TILE_WIDTH, this.height * Tile.TILE_HEIGHT, 64);
    // this.init();
  }

  init() {
    //CASTLE!
    // this.entityManager.addEntity(new Castle(_handler, Tile.TILE_WIDTH * 47, Tile.TILE_HEIGHT * 42));

    //PLAYER SET SPAWN
    // this.entityManager.getPlayer().setX(this.spawnX);
    // this.entityManager.getPlayer().setY(this.spawnY);

    //HUD INIT
    // this.hud = new HUD(_handler, this.entityManager.getPlayer());
  }

  loadWorld(_path) {
    const tokens = mapOne.split(' ');
    this.width = tokens[0];
    this.height = tokens[1];
    this.spawnX = parseInt(tokens[2], 10) * 16;
    this.spawnY = parseInt(tokens[3], 10) * 16;
    for(let y = 0; y < this.height; y++){
      for(let x = 0; x < this.width; x++){
        if(!this.tiles[x])
          this.tiles[x] = [];
        this.tiles[x][y] = parseInt(tokens[(x + (y * this.width)) + 4]);
      }
    }
  }

  tick(_dt) {
    // this.entityManager.tick(_dt);
  }

  render(_g) {
    let yStart = 0, yEnd = 30, xStart = 0, xEnd = 32;
    for(let y = yStart; y < yEnd; y++){
      for(let x = xStart; x < xEnd; x++){
        if (this.getTile(x,y) !== undefined) {
          this.getTile(x, y).render(_g, x * 16, y * 16);
        }
      }
    }
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

  // getEntityManager() {
  //   return this.entityManager;
  // }

  // getSpatialGrid() {
  //   return this.spatialGrid;
  // }

  // getRoundOver(){
  //   return roundOver;
  // }

  // setRoundOver(_bool){
  //   roundOver = _bool;
  // }
}
