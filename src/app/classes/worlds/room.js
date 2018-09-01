// import { EntityManager } from '../entities/entity-manager';
// import { Player } from '../entities/creatures/player';
// import { SpatialGrid } from '../utils/spatial-grid';
import { TileManager } from '../tiles/tile-manager';
import { Guard } from '../entities/creatures/monsters/guard';
// import { Guard } from '../entities/creatures/monsters/guard';

// import roomSet from './room-creator';

export class Room {
  constructor(handler, id, traits = [], entities = [], tileSize = TILE_SIZE, tileCount = TILE_COUNT) {
    this.id = id;
    this.tileSet = [];
    this.items = [];
    this.traits = traits;
    this.entities = entities;
    this.tileSize = tileSize;
    this.tileCount = tileCount
    // this.handler = handler;
    // this.entityManager = new EntityManager(handler, new Player(handler, 6, 6));
    // this.spatialGrid = new SpatialGrid(GAME_SIZE, GAME_SIZE, TILE_SIZE);
    // this.rooms = roomSet;
    // this.room = roomSet[rndIndex([5,6,9,10])];
    // console.log({roomSet});
    // handler.setWorld(this);
    this.init();
    this.apply(traits);
  }

  addEntity(e) {
      this.entities.push(e);
  }

  removeEntity(e) {
    let index = this.entities.indexOf(e);

		// handler.getWorld().getSpatialGrid().remove(new Rectangle(e.x + e.b.x, e.y + e.b.y, e.b.s, e.b.s), e);

    this.entities.splice(index, 1);
  }

  init() {
      this.tileSet = [
        [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1]
      ];
  }

  apply(traits = []) {
    for (let i = 0; i < traits.length; i++) {
        this.tileSet = traits[i](this.tileSet);
    }
  }

  tiles() {
      return this.tileSet;
  }

  tick() {
      // this.tickTiles();
  }


  render(g) {
    this.renderTiles(g, this.tileSize, this.tileCount);
  }

  renderTiles(g, size, count) {
    for (let y = 0; y < count; y++) {
      for (let x = 0; x < count; x++) {
        // TileManager.getTiles()[this.tiles[y][x]].render(g, x * TILE_SIZE, y * TILE_SIZE);
        // console.log('room', this.rooms);
        // try {
            // console.log(TileManager.getTiles()[this.tileSet[y][x]])
          TileManager.getTiles()[this.tileSet[y][x]].render(g, x * size, y * size, size);
        // } catch(e) {

        // }
      }
    }
  }

  tickTiles() {
    for (let y = 0; y < TILE_COUNT; y++) {
      for (let x = 0; x < TILE_COUNT; x++) {

        // try {
          TileManager.getTiles()[this.tileSet[y][x]].tick();
        // } catch(e) {
          // console.log('tiles', TileManager.getTiles());
          // console.log(this.room, this.rooms, x, y);
          // console.log("TileManager.getTiles()[this.rooms[this.room][y][x]]");
          // console.log(TileManager.getTiles()[this.rooms[this.room][y][x]]);
          // debugger;
          // console.log('ERROR room', this.room, this.rooms[this.room], y, x);
        // }
      }
    }
  }

}
